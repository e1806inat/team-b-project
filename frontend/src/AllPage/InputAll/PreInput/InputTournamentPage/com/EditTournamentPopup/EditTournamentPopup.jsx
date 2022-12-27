import React from "react";
import "./EditTournamentPopup.css"



//メインのDOMの中で配置するサブ部品のような要素
class Popup extends React.Component {

  render() {
    return (
      <div className="popup_field">
        <div className="popup_inner_field">
          <div className="title">{this.props.text}</div>
          名前の変更<br></br>
          変更前：{this.props.Tournament.tournament_name}<br></br>
          変更後：<input id="chengeId"></input><br></br><br></br>
          日付の変更:<br></br>
          変更前：{this.props.Tournament.opening}<br></br>
          変更後：
          {this.props.makePulldown(0, this.props.yearArray, "year", this.props.editOpeningDate, this.props.setEditOpeningDate)}年
          {this.props.makePulldown(1, this.props.monthArray, "month", this.props.editOpeningDate, this.props.setEditOpeningDate)}月
          {this.props.makePulldown(2, this.props.dayArray, "day", this.props.editOpeningDate, this.props.setEditOpeningDate)}日

          <p>情報が更新されますがよろしいでしょうか？</p>
          <button className="button_style" onClick={this.props.closePopup}>いいえ</button>
          <nbsp></nbsp>
          <button className="button_style"
            onClick={
              () => {
                this.props.editTournament(
                  this.props.Tournament.tournament_id,
                  document.getElementById("chengeId").value,
                  this.props.yearArray[this.props.editOpeningDate[0]].year + "-" +
                  this.props.monthArray[this.props.editOpeningDate[1]].month + "-" +
                  this.props.dayArray[this.props.editOpeningDate[2]].day,
                  this.props.TournamentData,
                  this.props.setTournamentData
                )
                this.props.closePopup()
              }
            }>はい</button>
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
        <button className={this.props.sendClassName} onClick={this.togglePopup}>{this.props.Tournament.tournament_name}</button>
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
          />
        ) : null}
      </div>
    );
  }
}

//配置する部品の決まり文句
export default EditTournamentPopup;