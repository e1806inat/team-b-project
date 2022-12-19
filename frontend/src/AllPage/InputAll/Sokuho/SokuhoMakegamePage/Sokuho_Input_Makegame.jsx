import React, { useState, useEffect, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

import { TitleBar } from "../../../OtherPage/TitleBar/TitleBar";
import {OptionButton} from "../../../OtherPage/optionFunc/OptionButton"
//import { Schools } from "../../../../DB/Schools";
//const { Schools } = require("../../../../DB/Schools"); //分割代入
//const { Venues } = require("../../../../DB/Venues"); //分割代入


//データベースとのやりとり
const loadGame = (setGameInfoState, urlTournamentId) => {

    fetch("http://localhost:5000/game/game_call", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournament_id: urlTournamentId }),
    })
        .then((response) => response.json())
        .then((data) => handleSentGame(data, setGameInfoState))
}
const handleSentGame = (data, setGameInfoState) => {
    console.log(data)
    setGameInfoState(data)
}

//大会に所属する高校を読み出す
const loadSchool = (setSchools, urlTournamentId) => {

    return fetch("http://localhost:5000/school/school_call_p", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournament_id: urlTournamentId }),
    })
        .then((response) => response.json())
        .then((data) => setSchools(data))
    // .then((data) => handleSentGame(data, setGameInfoState))

}

//会場を読み出す
const loadVenue = (setVenues) => {

    return fetch("http://localhost:5000/venue/venue_call", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournament_id: 1 }),
    })
        .then((response) => response.json())
        .then((data) => { setVenues(data); console.log(data) })
}

const handleAddGame = (urlTournamentId, nowSelected, iningList, Schools, Venues, nowSelectedYmd, YearList, MonthList, DayList, setGameInfoState) => {

    let gameData = {
        tournament_id: urlTournamentId,
        match_num: iningList[nowSelected[0]].ining,
        school_id_1: Schools[nowSelected[1]].school_id,
        school_id_2: Schools[nowSelected[2]].school_id,
        venue_id: Venues[nowSelected[3]].venue_id,
        first_rear_1: "先行",
        first_rear_2: "後攻",
        game_ymd: YearList[nowSelectedYmd[0]].year + "-" + MonthList[nowSelectedYmd[1]].month + "-" + DayList[nowSelectedYmd[2]].day,
        match_resuts: null
    }
    console.log(gameData)

    fetch("http://localhost:5000/game/game_register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
    })
        .then((response) => response.text())
        .then((data) => {
            if (data === "OK") {
                loadGame(setGameInfoState)
            }
        })
}




//自作プルダウン
const makePulldown = (pulldownId, ArrayList, idText, nowSelected, setNowSelected) => {


    return (
        <>
            <select id="tekitouni"
                onChange={(e) => {
                    nowSelected[pulldownId] = e.target.value
                    setNowSelected(nowSelected)
                    console.log(nowSelected)
                }}>
                {ArrayList.map((component, ind) => (
                    <option value={ind}>{component[idText]}</option>
                ))
                }
            </select>
        </>

    )
}

//リスト作成関数
const makeYear = () => {

    let yearArray = []
    for (let i = 2010; i < 2050 + 1; i++) {
        yearArray = [...yearArray, { year: i }]
    }
    return yearArray
}
const makeMonth = () => {

    let monthArray = []
    for (let i = 1; i < 12 + 1; i++) {
        monthArray = [...monthArray, { month: i }]
    }
    return monthArray
}
const makeDay = () => {

    let dayArray = []
    for (let i = 1; i < 31 + 1; i++) {
        dayArray = [...dayArray, { day: i }]
    }
    return dayArray
}




export const Sokuho_Input_Makegame = (useSchools, setUseSchools) => {
    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    const [gameInfoState, setGameInfoState] = useState([])

    //DBからデータを読み出したことを監視する
    const [Schools, setSchools] = useState([])
    const [Venues, setVenues] = useState([])

    //リスト作り
    const YearList = makeYear()
    const MonthList = makeMonth()
    const DayList = makeDay()

    //回戦の値を適当に定義
    const iningList = [{ ining: 1 }, { ining: 2 }, { ining: 3 }, { ining: 4 }, { ining: 5 }]

    //urlから値を読み出す
    const [searchParams] = useSearchParams();
    const urlTournamentId = searchParams.get("urlTournamentId")
    const urlTournamentName = searchParams.get("urlTournamentName")

    //今選択しているものの内容を監視
    const [nowSelected, setNowSelected] = useState([0, 0, 0, 0])
    const [nowSelectedYmd, setNowSelectedYmd] = useState([0, 0, 0])




    useEffect(() => {
        loadSchool(setSchools, urlTournamentId)
        loadVenue(setVenues)
    }, [])

    useEffect(() => {

        loadGame(setGameInfoState, urlTournamentId);
    }, [Schools, Venues])

    return (
        <>
            <TitleBar
                TitleText={"試合作成画面"}
                PageTransition={PageTransition}
                valueUrl={-1}
            />
            <OptionButton />
            <h3>編集中：{urlTournamentName}</h3>
            <div className="MakeGame">
                年{makePulldown(0, YearList, "year", nowSelectedYmd, setNowSelectedYmd)}
                月{makePulldown(1, MonthList, "month", nowSelectedYmd, setNowSelectedYmd)}
                日{makePulldown(2, DayList, "day", nowSelectedYmd, setNowSelectedYmd)}<br />

                回戦{makePulldown(0, iningList, "ining", nowSelected, setNowSelected)}<br />
                先行チーム{makePulldown(1, Schools, "school_name", nowSelected, setNowSelected)}<br />
                後攻チーム{makePulldown(2, Schools, "school_name", nowSelected, setNowSelected)}<br />
                会場{makePulldown(3, Venues, "venue_name", nowSelected, setNowSelected)}<br />
                <button onClick={() => handleAddGame(
                    urlTournamentId,
                    nowSelected,
                    iningList,
                    Schools,
                    Venues,
                    nowSelectedYmd,
                    YearList,
                    MonthList,
                    DayList,
                    setGameInfoState
                )}>追加</button>
            </div>

            <hr></hr>

            <div className="dispGames">
                {console.log(gameInfoState)}
                {gameInfoState.map(gameInfo => (
                    <div className="game">
                        <button
                            onClick={() => PageTransition(
                                "starting_member?urlTournamentId=" +
                                urlTournamentId +
                                "&urlTournamentName=" +
                                urlTournamentName +
                                "&urlSchoolId=" +
                                gameInfo.school_id_1 +
                                "&urlSchoolName=" +
                                gameInfo.school_name +
                                "&urlSchoolId2=" +
                                gameInfo.school_id_2 +
                                "&urlSchoolName2=" +
                                gameInfo.school_name_2 +
                                "&urlGameId=" +
                                gameInfo.game_id
                            )}>
                            {gameInfo.match_num}回戦<br />
                            {gameInfo.school_name}<br />
                            {gameInfo.school_name_2}<br />
                            {Venues.length !== 0 && Venues[gameInfo.venue_id].venue_name}
                        </button><br /><br />
                    </div>
                ))}

            </div>

        </>
    )
}

export default Sokuho_Input_Makegame