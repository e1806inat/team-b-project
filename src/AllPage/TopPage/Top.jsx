import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import {Option} from '../OtherPage/Option'

export const Input_Tournament = () => {
  const birthYearRef = useRef(null);
  const birthMonthRef = useRef(null);
  const NameTournamentRef = useRef(null);

  const InitialYear = 2020
  const InitialMonth = 1

  const [birthYear, setBirthYear] = useState(InitialYear);
  const [birthMonth, setBirthMonth] = useState(InitialMonth);

  let [TournamentData, setTournamentData] = useState([
    [2022, 3, '第31回春大会'],
    [2022, 2, '第9回松山大会'],
    [2022, 1, '第5回伊予大会'],
    [2021, 8, '第22回秋大会']
  ])

  //ページ遷移用
  const navigate = useNavigate()
  const PageTransition = (url) => {
      navigate(url)
  }

  const setYear = () => {
    for (let i = InitialYear; i <= new Date().getFullYear() + 10; i++) {
      const option = document.createElement('option');
      //const date = new Date(Date.UTC(i));
      //const jc = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', { year: 'numeric' }).format(date);
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


  const handleTournament = () => {
    let aTournament = [...TournamentData, [birthYear, birthMonth, NameTournamentRef.current.value]]
    aTournament.sort();
    aTournament.reverse();
    setTournamentData(aTournament);
    console.log({ "tournament_name": NameTournamentRef.current.value, "opening":birthYear+"-"+birthMonth+"-01" })
    

    fetch("http://localhost:5000/tournament/tournament_register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({ email:login_id , password:login_ps }),
      body: JSON.stringify({ "tournament_name": NameTournamentRef.current.value, "opening":birthYear+"-"+birthMonth+"-01" }),
    })
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
  }, []);

  return (
    <div>
      <Option></Option>
      <p></p>
      <h1>事前入力・選択画面</h1>
      <label>
        <select ref={birthYearRef} value={birthYear} onChange={selectBirthYear}></select>年
      </label>
      <label>
        <select ref={birthMonthRef} value={birthMonth} onChange={selectBirthMonth}></select>月
      </label>
      <br />
      <br />
      <br />
      <input type="text" ref={NameTournamentRef} />
      <button onClick={handleTournament}>追加</button>
      <br />
      <hr></hr>
      <br />

      <div className="tournamentList">
        <div className="tournaments">

          {TournamentData.map(Tournament => (
            <div className="tournament">
              <div className="days">
                <span>{Tournament[0]}年{Tournament[1]}月</span>
              </div>
              <div className="tournamentName">
                <button onClick={()=>PageTransition(Tournament[2] + "/inputschool")}>
                    {Tournament[2]}
                </button>
                <br />
                <br />
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr></hr>
      <button><Link to={'/home/input_mode/pre_input'}>戻る</Link> </button>
      
    </div>
  )
}

export default Input_Tournament;