import React, { useState, useRef } from "react";
import { Hyoji } from './comInputSchool/Hyoji';
import { CheckBoxList } from './comInputSchool/CheckBoxList1';
import { Link } from "react-router-dom";




export const InputSchool = () => {
  const { Schools } = require("../DB/Schools"); //分割代入
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

  const handleResister = () => {
    let copySchools = [];
    useSchools.map(school => {
      copySchools = [...copySchools, school.school]
    })

    console.log(copySchools)

    fetch("http://localhost:5000/auth/user_register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
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
      {!isCheckBoxMode && Hyoji(useSchools, setUseSchools)}
      {isCheckBoxMode && CheckBoxList(useSchools, setUseSchools)}<br />
      <button onClick={handleResister}>高校名登録</button>
      <hr></hr>
      <button><Link to={'/home/input_mode/'}>戻る</Link> </button>
    </div>
  )

}





export default InputSchool;