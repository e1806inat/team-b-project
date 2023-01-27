import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
// import { OptionButton } from '../../../../OtherPage/optionFunc/OptionButton'
// import { TitleBar } from "../../../../OtherPage/TitleBar/TitleBar";

//バックエンドのurlを取得
const backendUrl = require("../../../../../DB/communication").backendUrl;

const readTournament = (setTournamentData) => {
  fetch(backendUrl + "/tournament/tournament_call", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => setTournamentInfo(setTournamentData, data))
}

const setTournamentInfo = (setTournamentData, data) => {
  console.log(data)
  setTournamentData(data)
}

//文字分割
const dateSplit = (nowdate) => {
  let dateArray = nowdate.split('-');
  dateArray = { "year": dateArray[0], "month": dateArray[1], "day": dateArray[2] }
  return dateArray
}


export const SelectTournament = () => {

  const InitialYear = 2020
  const InitialMonth = 1

  const [birthYear, setBirthYear] = useState(InitialYear);
  const [birthMonth, setBirthMonth] = useState(InitialMonth);
  //文字分割のための箱を用意
  let dateArray = { "year": "", "month": "", "day": "" }

  let [TournamentData, setTournamentData] = useState([
    { "tournament_name": '第31回春大会', "tournament_id": '55', "opening": "2022-03-01" },
    { "tournament_name": '第9回松山大会', "tournament_id": '56', "opening": "2022-02-01" },
    { "tournament_name": '第5回伊予大会', "tournament_id": '57', "opening": "2022-01-01" },
    { "tournament_name": '第22回秋大会', "tournament_id": '58', "opening": "2021-08-01" }
  ])

  //ページ遷移用
  const navigate = useNavigate()
  const PageTransition = (url) => {
    navigate(url)
  }






  useEffect(() => {
    readTournament(setTournamentData);
  }, []);

  return (
    <div>
      {/* <TitleBar
        TitleText={"大会選択画面"}
        PageTransition={PageTransition}
        valueUrl={-1}
      />
      <OptionButton /> */}


      <div class="headline">大会選択</div>
      <div class="whole">
        <div className="tournamentList">
          <div className="tournaments">

            {TournamentData.map((Tournament, ind) => {
              if (Tournament.tournament_name !== null) {
                //文字分割
                dateArray = dateSplit(Tournament.opening)

                return (
                  <div className="tournament">
                    <div className="days">
                      <span>{dateArray.year}年{dateArray.month}月{dateArray.day}日</span>
                    </div>
                    <div className="tournamentName">
                      <button
                        className="btn_In_to1"
                        onClick={() =>
                          PageTransition(
                            "GameList?" +
                            "urlTournamentId=" +
                            Tournament.tournament_id +
                            "&urlTournamentName=" +
                            Tournament.tournament_name +
                            "&urlTournamentOpening=" +
                            Tournament.opening
                          )
                        }>
                        {Tournament.tournament_name}
                      </button>
                      <br />
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectTournament;