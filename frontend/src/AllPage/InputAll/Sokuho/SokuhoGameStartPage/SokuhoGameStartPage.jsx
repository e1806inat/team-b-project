import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

//バックエンドのurlを取得
const backendUrl = require("../../../../DB/communication").backendUrl;


//試合中の試合の情報を登録する
const RegisterDuringGame = async (urlGameId, useEffectFlag, setUseEffectFlag) => {
    await fetch(backendUrl + "/game/during_game_register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId, tmp_table_name: String(urlGameId) }),
    })
        .then((response) => response.text())
        .then((data) => { setUseEffectFlag(!useEffectFlag) })
}

//一時打席情報登録用のテーブル作成
const TmpTableCreate = async (urlGameId) => {

    await fetch(backendUrl + "/daseki/tmp_table_create", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ table_name: urlGameId }),
    })
        .then((response) => response.text())
        .then((data) => { console.log(data) })
}

//テーブル存在確認
const TmpTableCheck = (urlGameId, setIsExistTmpTable) => {

    fetch(backendUrl + "/daseki/tmp_table_check", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ table_name: urlGameId }),
    })
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

//試合中の試合の情報を参照する
const RefDuringGame = async (urlGameId, setIsDuringGame) => {
    fetch(backendUrl + "/game/ref_during_game", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.some((v) => String(v.game_id) === urlGameId)) {
                setIsDuringGame(true)
            }
        })
}


const SokuhoGameStartPage = () => {

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

    useEffect(() => {
        TmpTableCheck(urlGameId, setIsExistTmpTable)
        RefDuringGame(urlGameId, setIsDuringGame)
    }, [useEffectFlag])


    if (isExistTmpTable === false || isDuringGame === false) {
        return (
            <>
                <button
                    style={{ height: 100 + "px", width: 30 + "%", fontSize: 30 + "px" }}
                    onClick={async () => {
                        await TmpTableCreate(urlGameId)
                        await RegisterDuringGame(urlGameId, useEffectFlag, setUseEffectFlag)
                    }}
                >試合を開始する
                </button>
            </>
        )
    }

    else {
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