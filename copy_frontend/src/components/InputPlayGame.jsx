import { scoreBoard } from './comSokuho/scoreBoard';
import { outCount } from './comSokuho/outCount'
import { freeWrite } from './comSokuho/freeWrite'
import { BaseballButton } from './comSokuho/baseballButton'
import "./comSokuho/CSS/scoreBoard.css"
import pic from "../DB/diamond.png"
import { useEffect, useRef, useState } from 'react';


const InputPlayGame = () => {

    const [outCountState, setOutCountState] = useState(0)
    const [freeWriteState, setFreeWriteState] = useState("")//いらんかも
    const freeWriteRef = useRef()




    // contextを状態として持つ
    const [context, setContext] = useState(null)
    const [canvasCopy, setCanvasCopy] = useState(null)
    // 画像読み込み完了トリガー
    const [loaded, setLoaded] = useState(false)
    // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録


    useEffect(() => {
        const canvas = document.getElementById("canvas")
        setCanvasCopy(canvas)
        const canvasContext = canvas.getContext("2d")
        setContext(canvasContext)

    }, [])

    // 状態にコンテキストが登録されたらそれに対して操作できる
    useEffect(() => {
        if (context !== null) {
            console.log(context)
            const img = new Image()
            img.src = pic // 描画する画像など



            img.onload = () => {
                context.drawImage(img, 0, 0)
                // 更にこれに続いて何か処理をしたい場合
                context.fillStyle = 'rgb(200, 0, 0)';
                context.fillRect(10, 10, 50, 50);
                context.fillStyle = 'rgba(0, 0, 200, 0.5)';
                context.fillRect(30, 30, 50, 50);




                setLoaded(true)
            }

            canvasCopy.addEventListener("click", e => {

                const rect = e.target.getBoundingClientRect();

                // ブラウザ上での座標を求める
                const viewX = e.clientX - rect.left,
                    viewY = e.clientY - rect.top;

                // 表示サイズとキャンバスの実サイズの比率を求める
                const scaleWidth = canvasCopy.clientWidth / canvasCopy.width,
                    scaleHeight = canvasCopy.clientHeight / canvasCopy.height;

                // ブラウザ上でのクリック座標をキャンバス上に変換
                const canvasX = Math.floor(viewX / scaleWidth),
                    canvasY = Math.floor(viewY / scaleHeight);
                    
                // パスをリセット
                context.beginPath();

                // 線を引くスタート地点に移動
                context.moveTo(0, 0);
                context.lineTo(canvasX, canvasY)
                // 線の色
                context.strokeStyle = "red";

                // 線の太さ
                context.lineWidth = 10;

                // 線を描画する
                context.stroke();
                console.log(canvasX, canvasY);
            });
        }
    }, [context])






    return (
        <div className="InputPlayGame">
            <h1>速報入力画面</h1>
            <div className="parts">
                <div className="scoreBoard">
                    {scoreBoard()}
                </div>
                <div className="optionButtons">

                </div>
                <div className="outCounts">
                    {outCount(outCountState, setOutCountState)}
                </div>
                <div className="BatterAndPitcher">

                </div>
                <div className="freeWrite">
                    {freeWrite(freeWriteRef)}
                </div>
                <div className="diamond">

                    <canvas width="800" height="800" id="canvas" className='diamondPng'></canvas>
                </div>
                <div className="baseballButtons">
                    {BaseballButton()}
                </div>
            </div>
        </div>

    )
}

export default InputPlayGame