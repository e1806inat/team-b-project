import "./CSS/baseballButton.css"

const pushPlus = (addScoreState, setAddScoreState) => {
  if(addScoreState<4) setAddScoreState(addScoreState + 1)
}

const pushMinus = (addScoreState, setAddScoreState) => {
  if(addScoreState>0) setAddScoreState(addScoreState - 1)
}

export const BaseballButton = (addScoreState, setAddScoreState) => {



  return (
    <div>
      <button>得点:{addScoreState}</button>
      <i
        className="fa-regular fa-square-plus"
        onClick={() => pushPlus(addScoreState, setAddScoreState)}
      ></i>
      <i
        className="fa-regular fa-square-minus"
        onClick={() => pushMinus(addScoreState, setAddScoreState)}
      ></i>
    </div>
  )
}

export default BaseballButton