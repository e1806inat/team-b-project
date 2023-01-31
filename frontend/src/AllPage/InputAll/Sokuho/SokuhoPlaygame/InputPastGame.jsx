import { scoreBoard } from './comSokuho/scoreBoard';
import { outCount } from './comSokuho/outCount'
import { runnerCount } from './comSokuho/runnerCount';
import { freeWrite } from './comSokuho/freeWrite'
import { BaseballButton } from './comSokuho/baseballButton'
import "./comSokuho/CSS/scoreBoard.css"
import { useEffect, useState } from 'react';
import Popupfield from "./comSokuho/onisi_popup/onisi_popup";
import GameEndPopup from "./comSokuho/GameEndPopup/GameEndPopup"
import EditPoint from "./comSokuho/scoreCorrection/EditPoint"
import OptionButton from '../../../OtherPage/optionFunc/OptionButton';

//css
import "./InputPlayGame.css"

import { TitleBar } from '../../../OtherPage/TitleBar/TitleBar';

//プルダウン
import { PullDown } from './comSokuho/PullDown/PullDown'
import { PullDownMember } from './comSokuho/PullDown/PullDownMember'
import { useSearchParams, useNavigate } from 'react-router-dom';

//canvasの描画
import { Ground } from './comSokuho/comCanvas/Ground';
import { battedBall } from './comSokuho/comCanvas/battedBall';

//バックエンドのurlを取得
const backendUrl = require("../../../../DB/communication").backendUrl;




//自作プルダウン　改造あり
const makePulldown = (pulldownId, ArrayList, idText, nowSelected, setNowSelected, urlSchoolName, urlSchoolName2,
    dasekiAll, setNowIningState, setNowOutCountState, setRunnerCountState, setNowPlayingMember,
    setFreeWriteState, setcanvasX1, setcanvasY1, setAddScoreState, setFlag,
    battingOrder, battingOrder2, registeredMember1, registeredMember2, setBattingOrder, setBattingOrder2
) => {

    console.log(dasekiAll)


    //pulldownIdは0でいいです。
    //ArrayListは表示したい要素を並べた配列です、普通の配列ではなく連想配列です。
    //idテキストは連想配列の属性を書きます。
    //nowSelectedは今プルダウンで何が選択されているかが入ります。初期値は[0]で、これは0番目の値が選択されている状態です。
    //setNowSelectedはnowSelecedの値をuseStateの機能で上書きする関数です。setNowSelected(更新値)とすれば、nowSelectedに更新値が入ります。

    return (
        <>
            <select className='editButton'
                id="tekitouni"
                onChange={(e) => {
                    //ステイトが変化すると再描画させるための文、これがないと再描画されない
                    //なお、消すと再描画はされないが内部は変化する
                    nowSelected = nowSelected.slice(0, nowSelected.length);
                    nowSelected[pulldownId] = e.target.value
                    setNowSelected(nowSelected)

                    editBattersBox(dasekiAll[nowSelected], dasekiAll, nowSelected,
                        setNowIningState, setNowOutCountState, setRunnerCountState, setNowPlayingMember,
                        setFreeWriteState, setcanvasX1, setcanvasY1, setAddScoreState, setFlag,
                        battingOrder, battingOrder2, registeredMember1, registeredMember2, setBattingOrder, setBattingOrder2
                    )
                }
                }>
                {ArrayList.map((component, ind) => (
                    <option value={ind}>
                        {component[idText]}打席目：{component.inning % 10 === 1 && urlSchoolName}{component.inning % 10 === 2 && urlSchoolName2}
                    </option>
                ))
                }
            </select>
        </>
    )
}

