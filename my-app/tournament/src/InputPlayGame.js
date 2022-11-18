//import { scoreBoard } from './comSokuho/scoreBoard';
//import { outCount } from './comSokuho/outCount'
//import { freeWrite } from './comSokuho/freeWrite'
//import { BaseballButton } from './comSokuho/baseballButton'
//import "./comSokuho/CSS/scoreBoard.css"
//import pic from "../DB/diamond.png"
import { useEffect, useState } from 'react';


const InputPlayGame = () => {

    //const [outCountState, setOutCountState] = useState(0)
    //const [freeWriteState, setFreeWriteState] = useState("")//いらんかも
    //const freeWriteRef = useRef()




    // contextを状態として持つ
    const [context, setContext] = useState(null)
    // 画像読み込み完了トリガー
    //const [loaded, setLoaded] = useState(false)

    const [canvasX1, setcanvasX1] = useState(0)
    const [canvasY1, setcanvasY1] = useState(0)

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
            const img = new Image()
            img.src = "img.jpg" // 描画する画像など


            //img.onload = () => {

            context.drawImage(img, 0, 0)
            // 更にこれに続いて何か処理をしたい場合

            //削除
            context.clearRect(0, 0, 1000, 1000);

            // パスをリセット
            context.beginPath();

            // 線を引くスタート地点に移動
            context.moveTo(500, 500);

            let flag = 3;   //１が直線、２がフライ、3がゴロ

            // スタート地点から(200,200)まで線を引く
            if (flag == 1) {
                console.log("flag1")
                //context.lineTo(200, 200)
                context.lineTo(canvasX1, canvasY1)
            }
            if (flag == 2) {
                let start = { x: 500, y: 500 };
                let cp = { x: 500, y: start.y / 3 * 2 };    //ここで曲がり具合調整
                console.log("flag2")
                context.quadraticCurveTo(cp.x, cp.y, canvasX1, canvasY1);
            }
            if (flag == 3) {
                console.log("flag3")
                drawWaveLine(500, 500, canvasX1, canvasY1, 20, 20, "red", context);
            }


            // 線の色
            context.strokeStyle = "red";

            // 線の太さ
            context.lineWidth = 5;

            // 線を描画する
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
                if (0 != rad) {
                    ctx.translate(x, y);
                    ctx.rotate(rad);
                    ctx.translate(-x, -y);
                }

                for (var i = 0; i < cycle; i++) {
                    ps[END][x1] += waveLen;
                    ps[CTRL][x1] = ps[BEGIN][x1] + ((ps[END][x1] - ps[BEGIN][x1]) * 0.5);
                    ps[CTRL][y1] = ps[BEGIN][y1] + ((i % 2 != 0) ? -amplitude : amplitude);

                    ctx.quadraticCurveTo(ps[CTRL][x1], ps[CTRL][y1], ps[END][x1], ps[END][y1]);

                    ps[BEGIN][x1] = ps[END][x1];
                    ps[BEGIN][y1] = ps[END][y1];
                }

                ps[END][x1] += distance - calcDistance(x, y, ps[END][x1], ps[END][y1]);
                ps[CTRL][x1] = ps[BEGIN][x1] + ((ps[END][x1] - ps[BEGIN][x1]) * 0.5);
                ps[CTRL][y1] = ps[BEGIN][y1] + (((cycle) % 2 != 0) ? -amplitude : amplitude);

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
    }, [canvasX1])



    return (
        <div className="InputPlayGame">
            <h1>速報入力画面</h1>
            <canvas width="800" height="800" id="canvas" className='diamondPng'></canvas>
        </div>

    )
}

export default InputPlayGame