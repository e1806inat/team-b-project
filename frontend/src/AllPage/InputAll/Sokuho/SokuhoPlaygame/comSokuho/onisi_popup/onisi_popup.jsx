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
  setNowOutCountState,
  DasekiRegister,
  urlGameId,
  urlSchoolId,
  urlSchoolId2,
  nowPlayingMember,
  setNowPlayingMember,
  battingOrder,
  battingOrder2,
  runnerCountState,
  freeWriteState,
  setFreeWriteState,
  canvasX1,
  setcanvasX1,
  canvasY1,
  setcanvasY1,
  flag,
  batterResult,
  setBatterResult,
  isPinch,
  setIsPinch,
  TmpDasekiCall,
  trigger,
  setTrigger,
  isPass,
  setIsPass

) => {
  //ポップアップを消す
  closePopup()

  //scoreの更新
  scoreState = scoreState.slice(0, scoreState.length); // stateの配列をコピー(値渡し)
  if (scoreState[nowIningState[1]][nowIningState[0]] === null) scoreState[nowIningState[1]][nowIningState[0]] = addScoreState
  else scoreState[nowIningState[1]][nowIningState[0]] = addScoreState + scoreState[nowIningState[1]][nowIningState[0]]

  //イニングの更新
  if (nowOutCountState === 3) {
    setNowOutCountState(0)
    if (nowIningState[1] % 2 === 0) { setNowIningState([nowIningState[0], 1]) }
    else if (nowIningState[1] % 2 === 1) { setNowIningState([nowIningState[0] + 1, 0]) }
  }

  //DBに送るための準備
  const schoolIdArray = [urlSchoolId, urlSchoolId2]
  const battingOrderArray = [battingOrder, battingOrder2]
  let total_score = 0
  scoreState[nowIningState[1]].map((score) => {
    if (score !== null) total_score = total_score + score
  })
  let runnerCount = ""
  runnerCountState.map((runner) => {
    if (runner === true) runnerCount = runnerCount + "1"
    else if (runner === false) runnerCount = runnerCount + "0"
  })
  let isHit = 0; let isFourball = 0; let isDeadball = 0;
  if (batterResult === 0) { }
  else if (batterResult === 1) isHit = 1
  else if (batterResult === 2) isFourball = 1
  else if (batterResult === 3) isDeadball = 1

  //DBにデータを送る配列作成
  let sendInfo = {
    table_name: urlGameId,
    inning: (nowIningState[0] + 1) * 10 + (nowIningState[1] + 1),
    game_id: urlGameId,
    school_id: schoolIdArray[nowIningState[1]],
    player_id: battingOrderArray[nowIningState[1]][nowPlayingMember[nowIningState[1]].batter].player_id,
    pitcher_id: battingOrder2[nowPlayingMember[nowIningState[1]].pitcher].player_id,
    score: addScoreState,
    total_score: total_score,
    outcount: nowOutCountState,
    base: runnerCount,
    text_inf: freeWriteState,
    pass: isPass,
    touched_coordinate: canvasX1 + "_" + canvasY1,
    ball_kind: flag,
    hit: isHit,
    foreball: isFourball,
    deadball: isDeadball,
    pinch: isPinch,
    batting_order: nowPlayingMember[nowIningState[1]].batter
  }

  console.log(sendInfo)
  //実際に送信
  DasekiRegister(sendInfo,trigger,setTrigger)

  //値の初期化
  setAddScoreState(0)
  setFreeWriteState("")
  setcanvasX1(0)
  setcanvasY1(0)
  setBatterResult(0)
  setIsPinch(null)
  setIsPass(0)
  

  //次のバッターへ
  let copyArray = nowPlayingMember.slice(0, nowPlayingMember.length);
  if (copyArray[nowIningState[1]].batter >= 8) copyArray[nowIningState[1]].batter = 0
  else if (copyArray[nowIningState[1]].batter >= 0)
    copyArray[nowIningState[1]].batter = copyArray[nowIningState[1]].batter + 1
  setNowPlayingMember(copyArray)

  //入力メモ
  //12回裏は212

}

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
                this.props.setNowOutCountState,
                this.props.DasekiRegister,
                this.props.urlGameId,
                this.props.urlSchoolId,
                this.props.urlSchoolId2,
                this.props.nowPlayingMember,
                this.props.setNowPlayingMember,
                this.props.battingOrder,
                this.props.battingOrder2,
                this.props.runnerCountState,
                this.props.freeWriteState,
                this.props.setFreeWriteState,
                this.props.canvasX1,
                this.props.setcanvasX1,
                this.props.canvasY1,
                this.props.setcanvasY1,
                this.props.flag,
                this.props.batterResult,
                this.props.setBatterResult,
                this.props.isPinch,
                this.props.setIsPinch,
                this.props.TmpDasekiCall,
                this.props.trigger,
                this.props.setTrigger,
                this.props.isPass,
                this.props.setIsPass
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
            DasekiRegister={this.props.DasekiRegister}
            urlGameId={this.props.urlGameId}
            urlSchoolId={this.props.urlSchoolId}
            urlSchoolId2={this.props.urlSchoolId2}
            nowPlayingMember={this.props.nowPlayingMember}
            setNowPlayingMember={this.props.setNowPlayingMember}
            battingOrder={this.props.battingOrder}
            battingOrder2={this.props.battingOrder2}
            runnerCountState={this.props.runnerCountState}
            freeWriteState={this.props.freeWriteState}
            setFreeWriteState={this.props.setFreeWriteState}
            canvasX1={this.props.canvasX1}
            setcanvasX1={this.props.setcanvasX1}
            canvasY1={this.props.canvasY1}
            setcanvasY1={this.props.setcanvasY1}
            flag={this.props.flag}
            batterResult={this.props.batterResult}
            setBatterResult={this.props.setBatterResult}
            isPinch={this.props.isPinch}
            setIsPinch={this.props.setIsPinch}
            TmpDasekiCall={this.props.TmpDasekiCall}
            trigger={this.props.trigger}
            setTrigger={this.props.setTrigger}
            isPass = {this.props.isPass}
            setIsPass={this.props.setIsPass} 
          />
        ) : null}
      </div>
    );
  }
}

//配置する部品の決まり文句
export default Popupfield;