//打席編集
const editBattersBox = (battersBox, battersBoxAll, nowSelected,
    setNowIningState, setNowOutCountState, setRunnerCountState, setNowPlayingMember,
    setFreeWriteState, setcanvasX1, setcanvasY1, setAddScoreState, setFlag,
    battingOrder, battingOrder2, registeredMember1, registeredMember2, setBattingOrder, setBattingOrder2) => {

    console.log(battersBox)
    let touchedCoordinate = battersBoxAll[nowSelected].touched_coordinate.split("_")

    let teamABatter = 0;
    let teamBpitcher = 0;
    let teamBBatter = 0;
    let teamApitcher = 0;

    //pinchを反映させる
    battersBoxAll.map((v, indBB) => {
        let playerId = []
        if (v.pinch !== "" && v.pinch !== "0" && v.pinch !== null && v.pinch !== undefined) {

            //pinchに値が入っており、かつ値が正常であると思われる場合
            if (v.pinch.length > 3) {
                //スライス
                playerId = v.pinch.split("→")

                //表回
                if (v.inning % 10 - 1 === 0) {
                    //打順配列からplayerId[0]を探す
                    battingOrder.map((u, indBB) => {
                        if (u.player_id.toString() === playerId[0]) {
                            //登録されているメンバーからplayerId[1]を探す
                            registeredMember1.map((regiMember1) => {
                                //あればその選手を打順配列に入れ替える
                                if (regiMember1.player_id.toString() === playerId[1]) {
                                    battingOrder[indBB] = regiMember1
                                    setBattingOrder(battingOrder)
                                }
                            })
                        }
                    })
                }

                //裏回
                else if (v.inning % 10 - 1 === 1) {
                    //打順配列からplayerId[0]を探す
                    battingOrder2.map((u, indBB) => {
                        if (u.player_id === playerId[0]) {
                            //登録されているメンバーからplayerId[1]を探す
                            registeredMember2.map((regiMember2) => {
                                //あればその選手を打順配列に入れ替える
                                if (regiMember2.player_id === playerId[1]) {
                                    battingOrder2[indBB] = regiMember2
                                }
                            })
                        }
                    })
                }
            }

            //pinchに値が入っており、かつ内容がおかしい場合
            else {
                battersBoxAll[indBB].pinch = null
                battersBoxAll[indBB].player_id = battersBoxAll[6].player_id
            }
        }
    })

    console.log(battersBoxAll)

    const value = battersBoxAll[nowSelected].inning
    for (let i = nowSelected; i >= 0; i--) {
        if (value !== battersBoxAll[i].inning) {
            teamBBatter = battersBoxAll[i].player_id
            teamApitcher = battersBoxAll[i].pitcher_id
            break
        }
    }

    //画面に反映
    setNowIningState([Math.floor(battersBox.inning / 10 - 1), battersBox.inning % 10 - 1])
    setNowOutCountState(battersBox.outcount)
    setRunnerCountState([battersBox.base / 100 >= 1, battersBox.base / 10 >= 1 && battersBox.base / 100 < 1, battersBox.base % 10 === 1])
    setFreeWriteState(battersBox.text_inf)
    setFlag(battersBox.ball_kind)
    setcanvasX1(parseFloat(touchedCoordinate[0]))
    setcanvasY1(parseFloat(touchedCoordinate[1]))
    setAddScoreState(battersBox.score)

    if (battersBox.inning % 10 === 1) {
        let sendMember1 = [{
            batter: battingOrder.findIndex((u) => u.player_id === battersBoxAll[nowSelected].player_id),
            pitcher: battingOrder2.findIndex((u) => u.player_id === battersBoxAll[nowSelected].pitcher_id)
        },
        {
            batter: teamBBatter,
            pitcher: teamApitcher
        }]

        //値が入ってないときの処理
        if (sendMember1[0].batter === -1) { sendMember1[0].batter = 0 }
        if (sendMember1[0].pitcher === -1) { sendMember1[0].pitcher = 0 }
        setNowPlayingMember(sendMember1)
    }
    else if (battersBox.inning % 10 === 2) {
        let sendMember2 = [
            {
                batter: teamABatter,
                pitcher: teamBpitcher
            },
            {
                batter: battingOrder2.findIndex((u) => u.player_id === battersBoxAll[nowSelected].player_id),
                pitcher: battingOrder.findIndex((u) => u.player_id === battersBoxAll[nowSelected].pitcher_id)
            }
        ]

        //値が入ってないときの処理
        if (sendMember2[1].batter === -1) { sendMember2[1].batter = 0 }
        if (sendMember2[1].pitcher === -1) { sendMember2[1].pitcher = 0 }

        setNowPlayingMember(sendMember2)
    }


}


//試合中の試合の情報を登録する
// const RegisterDuringGame = async (urlGameId) => {
//     await fetch(backendUrl + "/game/during_game_register", {
//         method: "POST",
//         mode: "cors",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ game_id: urlGameId, tmp_table_name: String(urlGameId) }),
//     })
//         .then((response) => response.text())
//         .then((data) => { console.log(data) })
// }


//試合中の試合の情報を削除する
const DeleteDuringGame = async (urlGameId) => {
    await fetch(backendUrl + "/game/during_game_delete", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId }),
    })
        .then((response) => response.text())
        .then((data) => { console.log(data) })
}


//一時打席情報登録用のテーブル作成
// const TmpTableCreate = async (urlGameId) => {

//     await fetch(backendUrl + "/daseki/tmp_table_create", {
//         method: "POST",
//         mode: "cors",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ table_name: urlGameId }),
//     })
//         .then((response) => response.text())
//         .then((data) => { console.log(data) })
// }

//テーブル存在確認
// const TmpTableCheck = (urlGameId, setIsExistTmpTable, TransmissionDasekiCall, urlTournamentId, urlSchoolId, urlSchoolId2,
//     setNowIningState, setScoreState, setNowOutCountState,
//     setNowPlayingMember, setRunnerCountState, setDasekiAll, setBattingOrder, setBattingOrder2

// ) => {

//     fetch(backendUrl + "/daseki/tmp_table_check", {
//         method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
//         body: JSON.stringify({ table_name: urlGameId }),
//     })
//         .then((response) => response.text())
//         .then((data) => {

//             //テーブルが存在しないとき
//             if (data === "not exist") {
//                 setIsExistTmpTable(false)
//             }

//             //テーブルが存在するとき
//             else if (data === "exist") {
//                 TransmissionDasekiCall(urlGameId, urlSchoolId, urlSchoolId2, urlTournamentId,
//                     setNowIningState, setScoreState, setNowOutCountState,
//                     setNowPlayingMember, setRunnerCountState, setDasekiAll, setBattingOrder, setBattingOrder2
//                 )
//             }
//         })
// }

