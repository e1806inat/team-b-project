import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { OptionButton } from '../../../OtherPage/optionFunc/OptionButton'
import { TitleBar } from "../../../OtherPage/TitleBar/TitleBar";


const readTournament = (setTournamentData) => {
  fetch("http://localhost:5000/tournament/tournament_call", {
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
  const birthYearRef = useRef(null);
  const birthMonthRef = useRef(null);

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

  const setYear = () => {
    for (let i = InitialYear; i <= new Date().getFullYear() + 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      birthYearRef.current.appendChild(option);
    }
  }

  const setMonth = () => {
    for (let i = InitialMonth; i <= 12; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      birthMonthRef.current.appendChild(option);
    }
  }



  const selectBirthYear = (e) => {
    setBirthYear(e.target.value);
  }

  const selectBirthMonth = (e) => {
    setBirthMonth(e.target.value);
  }



  useEffect(() => {
    setYear();
    setMonth();
    readTournament(setTournamentData);
  }, []);

  return (
    <div>
      <TitleBar
        TitleText={"大会選択画面"}
        PageTransition={PageTransition}
        valueUrl={-1}
      />
      <OptionButton />
      <p></p>
      <label>
        <select ref={birthYearRef} value={birthYear} onChange={selectBirthYear}></select>年
      </label>
      <label>
        <select ref={birthMonthRef} value={birthMonth} onChange={selectBirthMonth}></select>月
      </label>
      <br />
      <br />
      <br />
      <br />
      <hr></hr>
      <br />

      <div className="tournamentList">
        <div className="tournaments">

          {TournamentData.map((Tournament, ind) => {
            //文字分割
            dateArray = dateSplit(Tournament.opening)

            return (
              <div className="tournament">
                <div className="days">
                  <span>{dateArray.year}年{dateArray.month}月{dateArray.day}日</span>
                </div>
                <div className="tournamentName">
                  <button
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
                  <br />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <hr></hr>
      <button><Link to={'/home/input_mode/pre_input'}>戻る</Link> </button>

    </div>
  )
}

export default Input_Tournament;