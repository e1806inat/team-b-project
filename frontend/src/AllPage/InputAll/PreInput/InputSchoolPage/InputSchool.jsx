import React, { useState, useRef } from "react";
import { Hyoji } from './comInputSchool/Hyoji';
import { CheckBoxList } from './comInputSchool/CheckBoxList1';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import { TitleBar } from "../../../OtherPage/TitleBar/TitleBar";
import { OptionButton } from "../../../OtherPage/optionFunc/OptionButton"

import './InputSchool.css';

//バックエンドのurlを取得
const backendUrl = require("../../../../DB/communication").backendUrl;

//次回追加ボタン押した後に、高校再表示させるのをやる

//データを送る
const sendSchool = (useSchools, urlTournamentId, setUseSchools) => {
  let toSendSchool = []
  //チェックされているものだけの配列を作る
  useSchools.map((school) => {
    if (school.IsCheck) {
      toSendSchool = [...toSendSchool,
      {
        tournament_id: urlTournamentId,
        school_name: school.school_name,
        school_id: school.school_id,
        seed: school.seed
      }]
    }

  })

  fetch(backendUrl + "/school/school_call_p", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tournament_id: urlTournamentId }),
  })
    .then((response) => response.json())
    .then((receivedResistered) => {

      //既に登録されているものと被っていないかチェック
      let toSendSchool2 = []
      toSendSchool.map((v) => {
        if (receivedResistered.some((u) => v.school_name === u.school_name))
          console.log("「" + v.school_name + "」は名前が被っています")
        else { toSendSchool2 = [...toSendSchool2, v]; }
      })
      console.log(toSendSchool2)

      //空っぽの配列は送れないように対策
      if (toSendSchool2.length !== 0) {
        fetch(backendUrl + "/school/participants_register", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          //body: JSON.stringify({ email:login_id , password:login_ps }),
          body: JSON.stringify(toSendSchool2),
        })
          .then((response) => response.text())
          .then((data) => {
            if (data === "OK") {
              readSchool(setUseSchools, urlTournamentId)
            }
          })
      }

    })
}


//データベースから初期項目を読み出し
const readSchool = (setUseSchools, urlTournamentId) => {
  fetch(backendUrl + "/school/school_call", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((receivedAllSchool) => {

      // enchantCheck(receivedAllSchool, setUseSchools);
      loadRegisteredSchool(urlTournamentId, receivedAllSchool, setUseSchools)
    })
}


//対象の大会の学校情報呼び出し
const loadRegisteredSchool = (urlTournamentId, receivedAllSchool, setUseSchools) => {


  fetch(backendUrl + "/school/school_call_p", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tournament_id: urlTournamentId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        console.log("登録されていません")
        enchantCheck(receivedAllSchool, setUseSchools, [])
      }
      else {
        console.log(data);
        enchantCheck(receivedAllSchool, setUseSchools, data)
      }
    })
}


//checkを付与
const enchantCheck = (receivedAllSchool, setUseSchools, data) => {
  let setUseSchools3 = []
  receivedAllSchool.map((school) => {
    if (data.some((u) => u.school_id === school.school_id)) {
      setUseSchools3 = (
        [...setUseSchools3, {
          school_name: school.school_name,
          school_id: school.school_id,
          IsCheck: true,
          seed: 0
        }])
    }
    else {
      setUseSchools3 = (
        [...setUseSchools3, {
          school_name: school.school_name,
          school_id: school.school_id,
          IsCheck: false,
          seed: 0
        }])
    }

  })
  setUseSchools(setUseSchools3)
}


//１つの高校を追加する
const addSchool = (setUseSchools, addSchoolName, urlTournamentId, useSchools) => {
  if (useSchools.some((v) => v.school_name === addSchoolName)) console.log("高校名がかぶっています")
  else {
    fetch(backendUrl + "/school/school_register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ school_name: addSchoolName }),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "OK") {
          readSchool(setUseSchools, urlTournamentId)
        }
      })
  }

}





export const InputSchool = () => {

  const [searchParams] = useSearchParams();
  const urlTournamentName = searchParams.get("urlTournamentName")
  const urlTournamentId = searchParams.get("urlTournamentId")

  //ページ遷移用
  const navigate = useNavigate()
  const PageTransition = (url) => {
    navigate(url)
  }

  //const { Schools } = require("../../../../DB/Schools"); //分割代入
  let Schools = []

  // const [receivedResistered, setReeceivedResistered] = useState([])

  const [isCheckBoxMode, setIsCheckBoxMode] = useState(!true)
  const ref = useRef()
  const [useSchools, setUseSchools] = useState([])

  useEffect(() => {
    //全学校読み出し
    readSchool(setUseSchools, urlTournamentId);
    //既に登録されている学校読み出し
    // loadRegisteredSchool(urlTournamentId)
  }, [])

  const handleClick = () => {
    setUseSchools([...useSchools,
    { school_name: ref.current.value, school_id: null, IsCheck: true, seed: 0 }
    ])
  }

  const handleCheckBox = () => {
    setIsCheckBoxMode(!isCheckBoxMode)
    return (
      <button>aa</button>
    )
  }



  return (
    <div className="main">
      <TitleBar
        TitleText={"高校入力選択画面"}
        PageTransition={PageTransition}
        valueUrl={-1}
      />
      <OptionButton />

      <div className="top">
        <button className="BackButton"><Link to={'/home/input_mode/'} className="BackButton">＜戻る</Link> </button>
      </div>

      <div className="tournamentName">
        <h3>{urlTournamentName}</h3>
      </div>
      <div className="InputSchool">
        学校・チーム名 <input ref={ref} ></input>
        <button onClick={() => addSchool(setUseSchools, ref.current.value, urlTournamentId, useSchools)}>追加</button>
      </div>
      <br />

      {/* <button onClick={handleCheckBox}>チェックボックス入力</button>
      <button onClick={() => sendSchool(useSchools, urlTournamentId, Schools, setUseSchools)}>高校名登録</button> */}

      <div className="ButtonArea">
        <button id="checkButton" onClick={handleCheckBox}>高校選択</button>
      </div>

      <hr></hr>
      {!isCheckBoxMode && Hyoji(useSchools, navigate, urlTournamentName, urlTournamentId)}
      {isCheckBoxMode && CheckBoxList(useSchools, setUseSchools)}<br />
      <div className="ButtonArea">
        <button className="decisionButton" onClick={() => sendSchool(useSchools, urlTournamentId, setUseSchools)}>高校名登録</button>
      </div>

      <hr></hr>
    </div>
  )

}





export default InputSchool;