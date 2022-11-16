import React, { useState, useEffect, useRef } from "react"
const { Member } = require("../../DB/Member") //Memberのファイルがあるアドレスを指定してください


const PullDown = () => {

  const memberNameRef = useRef(null)  //useref(refarenceで値を参照するという意味)を定義する
  const [memberNameState, setMemberState] = useState("aaaa")  //選択した名前に変化させるためのuseStateを定義する
  const [deleteState, setDeleteState] = useState(true)


  //useEffect内の関数は特定の条件を満たしたとき実行される
  //今回は初回にページが読み込まれたとき実行される
  useEffect(() => {
    initialSetMember()
  }, [])

  //useEffectから実行される
  //プルダウンの選択肢をここで定義している
  const initialSetMember = () => {
    for (let i = 1; i <= Member.length; i++) {
      const option = document.createElement('option')
      option.value = Member[i - 1].player_name_kanji //なぜ"vulue"と"text"の両方に値を入れているのかは分かりません
      option.text = Member[i - 1].player_name_kanji
      if(memberNameRef.current.value === i){option.disabled()}
      memberNameRef.current.appendChild(option)
    }
  }


//プルダウンをいじったときに実行される
//選択した名前に変更される
  const selectMember = (e) => {
    setMemberState(e.terget)
    setDeleteState(!deleteState)
    console.log(memberNameRef.current)
  }

  const handleButton = () => {
    console.log("a")
  }

  return (
    <>
      <div className="display">
        名前<select ref={memberNameRef} value={memberNameState} onChange={selectMember} ></select>&nbsp;
        <i onClick={handleButton} class="fa-solid fa-laptop size"></i>
      </div>
    </>
  )

}

export default PullDown