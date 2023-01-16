import React from "react";

//メインのDOMの中で配置するサブ部品のような要素
class GameEndPopup extends React.Component {
  render() {
    return (
      <div className="popup_field">
        <div className="popup_inner_field">
          <div className="title">{this.props.text}</div>
          <p>試合を終了し、情報を登録しますがよろしいでしょうか？</p>
          <button className="button_style" onClick={this.props.closePopup}>いいえ</button>
          <nbsp></nbsp>
          <button className="button_style"
            onClick={() => {
              this.props.closePopup()
              this.props.TableRegister(this.props.urlGameId)
              this.props.CalculateBatAvg(this.props.urlGameId)
              this.props.TmpTableDelete(this.props.urlGameId)
              this.props.RefDuringGame(this.props.RefDuringGame)
            }}>はい</button>
        </div>
      </div>
    );
  }
}

//コンポーネントの内部に別のコンポーネントを持つことができる　ここではPopupというコンポ―ネントがある
class GameEndPopup_field extends React.Component {
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
      <>
        <li><a href="#" onClick={this.togglePopup}>試合終了</a></li>
        {/* this.state.PopupがtrueであればPopupウィンドウを開く */}
        {this.state.showPopup ? (
          <GameEndPopup text="確認画面"
            closePopup={this.togglePopup}
            TableRegister={this.props.TableRegister}
            urlGameId={this.props.urlGameId}
            TmpTableDelete={this.props.TmpTableDelete}
            DeleteDuringGame={this.props.DeleteDuringGame}
            CalculateBatAvg={this.props.CalculateBatAvg}
          />
        ) : null}
      </>
    );
  }
}

//配置する部品の決まり文句
export default GameEndPopup_field;