import React, { useState, useRef } from "react";
import { Hyoji } from './comInputSchool/Hyoji';
import { CheckBoxList } from './comInputSchool/CheckBoxList1';
import { Link, useNavigate } from "react-router-dom";


//データベースとのやり取り
const sendSchool = (useSchools) => {
  let toSendSchool = []
  useSchools.map((school, ind) => {
    toSendSchool = [...toSendSchool, { tournament_id: 2, school_id: ind+1 }]
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

export const InputSchool = () => {

  //ページ遷移用
  const navigate = useNavigate()
  const PageTransition = (url) => {
    navigate(url)
  }

  const { Schools } = require("../../../../DB/Schools"); //分割代入
  const [isCheckBoxMode, setIsCheckBoxMode] = useState(!true)
  const ref = useRef()


  //配列にID付与
  let setUseSchools3 = []
  Schools.map((school) => {
    setUseSchools3 = ([...setUseSchools3, { school: school.school, IsCheck: true }])
    console.log(setUseSchools3)
  })
  const [useSchools, setUseSchools] = useState(setUseSchools3)



  const handleClick = () => {
    setUseSchools([...useSchools, { school: ref.current.value, IsCheck: true }])
  }

  const handleCheckBox = () => {
    console.log("a")
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
      <hr></hr>
      {!isCheckBoxMode && Hyoji(useSchools, setUseSchools, navigate)}
      {isCheckBoxMode && CheckBoxList(useSchools, setUseSchools)}<br />
      <button onClick={() => sendSchool(useSchools)}>高校名登録</button>
      <hr></hr>
      <button><Link to={'/home/input_mode/'}>戻る</Link> </button>
    </div>
  )

}





export default InputSchool;