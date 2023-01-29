import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { OptionButton } from '../optionFunc/OptionButton'
import { TitleBar } from "../TitleBar/TitleBar";
import EditVenuePopup from "./com/EditVenuePopup/EditVenuePopup";


//バックエンドのurlを取得
const backendUrl = require("../../../DB/communication").backendUrl;


//送られた文字列がどれか空ならtrue
const isEnpty = (strArray) => {
  let flag = false
  strArray.map((str) => {
    if (!str) {
      flag = true
    }
  })
  return flag
}

//送る文字列が被っていればtrue
const isDuplicate = (Array, key, id) => {
  let flag = false
  Array.map((u) => {
    if (u[id] === key) {
      flag = true
    }
  })
  console.log(key)
  return flag
}

//追加ボタン押したとき
const addVenue = (venueArray, setVenueArray, nowVenueName,) => {

  //被りチェック
  if (venueArray.some((v) => v.venue_name === nowVenueName)) {
    console.log("名前被ってます")
  }
  else if (nowVenueName === "") {
    console.log("空白です")
  }
  else {
    console.log(nowVenueName + "を登録します")

    fetch(backendUrl + "/venue/venue_register", {
      method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ "venue_name": nowVenueName }),
    })
      .then(() => loadVenue(setVenueArray))
  }
}

const loadVenue = (setVenueArray) => {
  fetch(backendUrl + "/venue/venue_call", {
    method: "POST", mode: "cors", headers: { "Content-Type": "application/json", }
  })
    .then((response) => response.json())
    .then((data) => { setVenueArray(data) })
}

const editVenue = async (venueId, venueName) => {
  const Fetch = fetch(backendUrl + "/venue/venue_edit", {
    method: "POST", mode: "cors", headers: { "Content-Type": "application/json", }
    , body: JSON.stringify({ venue_id: venueId, venue_name: venueName }),
  })
  const FetchReturn = (await Fetch).text()
}

const deleteVenue = async (venueId) => {
  const Fetch = fetch(backendUrl + "/venue/venue_edit", {
    method: "POST", mode: "cors", headers: { "Content-Type": "application/json", }
    , body: JSON.stringify({ venue_id: venueId }),
  })
  const FetchReturn = (await Fetch).text()
}



export const RegisterVenue = () => {

  //会場名を入力する時のステイト
  const [nowVenueName, setNowVenueName] = useState("")

  //会場のリストを管理するステイト
  const [venueArray, setVenueArray] = useState([])

  //編集中の大会名を管理するステイト
  const [editingVenueName, setEditingVenueName] = useState("")

  //編集するか削除するかのチェックボックスを管理するステイト,trueなら編集,falseなら削除
  const [EorDcheckBox, setEorDcheckBox] = useState(true)

  //ページ遷移用
  const navigate = useNavigate()
  const PageTransition = (url) => {
    navigate(url)
  }


  useEffect(() => {
    loadVenue(setVenueArray)
  }, [])

  return (
    <div>
      <TitleBar
        TitleText={"大会入力選択画面"}
        PageTransition={PageTransition}
        valueUrl={-1}
      />

      <OptionButton />


      <div class="headline">会場追加</div>
      <div class="whole1">
        会場名
        <input type="text" onChange={(e) => { setNowVenueName(e.target.value) }} />
        <br />

        {/* 追加ボタン */}
        {isEnpty([nowVenueName]) &&
          <button
            class="btn_In_to"
            onClick={() => { }}>追加
          </button>
        }

        {!isEnpty([nowVenueName]) &&
          <button
            class="btn_In_to"
            onClick={() => {
              addVenue(venueArray, setVenueArray, nowVenueName)
            }}>追加
          </button>
        }

      </div>

      <div class="headline">会場編集</div>
      <div class="whole">
        <div className="tournamentList">
          <div className="tournaments">

            {venueArray.map((Venue, ind) => {
              if (Venue.length !== 0 && Venue.venue_name !== null) {
                return (
                  <>
                    <EditVenuePopup
                      sendClassName="btn_In_to1"
                      Venue={Venue}
                      ind={ind}
                      editVenue={editVenue}
                      venueArray={venueArray}
                      setVenueArray={setVenueArray}
                      editingVenueName={editingVenueName}
                      setEditingVenueName={setEditingVenueName}
                      EorDcheckBox={EorDcheckBox}
                      setEorDcheckBox={setEorDcheckBox}
                      deleteVenue={deleteVenue}
                      loadVenue={loadVenue}
                      isDuplicate={isDuplicate}
                    />

                  </>
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterVenue;