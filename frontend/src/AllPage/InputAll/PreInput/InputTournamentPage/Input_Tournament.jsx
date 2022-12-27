import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { OptionButton } from '../../../OtherPage/optionFunc/OptionButton'
import { TitleBar } from "../../../OtherPage/TitleBar/TitleBar";
import EditTournamentPopup from "./com/EditTournamentPopup/EditTournamentPopup";

import "./InputTournament.css"

//バックエンドのurlを取得
const backendUrl = require("../../../../DB/communication").backendUrl;

//大会を読み込む
const readTournament = (setTournamentData) => {
  fetch(backendUrl + "/tournament/tournament_call", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => setTournamentData(data))
}


//文字分割
const dateSplit = (nowdate) => {
  let dateArray = nowdate.split('-');
  dateArray = { "year": dateArray[0], "month": dateArray[1], "day": dateArray[2] }
  return dateArray
}





//自作プルダウン
const makePulldown = (pulldownId, ArrayList, idText, nowSelected, setNowSelected) => {
  //pulldownIdは0でいいです。
  //ArrayListは表示したい要素を並べた配列です、普通の配列ではなく連想配列です。
  //idテキストは連想配列の属性を書きます。
  //nowSelectedは今プルダウンで何が選択されているかが入ります。初期値は[0]で、これは0番目の値が選択されている状態です。
  //setNowSelectedはnowSelecedの値をuseStateの機能で上書きする関数です。setNowSelected(更新値)とすれば、nowSelectedに更新値が入ります。

  return (
    <>
      <select id="tekitouni"
        onChange={(e) => {
          //ステイトが変化すると再描画させるための文、これがないと再描画されない
          //なお、消すと再描画はされないが内部は変化する
          nowSelected = nowSelected.slice(0, nowSelected.length);
          nowSelected[pulldownId] = e.target.value
          setNowSelected(nowSelected)
          console.log(nowSelected)
        }
        }>
        {ArrayList.map((component, ind) => (
          <option value={ind}>{component[idText]}</option>
        ))
        }
      </select>
    </>
  )
}

//追加ボタン押したとき
const handleTournament = (
  setTournamentData,
  yearArray,
  monthArray,
  dayArray,
  nowOpeningDate,
  nowTournamentName,
  TournamentData
) => {
  console.log(
    yearArray[nowOpeningDate[0]].year + "-" +
    monthArray[nowOpeningDate[1]].month + "-" +
    dayArray[nowOpeningDate[2]].day
  )

  //被りチェック
  if (TournamentData.some((v) => v.tournament_name === nowTournamentName)) {
    console.log("名前被ってます")
  }
  else {
    console.log(nowTournamentName + "を登録します")

    fetch(backendUrl + "/tournament/tournament_register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({ email:login_id , password:login_ps }),
      body: JSON.stringify({
        "tournament_name": nowTournamentName,
        "opening":
          yearArray[nowOpeningDate[0]].year + "-" +
          monthArray[nowOpeningDate[1]].month + "-" +
          dayArray[nowOpeningDate[2]].day
      }),
    })
      .then(() => readTournament(setTournamentData))
  }


}

//大会の情報を修正する
const editTournament = (urlTournamentId, newTournamentName, openingDate, TournamentData, setTournamentData) => {
  if (TournamentData.some((v) => v.tournament_name === newTournamentName)) {
    console.log("名前被ってます")
  }
  else {
    fetch(backendUrl + "/tournament/tournament_edit", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ tournament_id: urlTournamentId, tournament_name: newTournamentName, opening: openingDate }),
    })
      .then((response) => response.text())
      .then((data) => readTournament(setTournamentData))
  }
}

//削除
const changeDeleteMode = (isDeleteMode, setIsDeleteMode) => {
  setIsDeleteMode(!isDeleteMode)
}




export const Input_Tournament = () => {

  //プルダウンの選択肢の値
  const initialYear = 2020
  const endYear = 2040
  const initialMonth = 1
  const endMonth = 12
  const initialday = 1
  const endDay = 31

  //プルダウンのリスト作成
  let yearArray = []
  for (let i = initialYear; i <= endYear; i++) { yearArray = [...yearArray, { year: i }] }

  let monthArray = []
  for (let i = initialMonth; i <= endMonth; i++) { monthArray = [...monthArray, { month: i }] }

  let dayArray = []
  for (let i = initialday; i <= endDay; i++) { dayArray = [...dayArray, { day: i }] }

  //大会の日付を入力するときのステイト1:年, 2:月, 3:日
  const [nowOpeningDate, setNowOpeningDate] = useState([0, 0, 0])

  //大会の日付を編集するときのステイト1:年, 2:月, 3:日
  const [editOpeningDate, setEditOpeningDate] = useState([0, 0, 0])

  //大会名を入力する時のステイト
  const [nowTournamentName, setNowTournamentName] = useState("")

  //削除モードを管理するステイト
  const [isDeleteMode, setIsDeleteMode] = useState(false);


  //文字分割のための箱を用意
  let dateArray = { "year": "", "month": "", "day": "" }

  //適当な初期値
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

  return (
    <div>
      <TitleBar
        TitleText={"大会入力選択画面"}
        PageTransition={PageTransition}
        valueUrl={-1}
      />

      <OptionButton />


      <div class="headline">大会作成</div>
      <div class="whole1">
        大会名
        <input type="text" onChange={(e) => { setNowTournamentName(e.target.value) }} />
        <br />
        日付
        <label>
          {makePulldown(0, yearArray, "year", nowOpeningDate, setNowOpeningDate)}年
        </label>
        <label>
          {makePulldown(1, monthArray, "month", nowOpeningDate, setNowOpeningDate)}月
        </label>
        <label>
          {makePulldown(2, dayArray, "day", nowOpeningDate, setNowOpeningDate)}日
        </label>
        <br />
        <button
          class="btn_In_to"
          onClick={() => {
            handleTournament(
              setTournamentData, yearArray, monthArray, dayArray, nowOpeningDate, nowTournamentName, TournamentData
            )
          }}>追加</button>
        <button onClick={() => { setIsDeleteMode(!isDeleteMode) }}>{isDeleteMode && "大会編集中"}{!isDeleteMode && "大会編集モード"}</button>
      </div>

      <div class="headline">大会選択</div>
      <div class="whole">
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
                    {isDeleteMode &&
                      <>
                        {/* <button
                          className="btn_In_to1"
                          onClick={() => editTournament(EditTournamentPopup)}>
                          {Tournament.tournament_name}
                        </button> */}
                        <EditTournamentPopup
                          sendClassName="btn_In_to1"
                          Tournament={Tournament}
                          ind={ind}
                          editTournament={editTournament}
                          editOpeningDate={editOpeningDate}
                          setEditOpeningDate={setEditOpeningDate}
                          yearArray={yearArray}
                          monthArray={monthArray}
                          dayArray={dayArray}
                          makePulldown={makePulldown}
                          TournamentData={TournamentData}
                          setTournamentData={setTournamentData}
                        />
                      </>

                    }
                    {!isDeleteMode &&
                      <button
                        className="btn_In_to1"
                        onClick={() =>
                          PageTransition(
                            "inputschool?urlTournamentId=" +
                            Tournament.tournament_id +
                            "&urlTournamentName=" +
                            Tournament.tournament_name
                          )
                        }>
                        {Tournament.tournament_name}
                      </button>
                    }
                    <br />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Input_Tournament;