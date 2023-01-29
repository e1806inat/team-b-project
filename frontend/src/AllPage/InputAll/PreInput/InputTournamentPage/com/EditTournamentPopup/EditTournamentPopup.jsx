import React from "react";
import "./EditTournamentPopup.css"
import isEnpty from "../../../../../../Functions/IsEnpty";



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
                this.props.setEditingTnmtName(this.props.Tournament.tournament_name)
              }}
            ></input>大会を編集する<br></br>

            名前の変更<br></br>
            変更前：{this.props.Tournament.tournament_name}<br></br>
            変更後：<input
              id="changeId" value={this.props.editingTnmtName}
              onChange={(e) => { this.props.setEditingTnmtName(e.target.value) }}
            ></input><br></br><br></br>
            日付の変更:<br></br>
            変更前：{this.props.Tournament.opening}<br></br>
            変更後：
            {this.props.makePulldown(0, this.props.yearArray, "year", this.props.editOpeningDate, this.props.setEditOpeningDate)}年
            {this.props.makePulldown(1, this.props.monthArray, "month", this.props.editOpeningDate, this.props.setEditOpeningDate)}月
            {this.props.makePulldown(2, this.props.dayArray, "day", this.props.editOpeningDate, this.props.setEditOpeningDate)}日<br></br><br></br>

            {/* 削除チェックボックス */}
            <input
              type="checkbox"
              checked={!this.props.EorDcheckBox}
              onClick={() => {
                this.props.setEorDcheckBox(false)
                //警告をを入れる
                this.props.setEditingTnmtName("大会を削除します")
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
            {(!isEnpty([this.props.editingTnmtName]) &&
              (!this.props.isDuplicate(this.props.TournamentData, this.props.editingTnmtName, "tournament_name") ||
                !this.props.isDuplicate(
                  this.props.TournamentData, this.props.yearArray[this.props.editOpeningDate[0]].year + "-" +
                  this.props.monthArray[this.props.editOpeningDate[1]].month + "-" + this.props.dayArray[this.props.editOpeningDate[2]].day,
                  "opening"
                ))
            ) &&
              <button className="button_style_2"
                onClick={
                  async () => {
                    if (this.props.EorDcheckBox) {
                      //編集を確定する
                      await this.props.editTournament(
                        this.props.Tournament.tournament_id,
                        document.getElementById("changeId").value,
                        this.props.yearArray[this.props.editOpeningDate[0]].year + "-" +
                        this.props.monthArray[this.props.editOpeningDate[1]].month + "-" +
                        this.props.dayArray[this.props.editOpeningDate[2]].day,
                        this.props.TournamentData,
                        this.props.setTournamentData
                      )
                    }
                    else {
                      //大会を削除する
                      await this.props.tournamentDelete(
                        this.props.Tournament.tournament_id,
                        this.props.setTournamentData
                        )
                        this.props.setEorDcheckBox(true)
                    }

                    // ポップアップを閉じる
                    this.props.closePopup()
                  }
                }>決定
              </button>
            }

            {/* 入力に問題があるときに表示されるボタン */}
            {(isEnpty([this.props.editingTnmtName]) ||
              (this.props.isDuplicate(this.props.TournamentData, this.props.editingTnmtName, "tournament_name") &&
                this.props.isDuplicate(
                  this.props.TournamentData, this.props.yearArray[this.props.editOpeningDate[0]].year + "-" +
                  this.props.monthArray[this.props.editOpeningDate[1]].month + "-" + this.props.dayArray[this.props.editOpeningDate[2]].day,
                  "opening"
                ))
            ) &&
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
            this.props.setEditingTnmtName(this.props.Tournament.tournament_name)
            let splitted = this.props.dateSplit(this.props.Tournament.opening)
            // this.props.setEditOpeningDate([
            //   this.props.yearArray.findIndex((v) => v.year.toString() === splitted.year),
            //   this.props.monthArray.findIndex((v) => v.month.toString() === splitted.month),
            //   this.props.dayArray.findIndex((v) => v.day.toString() === splitted.day)
            // ])
            console.log([
              this.props.yearArray.findIndex((v) => v.year.toString() === splitted.year),
              this.props.monthArray.findIndex((v) => v.month.toString() === splitted.month),
              this.props.dayArray.findIndex((v) => v.day.toString() === splitted.day)
            ])
          }}
        >{this.props.Tournament.tournament_name}</button>
        {/* this.state.PopupがtrueであればPopupウィンドウを開く */}
        {this.state.showPopup ? (
          <Popup text="確認画面" closePopup={this.togglePopup}
            Tournament={this.props.Tournament}
            ind={this.props.ind}
            editTournament={this.props.editTournament}
            editOpeningDate={this.props.editOpeningDate}
            setEditOpeningDate={this.props.setEditOpeningDate}
            yearArray={this.props.yearArray}
            monthArray={this.props.monthArray}
            dayArray={this.props.dayArray}
            makePulldown={this.props.makePulldown}
            TournamentData={this.props.TournamentData}
            setTournamentData={this.props.setTournamentData}
            editingTnmtName={this.props.editingTnmtName}
            setEditingTnmtName={this.props.setEditingTnmtName}
            EorDcheckBox={this.props.EorDcheckBox}
            setEorDcheckBox={this.props.setEorDcheckBox}
            tournamentDelete={this.props.tournamentDelete}
            readTournament={this.props.readTournament}
            dateSplit={this.props.dateSplit}
            isDuplicate={this.props.isDuplicate}
          />
        ) : null}
      </div>
    );
  }
}

//配置する部品の決まり文句
export default EditTournamentPopup;