import React from "react";

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
          <button className="button_style" onClick={() => {
            // this.props.closePopup()
            

            this.props.handleSousin(
              this.props.copyMember,
              this.props.selectedMember,
              this.props.urlTournamentId,
              this.props.uniformNumberArray,
              this.props.registeredMembers
            )
            // this.props.PageTransition(-1)
          }
          }>はい</button>
        </div>
      </div>
    );
  }
}

//コンポーネントの内部に別のコンポーネントを持つことができる　ここではPopupというコンポ―ネントがある
class MemberPopup extends React.Component {
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

        {<button
          onClick={() => { this.togglePopup() }}
          className="sendButton"
        >登録
        </button>}

        {/* this.state.PopupがtrueであればPopupウィンドウを開く */}
        {this.state.showPopup ? (
          <Popup text="確認画面" closePopup={this.togglePopup}
            handleSousin={this.props.handleSousin}
            copyMember={this.props.copyMember}
            selectedMember={this.props.selectedMember}
            urlTournamentId={this.props.urlTournamentId}
            uniformNumberArray={this.props.uniformNumberArray} 
            PageTransition = {this.props.PageTransition}
            registeredMembers = {this.props.registeredMembers}
            />
        ) : null}
      </div>
    );
  }
}

//配置する部品の決まり文句
export default MemberPopup;