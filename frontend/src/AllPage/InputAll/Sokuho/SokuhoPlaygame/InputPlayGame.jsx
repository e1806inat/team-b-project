import { scoreBoard } from './comSokuho/scoreBoard';
import { outCount } from './comSokuho/outCount'
import { runnerCount } from './comSokuho/runnerCount';
import { freeWrite } from './comSokuho/freeWrite'
import { BaseballButton } from './comSokuho/baseballButton'
import { updateButton } from './comSokuho/updateButton'
import "./comSokuho/CSS/scoreBoard.css"
import pic from "../../../../DB/diamond.png"
import { useEffect, useRef, useState } from 'react';
import Popupfield from "./comSokuho/onisi_popup/onisi_popup";

//プルダウン
import { PullDown } from './comSokuho/PullDown/PullDown'
import { PullDownMember } from './comSokuho/PullDown/PullDownMember'
import { useSearchParams } from 'react-router-dom';



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


    fetch("http://localhost:5000/member/starting_member_call", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId, school_id: urlSchoolId }),
    })
        .then((response) => response.json())
        .then((data1) => {
            console.log(data1);
            setBattingOrder(data1)

            fetch("http://localhost:5000/member/starting_member_call", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ game_id: urlGameId, school_id: urlSchoolId2 }),
            })
                .then((response) => response.json())
                .then((data2) => {
                    console.log(data2);
                    setBattingOrder2(data2)
                    nowPlayingMember[0].pitcher = ditectPitcher(data2)
                    nowPlayingMember[1].pitcher = ditectPitcher(data1)
                    setNowPlayingMember(nowPlayingMember)
                })

        })


}

const loadRegisteredMember = (setRegisteredMember, urlTournamentId, urlSchoolId) => {

    fetch("http://localhost:5000/member/tournament_member_call", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournament_id: urlTournamentId, school_id: urlSchoolId }),
    })
        .then((response) => response.json())
        .then((data) => { console.log(data); setRegisteredMember(data) })
}

const canvasSize = 1000;
const homebase = 500;

const InputPlayGame = () => {
    //urlから値を読み出す
    const [searchParams] = useSearchParams();
    const urlTournamentId = searchParams.get("urlTournamentId")
    const urlTournamentName = searchParams.get("urlTournamentName")
    const urlSchoolId = searchParams.get("urlSchoolId")
    const urlSchoolName = searchParams.get("urlSchoolName")
    const urlSchoolId2 = searchParams.get("urlSchoolId2")
    const urlSchoolName2 = searchParams.get("urlSchoolName2")
    const urlGameId = searchParams.get("urlGameId")

    //Score記録
    const { Score } = require("../../../../DB/Score")
    const [scoreState, setScoreState] = useState(Score)
    //Scoreの加算値の監視
    const [addScoreState, setAddScoreState] = useState(0)

    //今のイニング
    const [nowIningState, setNowIningState] = useState([0, 0])

    const [freeWriteState, setFreeWriteState] = useState("")//いらんかも
    const freeWriteRef = useRef()
    const [flag, setFlag] = useState(2);

    //緑プルダウン用
    const [nowPosition, setNowPosition] = useState(15)

    //アウトカウント
    const [nowOutCountState, setNowOutCountState] = useState(0)

    //ランナーカウント
    const [runnerCountState, setRunnerCountState] = useState([false, false, false])

    //選手登録情報を読み込む
    const [registeredMember1, setRegisteredMember1] = useState([])
    const [registeredMember2, setRegisteredMember2] = useState([])

    //打順と打者のリスト
    const [battingOrder, setBattingOrder] = useState([[{ player_name_kanji: '丹羽 長秀' }, { player_name_kanji: '柴田 勝家' }], 0])
    const [battingOrder2, setBattingOrder2] = useState([[{ player_name_kanji: '丹羽 長秀' }, { player_name_kanji: '柴田 勝家' }], 0])

    //今の打順と今のピッチャーが誰なのかを2チーム文記録する
    const [nowPlayingMember, setNowPlayingMember] = useState([{ batter: 0, pitcher: 0 }, { batter: 0, pitcher: 0 }])

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
                console.log("flag2")
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
                console.log("関数内")
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
    }, [])




    return (
        <div className="InputPlayGame">
            <h1>速報入力画面</h1>
            <div className="parts">
                <div className="scoreBoard">
                    {scoreBoard(scoreState, nowIningState, urlSchoolName, urlSchoolName2)}
                </div>
                <div className="optionButtons">
                </div>
                <div className="outCountsAndRunnerCounts">
                    {outCount(nowOutCountState, setNowOutCountState)}
                    {runnerCount(runnerCountState, setRunnerCountState)}
                </div>
                <div className="BatterAndPitcher">

                </div>
                <div className="BatterPitcher">
                    <PullDownMember
                        battingOrder={battingOrder}
                        battingOrder2={battingOrder2}
                        setBattingOrder={setBattingOrder}
                        registeredMember1={registeredMember1}
                        registeredMember2={registeredMember2}
                        nowIningState={nowIningState}
                        nowPlayingMember={nowPlayingMember}
                        setNowPlayingMember={setNowPlayingMember}
                    />
                </div>
                <div className="freeWrite">
                    {freeWrite(freeWriteRef, freeWriteState)}
                </div>

                <PullDown
                    nowPosition={nowPosition}
                    setNowPosition={setNowPosition}
                    setcanvasX1={setcanvasX1}
                    setcanvasY1={setcanvasY1}
                    setFlag={setFlag}
                    setFreeWriteState={setFreeWriteState}
                />

                <div className="diamond">

                    <canvas width="800" height="800" id="canvas" className='diamondPng'></canvas>
                </div>
                <div className="Buttons">
                    <div className="baseballButtons">
                        {BaseballButton(addScoreState, setAddScoreState)}
                    </div>
                    <div className="updateButton">
                        {/* {updateButton()} */}
                        <Popupfield
                            nowIningState={nowIningState} //今が何回なのか
                            setNowIningState={setNowIningState} //今が何回なのかの変更関数
                            addScoreState={addScoreState}
                            setAddScoreState={setAddScoreState}
                            scoreState={scoreState}
                            setScoreState={setScoreState}
                            nowOutCountState={nowOutCountState}
                            setNowOutCountState={setNowOutCountState}
                        />
                    </div>
                </div>

            </div>
        </div>

    )
}

export default InputPlayGame