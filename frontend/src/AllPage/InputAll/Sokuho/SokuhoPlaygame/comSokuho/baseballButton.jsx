import "./CSS/baseballButton.css"

const pushPlus = (addScoreState, setAddScoreState) => {
  if (addScoreState < 4) setAddScoreState(addScoreState + 1)
}

const pushMinus = (addScoreState, setAddScoreState) => {
  if (addScoreState > 0) setAddScoreState(addScoreState - 1)
}

//三振時の結果
const handleSanshin = (setFlag, setcanvasX1, setcanvasY1, setFreeWriteState, setBatterResult) => {
  //座標指定
  setFlag(0)
  setcanvasX1(0)
  setcanvasY1(0)

  //打率計算のための記録
  setBatterResult(0)

  //自由記述
  setFreeWriteState("三振")
}

//四球の結果
const handleFourball = (setFlag, setcanvasX1, setcanvasY1, setFreeWriteState, setBatterResult) => {
  //座標指定
  setFlag(0)
  setcanvasX1(0); setcanvasY1(0)

  //自由記述
  setFreeWriteState("フォアボール"); setBatterResult(2)
}

//死球の結果
const handleDeadball = (setFlag, setcanvasX1, setcanvasY1, setFreeWriteState, setBatterResult) => {
  //座標指定
  setFlag(0)
  setcanvasX1(0); setcanvasY1(0)

  //自由記述
  setFreeWriteState("デッドボール"); setBatterResult(3)
}

export const BaseballButton = (
  addScoreState, setAddScoreState,
  setFlag, setcanvasX1, setcanvasY1, setFreeWriteState, setBatterResult
) => {





  return (
    <>
      <button className="addPointButton">追加点:{addScoreState}</button>
      <i
        className="fa-regular fa-square-plus"
        onClick={() => pushPlus(addScoreState, setAddScoreState)}
      ></i>
      <i
        className="fa-regular fa-square-minus"
        onClick={() => pushMinus(addScoreState, setAddScoreState)}
      ></i>

      <button className="sanshinButton" onClick={() => { handleSanshin(setFlag, setcanvasX1, setcanvasY1, setFreeWriteState, setBatterResult) }}>三振</button>
      {"　"}
      <button className="fourballButton" onClick={() => { handleFourball(setFlag, setcanvasX1, setcanvasY1, setFreeWriteState, setBatterResult) }}>四球</button>
      {"　"}
      <button className="deadballButton" onClick={() => { handleDeadball(setFlag, setcanvasX1, setcanvasY1, setFreeWriteState, setBatterResult) }}>死球</button>
    </>
  )
}

export default BaseballButton