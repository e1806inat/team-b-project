import React, { useState, useRef } from "react";
import { Hyoji } from './comInputSchool/Hyoji';
import { CheckBoxList } from './comInputSchool/CheckBoxList1';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


//データベースとのやり取り
const sendSchool = (useSchools) => {
  let toSendSchool = []
  useSchools.map((school) => {
    if (school.IsCheck){
      toSendSchool = [...toSendSchool,
        {
          tournament_id: 1,
          school_name: school.school_name,
          school_id: school.school_id,
          seed: school.seed
        }]
    }

  })
  console.log(toSendSchool)

  fetch("http://localhost:5000/school/participants_register", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    //body: JSON.stringify({ email:login_id , password:login_ps }),
    body: JSON.stringify(toSendSchool),
  })
}


//データベースから初期項目を読み出し
const readSchool = (Schools, setUseSchools) => {
  fetch("http://localhost:5000/school/school_call", {
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


export const InputSchool = () => {

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
      <h1>学校・チーム名入力</h1>

      <div className="InputSchool">
        <input ref={ref} ></input>
        <button onClick={handleClick}>追加</button>
      </div>
      <br />
      <button onClick={handleCheckBox}>チェックボックス入力</button>
      <button onClick={() => sendSchool(useSchools)}>高校名登録</button>
      <hr></hr>
      {!isCheckBoxMode && Hyoji(useSchools, setUseSchools, navigate)}
      {isCheckBoxMode && CheckBoxList(useSchools, setUseSchools)}<br />
      <hr></hr>
      <button><Link to={'/home/input_mode/'}>戻る</Link> </button>
    </div>
  )

}





export default InputSchool;