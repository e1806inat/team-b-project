import './PullDown.css';
const { Position } = require("../../../../../../DB/Position")
const { ballPositionDB } = require("../../../../../../DB/ballPositionDB")

export const PullDown = (props) => {

  const handleClick1 = (text) => {
    console.log(text)
  }



  const setPosition = (text) => {
    props.setNowPosition(text)
  }

  const setHit = (value) => {
    //座標指定
    props.setFlag(2)
    props.setcanvasX1(ballPositionDB[props.nowPosition - 1].ballPositionX)
    props.setcanvasY1(ballPositionDB[props.nowPosition - 1].ballPositionY)

    //自由記述
    if (value === 1) { props.setFreeWriteState(Position[props.nowPosition - 1].kata + "安打") }
    else if (value === 2) { props.setFreeWriteState(Position[props.nowPosition - 1].kata + ":ツーベースヒット") }
    else if (value === 3) { props.setFreeWriteState(Position[props.nowPosition - 1].kata + ":スリーベースヒット") }
  }

  const handleOut = (value) => {
    //座標指定
    props.setFlag(value)
    props.setcanvasX1(ballPositionDB[props.nowPosition - 1].ballPositionX)
    props.setcanvasY1(ballPositionDB[props.nowPosition - 1].ballPositionY)

    //自由記述
    if (value === 1) { props.setFreeWriteState("アウト:" + Position[props.nowPosition - 1].kata + "ライナー") }
    else if (value === 2) { props.setFreeWriteState("アウト:" + Position[props.nowPosition - 1].kata + "フライ") }
    else if (value === 3) { props.setFreeWriteState("アウト:" + Position[props.nowPosition - 1].kata + "ゴロ") }
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
            <li><a href="#" onClick={() => setPosition(5)}>ショート</a></li>
            <li><a href="#" onClick={() => setPosition(6)}>サード</a></li>
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
                <li><a href="#" onClick={() => handleOut(3)}>ゴロ</a></li>
                <li><a href="#" onClick={() => handleOut(2)}>フライ</a></li>
                <li><a href="#" onClick={() => handleOut(1)}>ライナー</a></li>
              </ul>
            </li>
            <li><a href="#">ホームラン</a>
              <ul>
                <li><a href="#">レフト側</a></li>
                <li><a href="#">センター側</a></li>
                <li><a href="#">ライト側</a></li>
                <li><a href="#">ランニングホームラン</a></li>
              </ul>
            </li>
            <li><a href="#">バント</a>
              <ul>
                <li><a href="#">犠牲バント</a></li>
                <li><a href="#">バント失敗</a></li>
                <li><a href="#">セーフティバント</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><a href="#">結果2</a>
          <ul>
            <li><a href="#">三振</a>
              <ul>
              <li><a href="#">三振</a></li>
                <li><a href="#">見逃し三振</a></li>
                <li><a href="#">空振り三振</a></li>
                <li><a href="#">振り逃げ</a></li>
              </ul>
            </li>
            <li><a href="#">死球</a></li>
            <li><a href="#">四球</a></li>
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
