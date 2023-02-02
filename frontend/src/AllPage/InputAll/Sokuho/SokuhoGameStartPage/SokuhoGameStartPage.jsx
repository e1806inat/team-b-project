import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'

import "./SokuhoGameStartPage.css"

import { TitleBar } from '../../../OtherPage/TitleBar/TitleBar';
import { MenuBar } from "../../../OtherPage/optionFunc/MenuBar"

//バックエンドのurlを取得
const backendUrl = require("../../../../DB/communication").backendUrl;

//フロントの階層urlを取得
const routeUrl = require("../../../../DB/communication").routeUrl;


//試合中の試合の情報を登録する
const RegisterDuringGame = async (urlGameId, useEffectFlag, setUseEffectFlag) => {
    await fetch(backendUrl + "/game/during_game_register",
        {
            method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ game_id: urlGameId, tmp_table_name: String(urlGameId) }),
        }
    )
        .then((response) => response.text())
        .then((data) => { setUseEffectFlag(!useEffectFlag) })
}

//一時打席情報登録用のテーブル作成
const TmpTableCreate = async (urlGameId) => {

    await fetch(backendUrl + "/daseki/tmp_table_create",
        {
            method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ table_name: urlGameId }),
        }
    )
        .then((response) => response.text())
        .then((data) => { console.log(data) })
}

//テーブル存在確認
const TmpTableCheck = (urlGameId, setIsExistTmpTable) => {

    fetch(backendUrl + "/daseki/tmp_table_check",
        {
            method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ table_name: urlGameId }),
        }
    )
        .then((response) => response.text())
        .then((data) => {

            //テーブルが存在しないとき
            if (data === "not exist") {
                setIsExistTmpTable(false)
            }

            //テーブルが存在するとき
            else if (data === "exist") {
                setIsExistTmpTable(true)
                console.log(data)
            }
        })
}

//１つの試合の情報を受け取る
const CallAGame = (urlGameId, setIsMatchResult) => {
    fetch(backendUrl + "/game/a_game_call",
        {
            method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ game_id: urlGameId }),
        }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0])
            if (data[0].match_results === null) { }
            else if (data[0].match_results === "NULL") { }
            else { setIsMatchResult(true) }
        })
}

//試合中の試合の情報を参照する
const RefDuringGame = async (urlGameId, setIsDuringGame) => {
    fetch(backendUrl + "/game/ref_during_game",
        { method: "POST", mode: "cors", headers: { "Content-Type": "application/json", } }
    )
        .then((response) => response.json())
        .then((data) => {
            if (data.some((v) => String(v.game_id) === urlGameId)) {
                setIsDuringGame(true)
            }
        })
}


const SokuhoGameStartPage = () => {

    //クッキー関連
    const [cookies, setCookie, removeCookie] = useCookies();

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    //urlから値を読み出す
    const [searchParams] = useSearchParams();
    const urlTournamentId = searchParams.get("urlTournamentId")
    const urlTournamentName = searchParams.get("urlTournamentName")
    const urlSchoolId = searchParams.get("urlSchoolId")
    const urlSchoolName = searchParams.get("urlSchoolName")
    const urlSchoolId2 = searchParams.get("urlSchoolId2")
    const urlSchoolName2 = searchParams.get("urlSchoolName2")
    const urlGameId = searchParams.get("urlGameId")

    const [isExistTmpTable, setIsExistTmpTable] = useState(false)
    const [useEffectFlag, setUseEffectFlag] = useState(false)
    const [isDuringGame, setIsDuringGame] = useState(false)
    const [isMatchResult, setIsMatchResult] = useState(false)

    useEffect(() => {
        CallAGame(urlGameId, setIsMatchResult)
        TmpTableCheck(urlGameId, setIsExistTmpTable)
        RefDuringGame(urlGameId, setIsDuringGame)
    }, [useEffectFlag])

    //セッション関連
    useEffect(() => {
        const gameStart = async () => {
            const CheckSess = await fetch(backendUrl + "/auth/check_sess",
                {
                    method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
                    body: JSON.stringify({ sessionID: cookies.sessionID })
                })
            const sess = await CheckSess.text();
            console.log(sess)
            console.log(cookies.sessionID)
            if (sess === 'logout') {
                PageTransition(routeUrl + "/login");
            }
        }
        gameStart()
    }, [])

    if (isMatchResult) {
        console.log("Pastに遷移します")
        PageTransition(
            "InputPastGame?urlTournamentId=" +
            urlTournamentId +
            "&urlTournamentName=" +
            urlTournamentName +
            "&urlSchoolId=" +
            urlSchoolId +
            "&urlSchoolName=" +
            urlSchoolName +
            "&urlSchoolId2=" +
            urlSchoolId2 +
            "&urlSchoolName2=" +
            urlSchoolName2 +
            "&urlGameId=" +
            urlGameId
        )
    }
    else if (isExistTmpTable === false || isDuringGame === false) {
        return (
            <>
                <div className="startGame">

                    <TitleBar
                        TitleText={"速報開始画面"}
                        PageTransition={PageTransition}
                        valueUrl={-1}
                    />

                    <MenuBar
                        menuArray={[]}
                    />

                    <button className='startGameButton'
                        style={{ height: 100 + "px", width: 30 + "%", fontSize: 30 + "px" }}
                        onClick={async () => {
                            await TmpTableCreate(urlGameId)
                            await RegisterDuringGame(urlGameId, useEffectFlag, setUseEffectFlag)
                        }}
                    >試合を開始する
                    </button>
                </div>

            </>
        )
    }

    else {
        console.log("Playに遷移します")
        PageTransition(
            "InputPlayGame?urlTournamentId=" +
            urlTournamentId +
            "&urlTournamentName=" +
            urlTournamentName +
            "&urlSchoolId=" +
            urlSchoolId +
            "&urlSchoolName=" +
            urlSchoolName +
            "&urlSchoolId2=" +
            urlSchoolId2 +
            "&urlSchoolName2=" +
            urlSchoolName2 +
            "&urlGameId=" +
            urlGameId
        )
    }
}


//配置する部品の決まり文句
export default SokuhoGameStartPage;