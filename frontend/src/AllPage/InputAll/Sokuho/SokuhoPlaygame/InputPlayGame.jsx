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

import { TitleBar } from '../../../OtherPage/TitleBar/TitleBar';

//プルダウン
import { PullDown } from './comSokuho/PullDown/PullDown'
import { PullDownMember } from './comSokuho/PullDown/PullDownMember'
import { useSearchParams, useNavigate } from 'react-router-dom';

//バックエンドのurlを取得
const backendUrl = require("../../../../DB/communication").backendUrl;


//選手読み込み
const setBatter = (setBattingOrder, setBattingOrder2, urlSchoolId, urlSchoolId2, urlGameId, nowPlayingMember, setNowPlayingMember) => {
    const ditectPitcher = (data) => {
        let result = 0
        data.map((data, ind) => {
            if (data.position === "ピッチャー") {
                result = ind
            }
        })
        return result
    }

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
            setBattingOrder(TeamAdata)

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
                    setBattingOrder2(TeamBdata)
                    nowPlayingMember[0].pitcher = ditectPitcher(TeamBdata)
                    nowPlayingMember[1].pitcher = ditectPitcher(TeamAdata)
                    setNowPlayingMember(nowPlayingMember)
                })
        })
}

//自作プルダウン　改造あり
const makePulldown = (pulldownId, ArrayList, idText, nowSelected, setNowSelected, urlSchoolName, urlSchoolName2) => {
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
    setFreeWriteState, setcanvasX1, setcanvasY1, setAddScoreState, battingOrder, battingOrder2) => {

    console.log(battersBox)
    const touchedCoordinate = battersBox.touched_coordinate.split("_")

    let teamBBatter = 0;
    let teamApitcher = 0;

    const value = battersBox.inning
    for (let i = nowSelected; i >= 0; i--) {
        if (value !== battersBoxAll[i].inning) {
            teamBBatter = battersBoxAll[i].player_id
            teamApitcher = battersBoxAll[i].pitcher_id
            break
        }
    }

    setNowIningState([Math.floor(battersBox.inning / 10 - 1), battersBox.inning % 10 - 1])
    setNowOutCountState(battersBox.outcount)
    setRunnerCountState([battersBox.base / 100 >= 1, battersBox.base / 10 >= 1 && battersBox.base === 0, battersBox.base === 1])
    setFreeWriteState(battersBox.text_inf)
    setcanvasX1(touchedCoordinate[0])
    setcanvasY1(touchedCoordinate[1])
    setAddScoreState(battersBox.score)
    setNowPlayingMember(
        [{
            batter: battingOrder.findIndex((u) => u.player_id === battersBox.player_id),
            pitcher: battingOrder2.findIndex((u) => u.player_id === battersBox.pitcher_id)
        },
        {
            batter: teamBBatter,
            pitcher: teamApitcher
        }])
    console.log(battingOrder2.findIndex((u) => u.player_id === battersBox.pitcher_id))
    console.log(battersBox.player_id)



}

//一時打席情報登録用のテーブル作成
const TmpTableCreate = (urlGameId) => {

    fetch(backendUrl + "/daseki/tmp_table_create", {
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
const TmpTableCheck = (urlGameId, TmpTableCreate, TmpDasekiCall, urlTournamentId, urlSchoolId, urlSchoolId2,
    setNowIningState, setScoreState, setNowOutCountState, registeredMember1, registeredMember2,
    setNowPlayingMember, battingOrder, setBattingOrder, battingOrder2, setBattingOrder2, setRunnerCountState, setDasekiAll
) => {

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
            if (data === "not exist") { TmpTableCreate(urlGameId); console.log(data) }
            else if (data === "exist") {
                console.log(data)
                TmpDasekiCall(urlGameId, urlTournamentId, urlSchoolId, urlSchoolId2,
                    setNowIningState, setScoreState, setNowOutCountState, registeredMember1, registeredMember2,
                    setNowPlayingMember, battingOrder, setBattingOrder, battingOrder2, setBattingOrder2, setRunnerCountState, setDasekiAll
                )
            }
        })
}

////試合情報受け取り（速報用）
const TmpDasekiCall = (urlGameId, urlTournamentId, urlSchoolId, urlSchoolId2,
    setNowIningState, setScoreState, setNowOutCountState, registeredMember1, registeredMember2,
    setNowPlayingMember, battingOrder, setBattingOrder, battingOrder2, setBattingOrder2, setRunnerCountState, setDasekiAll) => {

    fetch(backendUrl + "/daseki/tmp_daseki_call", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ table_name: urlGameId }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
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
                        setBattingOrder(TeamAdata)
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
                                let teamABatter = 0
                                let teamApitcher = 0
                                let teamBBatter = 0
                                let teamBpitcher = 0

                                //先攻
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
                                    if (data[data.length - 1].outcount !== 3) teamABatter++
                                    else teamBBatter++
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
        })
}



