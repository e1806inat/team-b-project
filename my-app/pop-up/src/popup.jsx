import React from "react";
import ReactDOM from "react-dom/client";

//メインのDOMの中で配置するサブ部品のような要素
class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h1>{this.props.text}</h1>
          <h2></h2>
          <button onClick={this.props.closePopup}>いいえ</button>
          <button onClick={this.props.closePopup}>はい</button>
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
      <div className="app">
        <h1>test</h1>
        <button onClick={this.togglePopup}>更新</button>
        {/* this.state.PopupがtrueであればPopupウィンドウを開く */}
        {this.state.showPopup ? (
          <Popup text="確認画面" closePopup={this.togglePopup} />
        ) : null}
      </div>
    );
  }
}

//配置する部品の決まり文句
export default Popup_field;
//以下、使い方がよくわからない
// const root = ReactDOM.createRoot(document.getElementById("content"));
// root.render(<Popup_field/>);
