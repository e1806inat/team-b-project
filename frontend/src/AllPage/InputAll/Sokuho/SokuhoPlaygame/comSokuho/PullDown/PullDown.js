import './PullDown.css';
const { Position } = require("../../../../../../DB/Position")
const { ballPositionDB } = require("../../../../../../DB/ballPositionDB")


export const PullDown = (props) => {


  const setPosition = (text) => {
    props.setNowPosition(text)
  }

  //ヒット時の結果
  const setHit = (value) => {
    //座標指定
    props.setFlag(2)
    props.setcanvasX1(ballPositionDB[props.nowPosition - 1].ballPositionX)
    props.setcanvasY1(ballPositionDB[props.nowPosition - 1].ballPositionY)

    //打率計算のための記録
    props.setBatterResult(1)

    //タイムリーかどうか
    let isTimelyText = "";
    if (props.addScoreState !== 0) isTimelyText = "タイムリー"

    //自由記述
    if (value === 1) { props.setFreeWriteState(isTimelyText + Position[props.nowPosition - 1].kata + "安打") }
    else if (value === 2) { props.setFreeWriteState(isTimelyText + Position[props.nowPosition - 1].kata + ":ツーベースヒット") }
    else if (value === 3) { props.setFreeWriteState(isTimelyText + Position[props.nowPosition - 1].kata + ":スリーベースヒット") }
  }

  //アウト時の結果
  const handleOut = (value) => {
    //座標指定
    props.setFlag(value)
    props.setcanvasX1(ballPositionDB[props.nowPosition - 1].ballPositionX)
    props.setcanvasY1(ballPositionDB[props.nowPosition - 1].ballPositionY)

    // //アウトカウント増やす
    // props.setNowOutCountState(props.nowOutCountState + 1)

    //打率計算のための記録
    props.setBatterResult(0)

    //自由記述
    if (value === 1) { props.setFreeWriteState("アウト:" + Position[props.nowPosition - 1].kata + "ライナー") }
    else if (value === 2) { props.setFreeWriteState("アウト:" + Position[props.nowPosition - 1].kata + "フライ") }
    else if (value === 3) { props.setFreeWriteState("アウト:" + Position[props.nowPosition - 1].kata + "ゴロ") }
  }

  //エラー時の結果
  const handleError = (value) => {
    //座標指定
    props.setFlag(value)
    props.setcanvasX1(ballPositionDB[props.nowPosition - 1].ballPositionX)
    props.setcanvasY1(ballPositionDB[props.nowPosition - 1].ballPositionY)

    //打率計算のための記録
    props.setBatterResult(0)

    //自由記述
    if (value === 1) { props.setFreeWriteState("エラー:" + Position[props.nowPosition - 1].kata + "ライナー") }
    else if (value === 2) { props.setFreeWriteState("エラー:" + Position[props.nowPosition - 1].kata + "フライ") }
    else if (value === 3) { props.setFreeWriteState("エラー:" + Position[props.nowPosition - 1].kata + "ゴロ") }
  }

  //ホームランの結果
  const handleHomerun = (value) => {
    //タイムリーかどうか
    let isTimelyText = "";
    if (props.addScoreState !== 0) isTimelyText = "タイムリー"

    //座標指定
    props.setFlag(2)
    props.setcanvasX1(ballPositionDB[1 + value].ballPositionX)
    props.setcanvasY1(0)

    //打率計算のための記録
    props.setBatterResult(1)

    //自由記述と座標指定
    if (value === 1) { 
      props.setFreeWriteState(isTimelyText + "レフト側ホームラン") 
      props.setcanvasX1(ballPositionDB.find((v)=> v.name === "HR_left").ballPositionX)
      props.setcanvasY1(ballPositionDB.find((v)=> v.name === "HR_left").ballPositionY)
    }
    else if (value === 2) { 
      props.setFreeWriteState(isTimelyText + "センター側ホームラン") 
      props.setcanvasX1(ballPositionDB.find((v)=> v.name === "HR_center").ballPositionX)
      props.setcanvasY1(ballPositionDB.find((v)=> v.name === "HR_center").ballPositionY)
    }
    else if (value === 3) { 
      props.setFreeWriteState(isTimelyText + "ライト側ホームラン") 
      props.setcanvasX1(ballPositionDB.find((v)=> v.name === "HR_right").ballPositionX)
      props.setcanvasY1(ballPositionDB.find((v)=> v.name === "HR_right").ballPositionY)
    }
    else if (value === 4) {
      props.setFlag(2)
      props.setFreeWriteState(isTimelyText + Position[props.nowPosition - 1].kata + "ランニングホームラン")
      props.setcanvasX1(ballPositionDB[props.nowPosition - 1].ballPositionX)
      props.setcanvasY1(ballPositionDB[props.nowPosition - 1].ballPositionY)
    }
  }

  //バントの結果
  const handleBunt = (value) => {
    //座標指定
    props.setFlag(2)
    props.setcanvasX1(0)
    props.setcanvasY1(0)

    //打率計算のための記録
    props.setBatterResult(1)

    //自由記述
    if (value === 1) { props.setFreeWriteState("犠牲バント") }
    else if (value === 2) { props.setFreeWriteState("アウト：バント") }
    else if (value === 3) { props.setFreeWriteState("バント失敗") }
    else if (value === 4) { props.setFreeWriteState("セーフティバント") }
  }


  //三振時の結果
  const handleSanshin = (value) => {
    //座標指定
    props.setFlag(0)
    props.setcanvasX1(0)
    props.setcanvasY1(0)

    //打率計算のための記録
    props.setBatterResult(0)

    //自由記述
    if (value === 1) { props.setFreeWriteState("三振") }
    else if (value === 2) { props.setFreeWriteState("見逃し三振") }
    else if (value === 3) { props.setFreeWriteState("空振り三振") }
    else if (value === 4) { props.setFreeWriteState("三振:振り逃げ") }
  }


  //四死球の結果
  const handleShishikyu = (value) => {
    //座標指定
    props.setFlag(0)
    props.setcanvasX1(0)
    props.setcanvasY1(0)

    //自由記述
    if (value === 1) { props.setFreeWriteState("フォアボール"); props.setBatterResult(2) }
    else if (value === 2) { props.setFreeWriteState("デッドボール"); props.setBatterResult(3) }
  }



  return (
    <div className="PullDown">

      <ul id="dropmenu">

        <li><a href="#">{Position[props.nowPosition - 1].kata}</a>
          <ul>
            <li><a href="#" onClick={() => setPosition(1)}>ピッチャー</a></li>
            <li><a href="#" onClick={() => setPosition(2)}>キャッチャー</a></li>
            <li><a href="#" onClick={() => setPosition(3)}>ファースト</a></li>
            <li><a href="#" onClick={() => setPosition(4)}>セカンド</a></li>
            <li><a href="#" onClick={() => setPosition(5)}>サード</a></li>
            <li><a href="#" onClick={() => setPosition(6)}>ショート</a></li>
            <li><a href="#" onClick={() => setPosition(7)}>レフト</a></li>
            <li><a href="#" onClick={() => setPosition(8)}>センター</a></li>
            <li><a href="#" onClick={() => setPosition(9)}>ライト</a></li>
            <li><a href="#" onClick={() => setPosition(10)}>一二間</a></li>
            <li><a href="#" onClick={() => setPosition(11)}>二遊間</a></li>
            <li><a href="#" onClick={() => setPosition(12)}>三遊間</a></li>
            <li><a href="#" onClick={() => setPosition(13)}>左中間</a></li>
            <li><a href="#" onClick={() => setPosition(14)}>右中間</a></li>

          </ul>
        </li>
        <li><a href="#">結果</a>
          <ul>
            <li><a href="#">ヒット</a>
              <ul>
                <li><a href="#" onClick={() => setHit(1)}>シングル</a></li>
                <li><a href="#" onClick={() => setHit(2)}>ツーベース</a></li>
                <li><a href="#" onClick={() => setHit(3)}>スリーベース</a></li>
              </ul>
            </li>
            <li><a href="#">アウト</a>
              <ul>
                <li><a href="#" onClick={() => handleOut(3)}>ゴロ</a></li>
                <li><a href="#" onClick={() => handleOut(2)}>フライ</a></li>
                <li><a href="#" onClick={() => handleOut(1)}>ライナー</a></li>
              </ul>
            </li>
            <li><a href="#">エラー</a>
              <ul>
                <li><a href="#" onClick={() => handleError(3)}>ゴロ</a></li>
                <li><a href="#" onClick={() => handleError(2)}>フライ</a></li>
                <li><a href="#" onClick={() => handleError(1)}>ライナー</a></li>
              </ul>
            </li>
            <li><a href="#">ホームラン</a>
              <ul>
                <li><a href="#" onClick={() => handleHomerun(1)}>レフト側</a></li>
                <li><a href="#" onClick={() => handleHomerun(2)}>センター側</a></li>
                <li><a href="#" onClick={() => handleHomerun(3)}>ライト側</a></li>
                <li><a href="#" onClick={() => handleHomerun(4)}>ランニングホームラン</a></li>
              </ul>
            </li>
            <li><a href="#">バント</a>
              <ul>
                <li><a href="#" onClick={() => handleBunt(1)}>犠牲バント</a></li>
                <li><a href="#" onClick={() => handleBunt(2)}>アウト:バント</a></li>
                <li><a href="#" onClick={() => handleBunt(3)}>バント失敗</a></li>
                <li><a href="#" onClick={() => handleBunt(4)}>セーフティバント</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><a href="#">結果2</a>
          <ul>
            <li><a href="#">三振</a>
              <ul>
                {/* 三振 */}
                <li><a href="#" onClick={() => handleSanshin(1)}>三振</a></li>
                <li><a href="#" onClick={() => handleSanshin(2)}>見逃し三振</a></li>
                <li><a href="#" onClick={() => handleSanshin(3)}>空振り三振</a></li>
                <li><a href="#" onClick={() => handleSanshin(4)}>振り逃げ</a></li>
              </ul>
            </li>
            {/* 四死球 */}
            <li><a href="#" onClick={() => handleShishikyu(1)}>四球</a></li>
            <li><a href="#" onClick={() => handleShishikyu(2)}>死球</a></li>
            {/* 試合終了 */}
            <props.GameEndPopup_field
            TableRegister = {props.TableRegister}
            urlGameId={props.urlGameId}
            TmpTableDelete={props.TmpTableDelete}
            DeleteDuringGame={props.DeleteDuringGame}
            CalculateBatAvg={props.CalculateBatAvg}
            />
            {/* <li><a href="#" onClick={() => handleGameEnd(props.GameEndPopup_field)}>試合終了</a></li> */}
          </ul>
        </li>
      </ul>

    </div>
  );
}

export default PullDown;

{/* <ul>
<li><a href="#">シングル</a>
  <Position></Position>
</li>
<li><a href="#">ツーベース</a>
  <Position></Position>
</li>
<li><a href="#">スリーベース</a>
  <Position></Position>
</li>
</ul> */}


// const Position = () => {
//   return (

//     <>
//       <ul>
//         <li><a href="#">ピッチャー</a></li>
//         <li><a href="#">キャッチャー</a></li>
//         <li><a href="#">ファースト</a></li>
//         <li><a href="#">セカンド</a></li>
//         <li><a href="#">ショート</a></li>
//         <li><a href="#">サード</a></li>
//         <li><a href="#">レフト</a></li>
//         <li><a href="#">センター</a></li>
//         <li><a href="#">ライト</a></li>
//       </ul>
//     </>
//   )

// }
