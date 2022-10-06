import React, { useState, useRef, useEffect } from "react";
import { Hyoji } from './comInputSchool/Hyoji';
import { CheckBoxList } from './comInputSchool/CheckBoxList';




export const InputSchool = () => {
  const { Schools } = require("../DB/Schools"); //分割代入
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
    //linkしてやる必要があるかも,handleCheckの中でフックスを呼び出してはいけない,return以外全部消してみる
    CheckBoxList(useSchools, setUseSchools)
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
      {Hyoji(useSchools, setUseSchools)}
      <hr></hr>
    </div>
  )

}





export default InputSchool;