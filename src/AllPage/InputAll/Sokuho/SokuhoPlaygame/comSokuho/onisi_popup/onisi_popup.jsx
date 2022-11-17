import React from "react";
import './onisi_popup.css'

//メインのDOMの中で配置するサブ部品のような要素
class Popup extends React.Component {
  render() {
    return (
      <div className="popup_field">
        <div className="popup_inner_field">
          <div className="title">{this.props.text}</div>
          <p>情報が更新されますがよろしいでしょうか？</p>
          <button className="button_style" onClick={this.props.closePopup}>いいえ</button>
          <nbsp></nbsp>
          <button className="button_style" onClick={this.props.closePopup}>はい</button>
        </div>
      </div>
    );
  }
}

//コンポーネントの内部に別のコンポーネントを持つことができる　ここではPopupというコンポ―ネントがある
class Popup_field extends React.Component {
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
        {/* <h1>test</h1> */}
        {/* <button onClick={this.togglePopup}>更新</button> */}
        <i class="fa-solid fa-rotate-right updatebutton" onClick={this.togglePopup}></i>
        {/* this.state.PopupがtrueであればPopupウィンドウを開く */}
        {this.state.showPopup ? (
          <Popup
            text="確認画面${this.props.nowIningState}"
            closePopup={this.togglePopup}
            nowIningState={this.props.nowIningState}
            setNowIningState={this.props.setNowIningState}
          />
        ) : null}
      </div>
    );
  }
}

//配置する部品の決まり文句
export default Popup_field;