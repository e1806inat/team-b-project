import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { OptionButton } from '../../../OtherPage/optionFunc/OptionButton'
import { TitleBar } from "../../../OtherPage/TitleBar/TitleBar";
import { useCookies } from 'react-cookie'

//バックエンドのurlを取得
const backendUrl = require("../../../../DB/communication").backendUrl;

//フロントの階層urlを取得
const routeUrl = require("../../../../DB/communication").routeUrl;

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


export const Input_Tournament = () => {

    //クッキー関連
    const [cookies, setCookie, removeCookie] = useCookies();

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

    //セッション関連
    useEffect(() => {
      const gameStart = async () => {
        const CheckSess = await fetch(backendUrl + "/auth/check_sess",
          {
            method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ sessionID: cookies.sessionID })
          })
        const sess = await CheckSess.text();
        console.log(sess)
        console.log(cookies.sessionID)
        if (sess === 'logout') {
          PageTransition(routeUrl + "/login");
        }
      }
      gameStart()
    }, [])

  return (
    <div>
      <TitleBar
        TitleText={"大会選択画面"}
        PageTransition={PageTransition}
        valueUrl={-1}
      />
      <OptionButton />


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
                            "sokuho_input_makegame?urlTournamentId=" +
                            Tournament.tournament_id +
                            "&urlTournamentName=" +
                            Tournament.tournament_name
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

export default Input_Tournament;