////試合情報受け取り（速報用）
const TransmissionDasekiCall = (urlGameId, urlSchoolId, urlSchoolId2, urlTournamentId,
    setNowIningState, setScoreState, setNowOutCountState,
    setNowPlayingMember, setRunnerCountState, setDasekiAll, setBattingOrder, setBattingOrder2) => {

    //まず打席情報を受け取る
    fetch(backendUrl + "/daseki/daseki_transmission",
        {
            method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ game_id: urlGameId, table_name: urlGameId }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            //反転させる
            // data.reverse()
            setDasekiAll(data)

            //空っぽなら無視
            if (data.length !== 0) {
                let latestDasaki = data[data.length - 1]

                if (latestDasaki.outcount === 3) {
                    //アウトカウント取得
                    setNowOutCountState(0)

                    //イニング取得
                    if (latestDasaki.inning % 10 === 1) {
                        setNowIningState([Math.floor(latestDasaki.inning / 10) - 1, 1])
                    }
                    else {
                        setNowIningState([Math.floor(latestDasaki.inning / 10), 0])
                    }

                    //ランナー取得
                    setRunnerCountState([false, false, false])

                }

                else {
                    //アウトカウント取得
                    setNowOutCountState(latestDasaki.outcount)

                    //イニング取得
                    setNowIningState([Math.floor(latestDasaki.inning / 10) - 1, latestDasaki.inning % 10 - 1])

                    //ランナー取得
                    setRunnerCountState([latestDasaki.base[0] === "1", latestDasaki.base[1] === "1", latestDasaki.base[2] === "1"])
                }


                //スコア取得
                //スコアの初期化
                const InitialScore = [
                    [null, null, null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null, null, null]
                ]

                let sendScore = InitialScore
                data.map((u) => {
                    //null対策
                    if (sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] === null) sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = 0
                    //受け取ったスコアを配列に格納
                    sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] + u.score
                })
                setScoreState(sendScore)


                //今現在のプレイヤー取得
                //まずは先行チームをフェッチ
                fetch(backendUrl + "/member/starting_member_call", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ game_id: urlGameId, school_id: urlSchoolId }),
                })
                    .then((response) => response.json())
                    .then((TeamAdata) => {


                        //後攻チームをフェッチ
                        //打順を持ってくる
                        fetch(backendUrl + "/member/starting_member_call", {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ game_id: urlGameId, school_id: urlSchoolId2 }),
                        })
                            .then((response) => response.json())
                            .then(async (TeamBdata) => {

                                //ここから選手登録の情報をつかって、代打の処理を行う
                                //選手登録の情報を取得
                                let loadRegistered = await { loadRegistered1: "", loadRegistered2: "" }
                                const loadRegistered1 = await fetch(backendUrl + "/member/tournament_member_call", {
                                    method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
                                    body: JSON.stringify({ tournament_id: urlTournamentId, school_id: urlSchoolId }),
                                })
                                loadRegistered.loadRegistered1 = await loadRegistered1.json()
                                const loadRegistered2 = await fetch(backendUrl + "/member/tournament_member_call", {
                                    method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
                                    body: JSON.stringify({ tournament_id: urlTournamentId, school_id: urlSchoolId2 }),
                                })
                                loadRegistered.loadRegistered2 = await loadRegistered2.json()

                                let text = null
                                let index = 0
                                data.map((v) => {
                                    if (v.pinch === null || v.pinch === "0") { }
                                    else {
                                        text = v.pinch.split("→")

                                        // 表のとき
                                        if (v.inning % 10 - 1 === 0) {
                                            index = TeamAdata.findIndex((u) => u.player_id === parseInt(text[0]))
                                            TeamAdata[index] = loadRegistered.loadRegistered1.find((u) => u.player_id === parseInt(text[1]))
                                        }
                                        // 裏のとき
                                        else {
                                            index = TeamBdata.findIndex((u) => u.player_id === parseInt(text[0]))
                                            TeamBdata[index] = loadRegistered.loadRegistered2.find((u) => u.player_id === parseInt(text[1]))
                                        }
                                    }
                                })




                                TeamAdata.sort((a, b) => a.batting_order - b.batting_order)
                                setBattingOrder(TeamAdata)

                                TeamBdata.sort((a, b) => a.batting_order - b.batting_order)
                                setBattingOrder2(TeamBdata)

                                let teamABatter = 0
                                let teamApitcher = 0
                                let teamBBatter = 0
                                let teamBpitcher = 0

                                //さっきの打席が先攻チームだった場合
                                if (latestDasaki.inning % 10 - 1 === 0) {
                                    teamABatter = TeamAdata.findIndex((u) => u.player_id === latestDasaki.player_id)
                                    teamBpitcher = TeamBdata.findIndex((u) => u.player_id === latestDasaki.pitcher_id)
                                    for (let i = data.length - 1; i >= 0; i--) {
                                        if (latestDasaki.inning !== data[i].inning) {
                                            teamBBatter = TeamBdata.findIndex((u) => u.player_id === data[i].player_id)
                                            teamApitcher = TeamAdata.findIndex((u) => u.player_id === data[i].pitcher_id)
                                            break
                                        }
                                    }
                                    if (latestDasaki.outcount !== 3) teamABatter++
                                    //過去に後攻の打席がある場合
                                    else if (data.some((v) => v.inning % 10 - 1 === 1)) teamBBatter++
                                }

                                //後攻
                                else if (latestDasaki.inning % 10 - 1 === 1) {
                                    for (let i = data.length - 1; i >= 0; i--) {
                                        if (latestDasaki.inning !== data[i].inning) {
                                            console.log(data[i])
                                            teamABatter = TeamAdata.findIndex((u) => u.player_id === data[i].player_id)
                                            teamBpitcher = TeamBdata.findIndex((u) => u.player_id === data[i].pitcher_id)
                                            break
                                        }
                                    }
                                    teamBBatter = TeamBdata.findIndex((u) => u.player_id === latestDasaki.player_id)
                                    teamApitcher = TeamAdata.findIndex((u) => u.player_id === latestDasaki.pitcher_id)
                                    if (data[data.length - 1].outcount !== 3) teamBBatter++
                                    else teamABatter++
                                }

                                //打順に存在しないか最初の打者であるとき、もしくは打順最後の打者であるとき
                                if (teamABatter === 9 || teamABatter === -1) teamABatter = 0
                                if (teamBpitcher === -1) teamBpitcher = 0
                                if (teamBBatter === 9 || teamBBatter === -1) teamBBatter = 0
                                if (teamApitcher === -1) teamApitcher = 0

                                //最後に今現在プレイ中の選手を格納
                                setNowPlayingMember(
                                    [{
                                        batter: teamABatter,
                                        pitcher: teamBpitcher
                                    },
                                    {
                                        batter: teamBBatter,
                                        pitcher: teamApitcher
                                    }]
                                )
                            })
                    })
            }

            //打席情報に何も入ってないとき
            if (data.length === 0) {
                //最初のプレイヤー取得
                //まずは先行チーム
                fetch(backendUrl + "/member/starting_member_call", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ game_id: urlGameId, school_id: urlSchoolId }),
                })
                    .then((response) => response.json())
                    .then((TeamAdata) => {
                        TeamAdata.sort((a, b) => a.batting_order - b.batting_order)
                        setBattingOrder(TeamAdata)

                        //後攻チーム
                        //打順を持ってくる
                        fetch(backendUrl + "/member/starting_member_call", {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ game_id: urlGameId, school_id: urlSchoolId2 }),
                        })
                            .then((response) => response.json())
                            .then((TeamBdata) => {
                                TeamBdata.sort((a, b) => a.batting_order - b.batting_order)
                                setBattingOrder2(TeamBdata)

                                let teamABatter = 0
                                let teamBpitcher = TeamBdata.findIndex((v) => v.position === "ピッチャー")
                                let teamBBatter = 0
                                let teamApitcher = TeamAdata.findIndex((v) => v.position === "ピッチャー")

                                //最後に今現在プレイ中の選手を格納
                                setNowPlayingMember(
                                    [{
                                        batter: teamABatter,
                                        pitcher: teamBpitcher
                                    },
                                    {
                                        batter: teamBBatter,
                                        pitcher: teamApitcher
                                    }]
                                )
                            })
                    })
            }
        })
}


