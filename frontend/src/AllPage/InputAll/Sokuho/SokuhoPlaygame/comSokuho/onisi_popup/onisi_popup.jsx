import React from "react";
import './onisi_popup.css'

const handleKakutei = (

  closePopup,
  nowIningState,
  setNowIningState,
  addScoreState,
  setAddScoreState,
  scoreState,
  setScoreState,
  nowOutCountState,
  setNowOutCountState

) => {
  //ポップアップを消す
  closePopup()

  //scoreの更新
  scoreState = scoreState.slice(0, scoreState.length); // stateの配列をコピー(値渡し)
  scoreState[nowIningState[0]][nowIningState[1] - 1] = scoreState[nowIningState[0]][nowIningState[1] - 1] + addScoreState
  setScoreState(scoreState)

  console.log(nowOutCountState)
  //イニングの更新
  if (nowOutCountState === 3) {

    setNowOutCountState(0)
    if(nowIningState[1]%2===0){setNowIningState([nowIningState[0],1])}
    else if (nowIningState[1]%2===1){setNowIningState([nowIningState[0]+1,0])}
    
 
  }
}

//メインのDOMの中で配置するサブ部品のような要素
class Popup extends React.Component {
  render() {
    console.log(this.props.nowOutCountState)
    return (
      <div className="popup_field">
        <div className="popup_inner_field">
          <div className="title">{this.props.text}</div>
          <p>情報が更新されますがよろしいでしょうか？</p>
          <button className="button_style" onClick={this.props.closePopup}>いいえ</button>
          <nbsp></nbsp>
          {/* <button className="button_style" onClick={this.props.closePopup}>はい</button> */}
          <button
            className="button_style"
            onClick={
              () => handleKakutei(
                this.props.closePopup,
                this.props.nowIningState,
                this.props.setNowIningState,
                this.props.addScoreState,
                this.props.setAddScoreState,
                this.props.scoreState,
                this.props.setScoreState,
                this.props.nowOutCountState,
                this.props.setNowOutCountState
              )
            }>はい
          </button>
        </div>
      </div>
    );
  }
}

//コンポーネントの内部に別のコンポーネントを持つことができる　ここではPopupというコンポ―ネントがある
class Popupfield extends React.Component {
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
        <i className="fa-solid fa-rotate-right updatebutton" onClick={this.togglePopup}></i>
        {/* this.state.PopupがtrueであればPopupウィンドウを開く */}
        {this.state.showPopup ? (
          <Popup
            text="確認画面"
            closePopup={this.togglePopup}
            nowIningState={this.props.nowIningState}
            setNowIningState={this.props.setNowIningState}
            addScoreState={this.props.addScoreState}
            setAddScoreState={this.props.setAddScoreState}
            scoreState={this.props.scoreState}
            setScoreState={this.props.setScoreState}
            nowOutCountState={this.props.nowOutCountState} 
            setNowOutCountState={this.props.setNowOutCountState}
          />
        ) : null}
      </div>
    );
  }
}

//配置する部品の決まり文句
export default Popupfield;