//一時打席情報登録用のテーブルに打席情報登録（UPSERTを使うかも）
const DasekiRegister = (sendInfo) => {

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
            console.log(data)
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

    //DBにデータを送る
    let sendInfo = {
        at_bat_id: dasekiAll[nowSelected].at_bat_id,
        table_name: urlGameId,
        inning: (nowIningState[1] + 1) * 10 + (nowIningState[0] + 1),
        game_id: urlGameId,
        school_id: dasekiAll[nowSelected].school_id,
        player_id: battingOrder[nowPlayingMember[nowIningState[1]].batter].player_id,
        pitcher_id: battingOrder2[nowPlayingMember[nowIningState[1]].pitcher].player_id,
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

    fetch(backendUrl + "/daseki/tmp_daseki_update", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(sendInfo),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
}






const canvasSize = 1000;
const homebase = 400;

const InputPlayGame = () => {

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
        pass: 0, pinch: "0", pitcher_id: 21, player_id: 7,
        school_id: 1, score: 0, text_inf: "アウト:ピッチャーフライ",
        total_score: 0, touched_coordinate: "400_450"
    }])

    //打席一覧情報のプルダウンの選択状況を管理するステイト
    const [nowSelected, setNowSelected] = useState([])

    //打順と打者のリスト
    const [battingOrder, setBattingOrder] = useState([[{ player_name_kanji: '丹羽 長秀' }, { player_name_kanji: '柴田 勝家' }], 0])
    const [battingOrder2, setBattingOrder2] = useState([[{ player_name_kanji: '丹羽 長秀' }, { player_name_kanji: '柴田 勝家' }], 0])

    //今の打順と今のピッチャーが誰なのかを2チーム文記録する
    const [nowPlayingMember, setNowPlayingMember] = useState([{ batter: 0, pitcher: 0 }, { batter: 0, pitcher: 0 }])

    //代打フラグ 0なら代打でない 1なら代打
    const [isPinch, setIsPinch] = useState(0)

    //編集モードであるかどうかを監視するステイト
    const [isEditMode, setIsEditMode] = useState(false)


    //画面解像度取得
    var sw = document.documentElement.clientWidth; // 画面の横幅
    var sh = document.documentElement.clientHeight; // 画面の高さ

    // contextを状態として持つ
    const [context, setContext] = useState(null)


    const [canvasX1, setcanvasX1] = useState(0)
    const [canvasY1, setcanvasY1] = useState(0)
    //一つのStateで管理しようぜ的な試み
    //const [canvasXY, setCanvasXY] = useState({x:0, y:0})

    // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録

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



    // 状態にコンテキストが登録されたらそれに対して操作できる
    useEffect(() => {
        if (context !== null) {
            //const img = new Image()
            //img.src = "img.jpg" // 描画する画像など


            //img.onload = () => {

            //context.drawImage(img, 0, 0)
            // 更にこれに続いて何か処理をしたい場合

            //削除
            context.clearRect(0, 0, canvasSize, canvasSize);

            //緑グラウンド
            context.beginPath();
            context.fillStyle = "green";
            context.moveTo(homebase, homebase);
            context.arc(homebase, homebase, homebase, -Math.PI / 4, 5 * Math.PI / 4, true);
            context.closePath();
            context.fill();

            //茶グラウンド
            context.beginPath();
            context.fillStyle = "sienna";
            context.moveTo(homebase, homebase);
            context.arc(homebase, homebase, 3.5 * homebase / 5, -Math.PI / 4, 5 * Math.PI / 4, true);
            context.closePath();
            context.fill();

            //白線
            context.beginPath();
            context.moveTo(homebase, homebase);
            context.lineTo(homebase * 5 / 4, homebase * 3 / 4);
            context.lineTo(homebase, homebase / 2);
            context.lineTo(homebase * 3 / 4, homebase * 3 / 4);
            context.strokeStyle = "white";
            context.lineWidth = 2;
            context.closePath();
            context.stroke();


            const w = 0.03 * homebase;  //ベースの幅
            const margin = 10;    //ベース位置調整用

            //ベースの色 １：３塁、２：２塁、３:１塁
            let baseColor2 = [];
            for (let i = 0; i < 3; i++) {
                if (runnerCountState[i]) {
                    baseColor2[2 - i] = "blue";
                }
                else {
                    baseColor2[2 - i] = "white";
                }
            }


            context.strokeStyle = "black";

            //３塁ベース
            context.fillStyle = baseColor2[2];
            context.beginPath();
            context.moveTo(homebase * 3 / 4, homebase * 3 / 4 - margin);
            context.lineTo(homebase * 3 / 4 - w, homebase * 3 / 4 + w - margin);
            context.lineTo(homebase * 3 / 4, homebase * 3 / 4 + w * 2 - margin);
            context.lineTo(homebase * 3 / 4 + w, homebase * 3 / 4 + w - margin);
            context.closePath();
            context.fill();
            context.lineWidth = 1;
            context.stroke();

            //2塁ベース
            context.fillStyle = baseColor2[1];
            context.beginPath();
            context.moveTo(homebase, homebase / 2 - margin);
            context.lineTo(homebase - w, homebase / 2 + w - margin);
            context.lineTo(homebase, homebase / 2 + w * 2 - margin);
            context.lineTo(homebase + w, homebase / 2 + w - margin);
            context.closePath();
            context.fill();
            context.stroke();

            //1塁ベース
            context.fillStyle = baseColor2[0];
            context.beginPath();
            context.moveTo(homebase * 5 / 4, homebase * 3 / 4 - margin);
            context.lineTo(homebase * 5 / 4 - w, homebase * 3 / 4 + w - margin);
            context.lineTo(homebase * 5 / 4, homebase * 3 / 4 + w * 2 - margin);
            context.lineTo(homebase * 5 / 4 + w, homebase * 3 / 4 + w - margin);
            context.closePath();
            context.fill();
            context.stroke();

            context.fillStyle = "white";
            //ホームベース
            context.beginPath();
            context.moveTo(homebase + w * 2 / 3, homebase - w * 2 / 3);
            context.lineTo(homebase - w * 2 / 3, homebase - w * 2 / 3);
            context.lineTo(homebase - w * 2 / 3, homebase + w / 3);
            context.lineTo(homebase, homebase + w);
            context.lineTo(homebase + w * 2 / 3, homebase + w / 3);
            context.closePath();
            context.fill();
            context.stroke();


            //打球
            context.beginPath();
            context.moveTo(homebase, homebase);

            // let flag = 2;   //１が直線、２がフライ、3がゴロ

            if (flag === 1) {
                console.log("flag1")
                context.lineTo(canvasX1, canvasY1)
            }
            if (flag === 2) {
                let start = { x: 500, y: 500 };
                let cp = { x: 500, y: start.y / 5 * 3 };    //ここで曲がり具合調整
                context.quadraticCurveTo(cp.x, cp.y, canvasX1, canvasY1);
            }
            if (flag === 3) {
                console.log("flag3")
                drawWaveLine(500, 500, canvasX1, canvasY1, 20, 20, "red", context);
            }

            context.strokeStyle = "red";
            context.lineWidth = 5;
            context.stroke();

            //setLoaded(true)
            //}




            // 波線描画
            // 0度状態でキャンバス中心〜マウス座標までの距離分の波線を描画して、マウス座標との角度分、回転する

            function drawWaveLine(x, y, mx, my, amplitude, waveLen, color, ctx) {
                const BEGIN = 0, CTRL = 1, END = 2;
                const x1 = 0, y1 = 1;
                var distance = calcDistance(x, y, mx, my);
                var cycle = Math.floor(distance / waveLen);
                var ps = [[x, y], [0, 0], [x, y]];

                ctx.save();
                ctx.strokeStyle = color;
                ctx.beginPath();

                ctx.moveTo(ps[BEGIN][x1], ps[BEGIN][y1]);

                var rad = calcRadian(x, y, mx, my);
                if (0 !== rad) {
                    ctx.translate(x, y);
                    ctx.rotate(rad);
                    ctx.translate(-x, -y);
                }

                for (var i = 0; i < cycle; i++) {
                    ps[END][x1] += waveLen;
                    ps[CTRL][x1] = ps[BEGIN][x1] + ((ps[END][x1] - ps[BEGIN][x1]) * 0.5);
                    ps[CTRL][y1] = ps[BEGIN][y1] + ((i % 2 !== 0) ? -amplitude : amplitude);

                    ctx.quadraticCurveTo(ps[CTRL][x1], ps[CTRL][y1], ps[END][x1], ps[END][y1]);

                    ps[BEGIN][x1] = ps[END][x1];
                    ps[BEGIN][y1] = ps[END][y1];
                }

                ps[END][x1] += distance - calcDistance(x, y, ps[END][x1], ps[END][y1]);
                ps[CTRL][x1] = ps[BEGIN][x1] + ((ps[END][x1] - ps[BEGIN][x1]) * 0.5);
                ps[CTRL][y1] = ps[BEGIN][y1] + (((cycle) % 2 !== 0) ? -amplitude : amplitude);

                ctx.quadraticCurveTo(ps[CTRL][x1], ps[CTRL][y1], ps[END][x1], ps[END][y1]);

                ctx.stroke();
                ctx.restore();
            }

            // 2点間座標からラジアン算出
            function calcRadian(x, y, mx, my) {
                return Math.atan2(my - y, mx - x);
            }

            // 2点間座標の距離算出
            function calcDistance(x, y, mx, my) {
                return Math.hypot(my - y, mx - x);
            }
        }
    }, [canvasX1, canvasY1, flag, runnerCountState])

    useEffect(() => {
        //データベースからデータをもらうために呼び出す
        setBatter(setBattingOrder, setBattingOrder2, urlSchoolId, urlSchoolId2, urlGameId, nowPlayingMember, setNowPlayingMember)
        loadRegisteredMember(setRegisteredMember1, urlTournamentId, urlSchoolId)
        loadRegisteredMember(setRegisteredMember2, urlTournamentId, urlSchoolId2)


        //テーブル存在確認
        TmpTableCheck(urlGameId, TmpTableCreate, TmpDasekiCall, urlTournamentId, urlSchoolId, urlSchoolId2,
            setNowIningState, setScoreState, setNowOutCountState, registeredMember1, registeredMember2,
            setNowPlayingMember, battingOrder, setBattingOrder, battingOrder2, setBattingOrder2, setRunnerCountState, setDasekiAll
        )

    }, [])



    return (
        <div className="InputPlayGame">
            <TitleBar
                TitleText={"速報入力画面"}
                PageTransition={PageTransition}
                valueUrl={-1}
            />
            <EditPoint></EditPoint>
            <OptionButton />
            <div className="parts">
                <div className="scoreBoard">
                    {scoreBoard(scoreState, nowIningState, urlSchoolName, urlSchoolName2)}
                </div>
                <div className="optionButtons">
                </div>
                <div className="outCountsAndRunnerCounts">
                    {outCount(nowOutCountState, setNowOutCountState)}
                    ３塁：２塁：１塁{runnerCount(runnerCountState, setRunnerCountState)}
                </div>
                <div className="BatterAndPitcher">

                </div>
                <div className="BatterPitcher">
                    {/* プルダウン1  選手を表示するためのプルダウン */}
                    <PullDownMember
                        battingOrder={battingOrder}
                        battingOrder2={battingOrder2}
                        setBattingOrder={setBattingOrder}
                        registeredMember1={registeredMember1}
                        registeredMember2={registeredMember2}
                        nowIningState={nowIningState}
                        nowPlayingMember={nowPlayingMember}
                        setNowPlayingMember={setNowPlayingMember}
                        setIsPinch={setIsPinch}
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
                />

                <div className="diamond">

                    <canvas width="800" height="800" id="canvas" className='diamondPng'></canvas>
                </div>
                <div className="Buttons">
                    <div className="baseballButtons">
                        {BaseballButton(addScoreState, setAddScoreState)}
                    </div>
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
                        />
                    </div>
                </div>

                {makePulldown(0, dasekiAll, "at_bat_id", nowSelected, setNowSelected, urlSchoolName, urlSchoolName2)}
                <button onClick={() => {
                    setIsEditMode(!isEditMode);
                    editBattersBox(dasekiAll[nowSelected], dasekiAll, nowSelected,
                        setNowIningState, setNowOutCountState, setRunnerCountState, setNowPlayingMember,
                        setFreeWriteState, setcanvasX1, setcanvasY1, setAddScoreState, battingOrder, battingOrder2
                    )
                }}>修正打席選択</button>
                {<button
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
                        )}
                >修正確定</button>}
            </div>
        </div >

    )
}

export default InputPlayGame