//DBを介さない試合情報受け取り（速報用）
const loardNowDaseki = (setNowOutCountState, setNowIningState, setRunnerCountState, setScoreState,
    setNowPlayingMember, setFreeWriteState,
    dasekiAll, battingOrder, battingOrder2) => {

    //空っぽなら無視
    if (dasekiAll.length !== 0) {
        let latestDasaki = dasekiAll[dasekiAll.length - 1]


        //自由記述は空
        setFreeWriteState("")

        if (latestDasaki.outcount === 3) {
            //アウトカウント取得
            setNowOutCountState(0)

            //イニング取得
            if (latestDasaki.inning % 10 === 1) {
                setNowIningState([Math.floor(latestDasaki.inning / 10) - 1, 1])
            }
            else {
                setNowIningState([Math.floor(latestDasaki.inning / 10), 0])
            }

            //ランナー取得
            setRunnerCountState([false, false, false])

        }

        else {
            //アウトカウント取得
            setNowOutCountState(latestDasaki.outcount)

            //イニング取得
            setNowIningState([Math.floor(latestDasaki.inning / 10) - 1, latestDasaki.inning % 10 - 1])

            //ランナー取得
            setRunnerCountState([latestDasaki.base[0] === "1", latestDasaki.base[1] === "1", latestDasaki.base[2] === "1"])
        }


        //スコア取得
        //スコアの初期化
        const InitialScore = [
            [null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null]
        ]

        let sendScore = InitialScore
        dasekiAll.map((u) => {
            //null対策
            if (sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] === null) sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = 0
            //受け取ったスコアを配列に格納
            sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] + u.score
        })
        setScoreState(sendScore)



        //今現在のプレイヤー取得
        //まずは先行チーム
        //後攻チーム
        let teamABatter = 0
        let teamApitcher = 0
        let teamBBatter = 0
        let teamBpitcher = 0

        //先攻
        if (latestDasaki.inning % 10 - 1 === 0) {
            teamABatter = battingOrder.findIndex((u) => u.player_id === latestDasaki.player_id)
            teamBpitcher = battingOrder2.findIndex((u) => u.player_id === latestDasaki.pitcher_id)
            for (let i = dasekiAll.length - 1; i >= 0; i--) {
                if (latestDasaki.inning !== dasekiAll[i].inning) {
                    teamBBatter = battingOrder2.findIndex((u) => u.player_id === dasekiAll[i].player_id)
                    teamApitcher = battingOrder.findIndex((u) => u.player_id === dasekiAll[i].pitcher_id)
                    break
                }
            }
            if (dasekiAll[dasekiAll.length - 1].outcount !== 3) teamABatter++
            else teamBBatter++
        }
        //後攻
        else if (latestDasaki.inning % 10 - 1 === 1) {
            for (let i = dasekiAll.length - 1; i >= 0; i--) {
                if (latestDasaki.inning !== dasekiAll[i].inning) {
                    console.log(dasekiAll[i])
                    teamABatter = battingOrder.findIndex((u) => u.player_id === dasekiAll[i].player_id)
                    teamBpitcher = battingOrder2.findIndex((u) => u.player_id === dasekiAll[i].pitcher_id)
                    break
                }
            }
            teamBBatter = battingOrder2.findIndex((u) => u.player_id === latestDasaki.player_id)
            teamApitcher = battingOrder.findIndex((u) => u.player_id === latestDasaki.pitcher_id)
            if (dasekiAll[dasekiAll.length - 1].outcount !== 3) teamBBatter++
            else teamABatter++
        }

        //打順に存在しないか最初の打者であるとき、もしくは打順最後の打者であるとき
        if (teamABatter === 9 || teamABatter === -1) teamABatter = 0
        if (teamBpitcher === -1) teamBpitcher = 0
        if (teamBBatter === 9 || teamBBatter === -1) teamBBatter = 0
        if (teamApitcher === -1) teamApitcher = 0

        //最後に今現在プレイ中の選手を格納
        setNowPlayingMember(
            [{
                batter: teamABatter,
                pitcher: teamBpitcher
            },
            {
                batter: teamBBatter,
                pitcher: teamApitcher
            }]
        )
    }
}

