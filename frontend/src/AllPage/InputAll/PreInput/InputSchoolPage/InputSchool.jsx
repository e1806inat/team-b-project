import React, { useState, useRef } from "react";
import { Hyoji } from './comInputSchool/Hyoji';
import { CheckBoxList } from './comInputSchool/CheckBoxList1';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import { TitleBar } from "../../../OtherPage/TitleBar/TitleBar";
import { OptionButton } from "../../../OtherPage/optionFunc/OptionButton"

//バックエンドのurlを取得
const backendUrl = require("../../../../DB/communication").backendUrl;

//次回追加ボタン押した後に、高校再表示させるのをやる

//データを送る
const sendSchool = (useSchools, urlTournamentId, Schools, setUseSchools) => {
  let toSendSchool = []
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
  console.log(toSendSchool)

  fetch(backendUrl + "/school/participants_register", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    //body: JSON.stringify({ email:login_id , password:login_ps }),
    body: JSON.stringify(toSendSchool),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "OK") {
        readSchool(Schools, setUseSchools)
      }
    })
}


//データベースから初期項目を読み出し
const readSchool = (Schools, setUseSchools) => {
  fetch(backendUrl + "/school/school_call", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => readSchools(Schools, data, setUseSchools))
}

const readSchools = (Schools, data, setUseSchools) => {
  Schools = data
  console.log(Schools)
  enchantCheck(Schools, setUseSchools);
}


//checkを付与
const enchantCheck = (Schools, setUseSchools) => {
  let setUseSchools3 = []
  Schools.map((school) => {
    setUseSchools3 = (
      [...setUseSchools3, {
        school_name: school.school_name,
        school_id: school.school_id,
        IsCheck: true,
        seed: 0
      }])
  })
  setUseSchools(setUseSchools3)
}


//１つの高校を追加する
const addSchool = (Schools, setUseSchools, addSchoolName) => {
  console.log(addSchoolName)
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
        readSchools(Schools, setUseSchools)
      }
    })
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

  const [isCheckBoxMode, setIsCheckBoxMode] = useState(!true)
  const ref = useRef()
  const [useSchools, setUseSchools] = useState([])

  useEffect(() => {
    readSchool(Schools, setUseSchools);
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

      <div className="tournamentName">
        <h3>{urlTournamentName}</h3>
      </div>
      <div className="InputSchool">
        <input ref={ref} ></input>
        <button onClick={() => addSchool(Schools, setUseSchools, ref.current.value)}>追加</button>
      </div>
      <br />
      <button onClick={handleCheckBox}>チェックボックス入力</button>
      <button onClick={() => sendSchool(useSchools, urlTournamentId, Schools, setUseSchools)}>高校名登録</button>
      <hr></hr>
      {!isCheckBoxMode && Hyoji(useSchools, navigate, urlTournamentName, urlTournamentId)}
      {isCheckBoxMode && CheckBoxList(useSchools, setUseSchools)}<br />
      <hr></hr>
      <button><Link to={'/home/input_mode/'}>戻る</Link> </button>
    </div>
  )

}





export default InputSchool;