import React from "react";
import isEnpty from "../../../../../Functions/IsEnpty";



//メインのDOMの中で配置するサブ部品のような要素
class Popup extends React.Component {

  render() {
    return (
      <div className="popup_field">
        <div className="popup_in_field">
          <div className="title">{this.props.text}</div>
          <div className='editarea3'>
            {/* 編集チェックボックス */}
            <input
              type="checkbox"
              checked={this.props.EorDcheckBox}
              onClick={() => {
                this.props.setEorDcheckBox(true)
                //初期値を入れる
                this.props.setVenueName(this.props.Venue.venue_name)
              }}
            ></input>会場を編集する<br></br>

            名前の変更<br></br>
            変更前：{this.props.Venue.venue_name}<br></br>
            変更後：<input
              id="changeId" value={this.props.editingVenueName}
              onChange={(e) => { this.props.setEditingVenueName(e.target.value) }}
            ></input><br></br><br></br>
          

            {/* 削除チェックボックス */}
            <input
              type="checkbox"
              checked={!this.props.EorDcheckBox}
              onClick={() => {
                this.props.setEorDcheckBox(false)
                //警告をを入れる
                this.props.setEditingVenueName("大会を削除します")
              }}
            ></input>大会を削除する<br></br>
          </div>

          <div className='buttonarea'>
            {/* いいえのボタン */}
            <button className="button_style_2"
              onClick={() => {
                this.props.closePopup()
                this.props.setEorDcheckBox(true)
              }}>やめる</button>
            <nbsp></nbsp>

            {/* はいのボタン */}
            {(!isEnpty([this.props.editingVenueName])) &&
              <button className="button_style_2"
                onClick={
                  async () => {
                    if (this.props.EorDcheckBox) {
                      //編集を確定する
                      await this.props.editVenue(
                        this.props.Venue.venue_id,
                        document.getElementById("changeId").value,
                        this.props.venueArray,
                        this.props.setVenueArray
                      )

                      // 会場を読み込む
                      await this.props.loadVenue(this.props.setVenueArray)
                    }
                    else {
                      //会場を削除する
                      await this.props.deleteVenue(this.props.Venue.venue_id)

                      //
                      await this.props.setEorDcheckBox(true)

                      // 会場を読み込む
                      await this.props.loadVenue(this.props.setVenueArray)
                    }

                    // ポップアップを閉じる
                    this.props.closePopup()
                  }
                }>決定
              </button>
            }

            {/* 入力に問題があるときに表示されるボタン */}
            {(isEnpty([this.props.editingVenueName])) &&
              <button className="button_style_2"
                onClick={
                  () => {
                  }
                }>決定i
              </button>
            }
          </div>
        </div>
      </div>
    );
  }
}

//コンポーネントの内部に別のコンポーネントを持つことができる　ここではPopupというコンポ―ネントがある
class EditTournamentPopup extends React.Component {
  //初期設定の要素をconstructorに記述する
  //bind(this)をしないと呼び出し先のthisがundefinedになってしまう
  constructor(props, context) {
    super();
    this.state = { showPopup: false };
    this.togglePopup = this.togglePopup.bind(this);//重要
  }
  //togglePopupによってthis.state.showPopupの値を反転させる
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  //renderの中に設置したいメインのDOM(部品）を記述していく
  render() {
    return (
      <div>
        <button className={this.props.sendClassName}
          onClick={() => {
            this.togglePopup()
            //初期値を入れる
            this.props.setEditingVenueName(this.props.Venue.venue_name)
          }}
        >{this.props.Venue.venue_name}</button>
        {/* this.state.PopupがtrueであればPopupウィンドウを開く */}
        {this.state.showPopup ? (
          <Popup text="確認画面" closePopup={this.togglePopup}
          sendClassName="btn_In_to1"
          Venue={this.props.Venue}
          ind={this.props.ind}
          editVenue={this.props.editVenue}
          venueArray={this.propsvenueArray}
          setVenueArray={this.props.setVenueArray}
          editingVenueName={this.props.editingVenueName}
          setEditingVenueName={this.props.setEditingVenueName}
          EorDcheckBox={this.props.EorDcheckBox}
          setEorDcheckBox={this.props.setEorDcheckBox}
          deleteVenue={this.props.deleteVenue}
          loadVenue={this.props.loadVenue}
          isDuplicate={this.props.isDuplicate}
          />
        ) : null}
      </div>
    );
  }
}

//配置する部品の決まり文句
export default EditTournamentPopup;