//一時打席情報を本打席テーブルに送る
const TableRegister = (urlGameId) => {

    console.log(urlGameId + "の試合情報を登録しました")

    fetch(backendUrl + "/daseki/data_register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId, table_name: urlGameId }),
    })
        .then((response) => response.text())
        .then((data) => { console.log("TableRegister=" + data) })
}

//一時打席情報を削除
const TmpTableDelete = (urlGameId) => {

    console.log(urlGameId + "の試合情報を削除しました")

    fetch(backendUrl + "/daseki/tmp_table_delete", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId, table_name: urlGameId }),
    })
        .then((response) => response.text())
        .then((data) => { console.log("TmpTableDelete=" + data) })
}

//打率計算
const CalculateBatAvg = (urlGameId) => {

    console.log("打率計算関数を呼び出しました")

    fetch(backendUrl + "/member/cal_BA", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId, table_name: urlGameId }),
    })
        .then((response) => response.text())
        .then((data) => { console.log("CalculateBatAvg=" + data) })
}

//一時打席情報登録用のテーブルに打席情報登録（UPSERTを使うかも）
const DasekiRegister = (sendInfo, trigger, setTrigger) => {

    fetch(backendUrl + "/daseki/daseki_register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sendInfo),
    })
        .then((response) => response.text())
        .then((data) => {
            if (data === "OK") {
                setTrigger(!trigger)
            }
        })
}


//選手登録された選手読み込む
const loadRegisteredMember = (setRegisteredMember, urlTournamentId, urlSchoolId) => {

    fetch(backendUrl + "/member/tournament_member_call", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ tournament_id: urlTournamentId, school_id: urlSchoolId }),
    })
        .then((response) => response.json())
        .then((data) => { setRegisteredMember(data) })
}


//修正内容をバックエンドに送る
const sendEdit = (
    urlGameId,
    dasekiAll,
    nowSelected,
    nowIningState,
    addScoreState,
    scoreState,
    nowOutCountState,
    nowPlayingMember,
    battingOrder,
    battingOrder2,
    runnerCountState,
    freeWriteState,
    canvasX1,
    canvasY1,
    flag,
    batterResult,
    isPinch,
    trigger, 
    setTrigger
) => {
    console.log(dasekiAll[nowSelected])
    //DBに送るための準備

    let totalScore = 0
    scoreState[nowIningState[1]].map((score) => {
        totalScore = totalScore + score
    })

    let runnerCount = ""
    runnerCountState.map((runner) => {
        if (runner === true) runnerCount = "1" + runnerCount
        else if (runner === false) runnerCount = "0" + runnerCount
    })

    let isHit = 0; let isFourball = 0; let isDeadball = 0;
    if (batterResult === 0) { }
    else if (batterResult === 1) isHit = 1
    else if (batterResult === 2) isFourball = 1
    else if (batterResult === 3) isDeadball = 1

    //選手だけここで入れる
    let order = []
    if (nowIningState[1] === 0) {
        order = {
            player_id: battingOrder[nowPlayingMember[nowIningState[1]].batter].player_id,
            pitcher_id: battingOrder2[nowPlayingMember[nowIningState[1]].pitcher].player_id
        }
    }
    else if (nowIningState[1] === 1) {
        order = {
            player_id: battingOrder2[nowPlayingMember[nowIningState[1]].batter].player_id,
            pitcher_id: battingOrder[nowPlayingMember[nowIningState[1]].pitcher].player_id
        }
    }

    //DBにデータを送る
    let sendInfo = {
        table_name: urlGameId,
        at_bat_id: dasekiAll[nowSelected].at_bat_id,
        inning: (nowIningState[1] + 1) * 10 + (nowIningState[0] + 1),
        game_id: urlGameId,
        school_id: dasekiAll[nowSelected].school_id,
        player_id: order.player_id,
        pitcher_id: order.pitcher_id,
        score: addScoreState,
        total_score: totalScore,
        outcount: nowOutCountState,
        base: runnerCount,
        text_inf: freeWriteState,
        pass: 0,
        touched_coordinate: canvasX1 + "_" + canvasY1,
        ball_kind: flag,
        hit: isHit,
        foreball: isFourball,
        deadball: isDeadball,
        pinch: isPinch
    }

    console.log(sendInfo)

    fetch(backendUrl + "/daseki/registered_daseki_update", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(sendInfo),
    })
        .then((response) => response.text())
        .then((data) => {
            console.log(data)
            setTrigger(!trigger)
        })


}






const canvasSize = 1000;
const homebase = 400;

const InputPastGame = () => {

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

    //試合の一時テーブルが存在するかどうかを管理するステイト
    const [isExistTmpTable, setIsExistTmpTable] = useState(false)

    //Score記録 左が裏表、右が回数 イニングとは逆
    const { Score } = require("../../../../DB/Score")
    const [scoreState, setScoreState] = useState(Score)

    //Scoreの加算値の監視
    const [addScoreState, setAddScoreState] = useState(0)

    //今のイニング 左が回、右が表裏
    const [nowIningState, setNowIningState] = useState([0, 0])

    //自由記述内容を監視
    const [freeWriteState, setFreeWriteState] = useState("")//いらんかも

    //自由記述編集モードのフラグ
    const [freeWriteModeFlag, setFreeWriteModeFlag] = useState(false)

    //多分打球の種類だと思われる
    const [flag, setFlag] = useState(2);

    //打者の結果を記録する(0:何もなし, 1:ヒット,2:四球, 3:死球)
    const [batterResult, setBatterResult] = useState(0)


    //緑プルダウン用
    const [nowPosition, setNowPosition] = useState(15)

    //アウトカウント
    const [nowOutCountState, setNowOutCountState] = useState(0)

    //ランナーカウント
    const [runnerCountState, setRunnerCountState] = useState([false, false, false])

    //選手登録情報を読み込む
    const [registeredMember1, setRegisteredMember1] = useState([])
    const [registeredMember2, setRegisteredMember2] = useState([])

    //打席一覧情報のステイト
    const [dasekiAll, setDasekiAll] = useState([{
        at_bat_id: 1, ball_kind: "2", base: "000",
        deadball: 0, foreball: 0, game_id: 1,
        hit: 0, inning: 11, outcount: 3,
        pass: 0, pinch: null, pitcher_id: 21, player_id: 7,
        school_id: 1, score: 0, text_inf: "データなし",
        total_score: 0, touched_coordinate: "400_450"
    }])

    //打席一覧情報のプルダウンの選択状況を管理するステイト
    const [nowSelected, setNowSelected] = useState([0])

    //打順と打者のリスト
    const [battingOrder, setBattingOrder] = useState([[{ player_name_kanji: '丹羽 長秀' }, { player_name_kanji: '柴田 勝家' }], 0])
    const [battingOrder2, setBattingOrder2] = useState([{ player_name_kanji: '丹羽 長秀' }, { player_name_kanji: '柴田 勝家' }])

    //今の打順と今のピッチャーが誰なのかを2チーム文記録する
    const [nowPlayingMember, setNowPlayingMember] = useState([{ batter: 0, pitcher: 0 }, { batter: 0, pitcher: 0 }])

    //代打フラグ 4→15,12→6
    const [isPinch, setIsPinch] = useState(null)

    //代打で変更される前の打順を記録するステイト
    const [latestBatOrder, setLatestBatOrder] = useState({ dasekiNum: 0, order: [] })

    //パスボタンのステイトを定義 0か1か
    const [isPass, setIsPass] = useState(0)

    //データを読み込みを行うトリガー
    const [trigger, setTrigger] = useState(true)

    //編集モードであるかどうかを監視するステイト
    const [isEditMode, setIsEditMode] = useState(false)


    //画面解像度取得
    var sw = document.documentElement.clientWidth; // 画面の横幅
    var sh = document.documentElement.clientHeight; // 画面の高さ

    // contextを状態として持つ
    const [context, setContext] = useState(null)

    //打球を消すためのステイト
    const [deleteball, setDeleteBall] = useState(false)

    const [canvasX1, setcanvasX1] = useState(0)
    const [canvasY1, setcanvasY1] = useState(0)
    //一つのStateで管理しようぜ的な試み
    //const [canvasXY, setCanvasXY] = useState({x:0, y:0})

    // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録

    const homebase = 520;
    const h = 70;
    const l = -110;
    const w = 0.03 * homebase;  //ベースの幅
    const margin = 10;    //ベース位置調整用

    useEffect(() => {
        const canvas = document.getElementById("canvas")
        const canvasContext = canvas.getContext("2d")
        setContext(canvasContext)



        canvas.addEventListener("click", e => {
            const rect = e.target.getBoundingClientRect();

            // ブラウザ上での座標を求める
            const viewX = e.clientX - rect.left,
                viewY = e.clientY - rect.top;

            // 表示サイズとキャンバスの実サイズの比率を求める
            const scaleWidth = canvas.clientWidth / canvas.width,
                scaleHeight = canvas.clientHeight / canvas.height;

            // ブラウザ上でのクリック座標をキャンバス上に変換
            const canvasX = Math.floor(viewX / scaleWidth),
                canvasY = Math.floor(viewY / scaleHeight);

            console.log(canvasX, canvasY);
            setcanvasX1(canvasX);
            setcanvasY1(canvasY);
        });
    }, [])


    useEffect(() => {
        if (context !== null) {
            Ground(context);
        }
    }, [context])


    // 状態にコンテキストが登録されたらそれに対して操作できる
    useEffect(() => {
        if (context !== null) {

            //削除
            context.clearRect(0, 0, canvasSize, canvasSize);

            Ground(context);

            //ベースの色
            let baseColor2 = [];
            for (let i = 0; i < 3; i++) {
                if (runnerCountState[i]) {
                    baseColor2[i] = "blue";
                    console.log(baseColor2[i]);
                }
                else {
                    baseColor2[i] = "white";
                }
            }


            context.strokeStyle = "black";

            //３塁ベース
            context.fillStyle = baseColor2[0];
            context.beginPath();
            context.moveTo(homebase * 3 / 4 + l, homebase * 3 / 4 - margin + h);
            context.lineTo(homebase * 3 / 4 - w + l, homebase * 3 / 4 + w - margin + h);
            context.lineTo(homebase * 3 / 4 + l, homebase * 3 / 4 + w * 2 - margin + h);
            context.lineTo(homebase * 3 / 4 + w + l, homebase * 3 / 4 + w - margin + h);
            context.closePath();
            context.fill();
            context.lineWidth = 1;
            context.stroke();

            //2塁ベース
            context.fillStyle = baseColor2[1];
            context.beginPath();
            context.moveTo(homebase + l, homebase / 2 - margin + h);
            context.lineTo(homebase - w + l, homebase / 2 + w - margin + h);
            context.lineTo(homebase + l, homebase / 2 + w * 2 - margin + h);
            context.lineTo(homebase + w + l, homebase / 2 + w - margin + h);
            context.closePath();
            context.fill();
            context.stroke();

            //1塁ベース
            context.fillStyle = baseColor2[2];
            context.beginPath();
            context.moveTo(homebase * 5 / 4 + l, homebase * 3 / 4 - margin + h);
            context.lineTo(homebase * 5 / 4 - w + l, homebase * 3 / 4 + w - margin + h);
            context.lineTo(homebase * 5 / 4 + l, homebase * 3 / 4 + w * 2 - margin + h);
            context.lineTo(homebase * 5 / 4 + w + l, homebase * 3 / 4 + w - margin + h);
            context.closePath();
            context.fill();
            context.stroke();

            battedBall(context, canvasX1, canvasY1, flag);

        }
    }, [canvasX1, canvasY1, flag, runnerCountState])



    //変更開始

    const delball = () => {
        setDeleteBall(!deleteball);
    }

    useEffect(() => {
        if (context !== null) {

            //削除
            context.clearRect(0, 0, canvasSize, canvasSize);

            Ground(context);

            //ベースの色
            let baseColor2 = [];
            for (let i = 0; i < 3; i++) {
                if (runnerCountState[i]) {
                    baseColor2[i] = "blue";
                    console.log(baseColor2[i]);
                }
                else {
                    baseColor2[i] = "white";
                }
            }


            context.strokeStyle = "black";

            //３塁ベース
            context.fillStyle = baseColor2[0];
            context.beginPath();
            context.moveTo(homebase * 3 / 4 + l, homebase * 3 / 4 - margin + h);
            context.lineTo(homebase * 3 / 4 - w + l, homebase * 3 / 4 + w - margin + h);
            context.lineTo(homebase * 3 / 4 + l, homebase * 3 / 4 + w * 2 - margin + h);
            context.lineTo(homebase * 3 / 4 + w + l, homebase * 3 / 4 + w - margin + h);
            context.closePath();
            context.fill();
            context.lineWidth = 1;
            context.stroke();

            //2塁ベース
            context.fillStyle = baseColor2[1];
            context.beginPath();
            context.moveTo(homebase + l, homebase / 2 - margin + h);
            context.lineTo(homebase - w + l, homebase / 2 + w - margin + h);
            context.lineTo(homebase + l, homebase / 2 + w * 2 - margin + h);
            context.lineTo(homebase + w + l, homebase / 2 + w - margin + h);
            context.closePath();
            context.fill();
            context.stroke();

            //1塁ベース
            context.fillStyle = baseColor2[2];
            context.beginPath();
            context.moveTo(homebase * 5 / 4 + l, homebase * 3 / 4 - margin + h);
            context.lineTo(homebase * 5 / 4 - w + l, homebase * 3 / 4 + w - margin + h);
            context.lineTo(homebase * 5 / 4 + l, homebase * 3 / 4 + w * 2 - margin + h);
            context.lineTo(homebase * 5 / 4 + w + l, homebase * 3 / 4 + w - margin + h);
            context.closePath();
            context.fill();
            context.stroke();
        }
    }, [deleteball])

    //変更終了



    useEffect(() => {
        //データベースからデータをもらうために呼び出す
        // setBatter(setBattingOrder, setBattingOrder2, urlSchoolId, urlSchoolId2, urlGameId, nowPlayingMember, setNowPlayingMember)

        //チーム1の選手登録情報を読み出す
        loadRegisteredMember(setRegisteredMember1, urlTournamentId, urlSchoolId)

        //チーム2の選手登録情報を読み出す
        loadRegisteredMember(setRegisteredMember2, urlTournamentId, urlSchoolId2)

    }, [])

    useEffect(() => {
        //テーブル存在確認
        TransmissionDasekiCall(urlGameId, urlSchoolId, urlSchoolId2, urlTournamentId,
            setNowIningState, setScoreState, setNowOutCountState,
            setNowPlayingMember, setRunnerCountState, setDasekiAll, setBattingOrder, setBattingOrder2
        )
    }, [trigger])



    return (
        <div className="InputPlayGame">
            <TitleBar
                TitleText={"過去速報修正画面"}
                PageTransition={PageTransition}
                valueUrl={-2}
            />

            <OptionButton />

            <div className="parts">
                {
                    <>
                        <div className="scoreBoard">
                            {scoreBoard(scoreState, nowIningState, urlSchoolName, urlSchoolName2)}
                        </div>
                        <div className="optionButtons">
                        </div>
                        <div className="outCountsAndRunnerCounts">
                            <div className="passButton">
                                {isPass === 1 &&
                                    <button className="passButtonFalse" onClick={() => setIsPass(0)}>パスを解除</button>
                                }
                                {isPass === 0 &&
                                    <button className='passButtonTrue' onClick={() => { setIsPass(1) }}>パス</button>
                                }
                            </div>
                            <div className='outCount'>
                                <div className="outCountDisplay">o</div>
                                {outCount(nowOutCountState, setNowOutCountState)}
                            </div>
                            {runnerCount(runnerCountState, setRunnerCountState)}
                        </div>
                        <div className="BatterAndPitcher">

                        </div>
                        <div className="BatterPitcher">
                            {/* プルダウン1  選手を表示するためのプルダウン */}
                            <PullDownMember
                                battingOrder={battingOrder}
                                battingOrder2={battingOrder2}
                                setBattingOrder={setBattingOrder}
                                setBattingOrder2={setBattingOrder2}
                                registeredMember1={registeredMember1}
                                registeredMember2={registeredMember2}
                                nowIningState={nowIningState}
                                nowPlayingMember={nowPlayingMember}
                                setNowPlayingMember={setNowPlayingMember}
                                setIsPinch={setIsPinch}
                                latestBatOrder={latestBatOrder}
                                setLatestBatOrder={setLatestBatOrder}
                                dasekiAll={dasekiAll}
                                dasekiNum={dasekiAll.length}
                            />
                        </div>
                        <div className="freeWrite">
                            {freeWrite(freeWriteState, setFreeWriteState, freeWriteModeFlag, setFreeWriteModeFlag)}
                        </div>

                        {/* プルダウン2 */}
                        <PullDown
                            nowPosition={nowPosition}
                            setNowPosition={setNowPosition}
                            setcanvasX1={setcanvasX1}
                            setcanvasY1={setcanvasY1}
                            setFlag={setFlag}
                            setFreeWriteState={setFreeWriteState}
                            setBatterResult={setBatterResult}
                            addScoreState={addScoreState}
                            GameEndPopup_field={GameEndPopup}
                            TableRegister={TableRegister}
                            urlGameId={urlGameId}
                            TmpTableDelete={TmpTableDelete}
                            DeleteDuringGame={DeleteDuringGame}
                            CalculateBatAvg={CalculateBatAvg}
                            nowOutCountState={nowOutCountState}
                            setNowOutCountState={setNowOutCountState}
                            schoolId1={urlSchoolId}
                            schoolId2={urlSchoolId2}
                        />
                    </>}

                {/* キャンバスについて */}
                <div className="diamond">
                    <canvas width="800" height="610" id="canvas" className='diamondPng'></canvas>
                </div>

                <div className="Buttons">
                    <div className="baseballButtons">
                        {BaseballButton(addScoreState, setAddScoreState)}
                    </div>
                    {!isEditMode &&
                        <>
                            <div className="updateButton">
                                {/* ポップアップ*/}
                                <Popupfield
                                    nowIningState={nowIningState} //今が何回なのか
                                    setNowIningState={setNowIningState} //今が何回なのかの変更関数
                                    addScoreState={addScoreState}
                                    setAddScoreState={setAddScoreState}
                                    scoreState={scoreState}
                                    setScoreState={setScoreState}
                                    nowOutCountState={nowOutCountState}
                                    setNowOutCountState={setNowOutCountState}
                                    DasekiRegister={DasekiRegister}
                                    urlGameId={urlGameId}
                                    urlSchoolId={urlSchoolId}
                                    urlSchoolId2={urlSchoolId2}
                                    nowPlayingMember={nowPlayingMember}
                                    setNowPlayingMember={setNowPlayingMember}
                                    battingOrder={battingOrder}
                                    battingOrder2={battingOrder2}
                                    runnerCountState={runnerCountState}
                                    freeWriteState={freeWriteState}
                                    setFreeWriteState={setFreeWriteState}
                                    canvasX1={canvasX1}
                                    setcanvasX1={setcanvasX1}
                                    canvasY1={canvasY1}
                                    setcanvasY1={setcanvasY1}
                                    flag={flag}
                                    batterResult={batterResult}
                                    setBatterResult={setBatterResult}
                                    isPinch={isPinch}
                                    setIsPinch={setIsPinch}
                                    TransmissionDasekiCall={TransmissionDasekiCall}
                                    trigger={trigger}
                                    setTrigger={setTrigger}
                                    isPass={isPass}
                                    setIsPass={setIsPass}
                                />
                            </div>
                        </>
                    }

                </div>

                {isEditMode &&
                    makePulldown(0, dasekiAll, "at_bat_id", nowSelected, setNowSelected, urlSchoolName, urlSchoolName2,
                        dasekiAll, setNowIningState, setNowOutCountState, setRunnerCountState, setNowPlayingMember,
                        setFreeWriteState, setcanvasX1, setcanvasY1, setAddScoreState, setFlag,
                        battingOrder, battingOrder2, registeredMember1, registeredMember2, setBattingOrder, setBattingOrder2
                    )
                }

                {/* 修正モード */}
                {!isEditMode &&
                    <button className='editButton'
                        onClick={() => {
                            setIsEditMode(true);
                            editBattersBox(dasekiAll[nowSelected], dasekiAll, nowSelected,
                                setNowIningState, setNowOutCountState, setRunnerCountState, setNowPlayingMember,
                                setFreeWriteState, setcanvasX1, setcanvasY1, setAddScoreState, setFlag,
                                battingOrder, battingOrder2, registeredMember1, registeredMember2, setBattingOrder, setBattingOrder2
                            )
                        }}>修正モード
                    </button>
                }
                {isEditMode &&
                    <button className='editButton'
                        onClick={() => {
                            setIsEditMode(false)
                            loardNowDaseki(setNowOutCountState, setNowIningState, setRunnerCountState, setScoreState,
                                setNowPlayingMember, setFreeWriteState,
                                dasekiAll, battingOrder, battingOrder2)
                            setNowSelected([0])
                        }}>速報入力に戻る
                    </button>
                }


                {isEditMode &&
                    <button className='editButton'
                        onClick={() =>
                            sendEdit(
                                urlGameId,
                                dasekiAll,
                                nowSelected,
                                nowIningState,
                                addScoreState,
                                scoreState,
                                nowOutCountState,
                                nowPlayingMember,
                                battingOrder,
                                battingOrder2,
                                runnerCountState,
                                freeWriteState,
                                canvasX1,
                                canvasY1,
                                flag,
                                batterResult,
                                isPinch,
                                trigger, 
                                setTrigger
                            )}
                    >修正確定</button>
                }
                {<button className='editButton' onClick={() => delball()}>打球削除</button>}
            </div>

        </div >

    )
}

export default InputPastGame