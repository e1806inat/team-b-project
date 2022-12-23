import React, { useState, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom";
import { myIndexOf } from "./functions/myIndexOf";
import "./InputMember.css"


//選択しているやつのみ送信ボタンで送れるようにする







const { Schools } = require("../../../../DB/Schools"); //分割代入
//const { Member } = require("../../../../DB/Member")
const Member = [{}]

const setCheck = (copyMember, setSelectedMember) => {
    let copyArray = []
    for (let i = 0; i < copyMember.length; i++) {
        copyArray = [...copyArray, false]
    }
    setSelectedMember(copyArray)
}

const setBacknumber = (copyMember, setCopyMember) => {
    for (let i = 0; i < copyMember.length; i++) {
        copyMember[i].uniform_number = 1
    }
    setCopyMember(copyMember)

}

const makePulldownBN = (ind, uniformNumberArray, setUniformNumberArray) => {

    //return文の内部ではforループできないため、map関数を使いたい。
    //そのためにループしたい数と同じ長さの配列を作る
    let nullArray = [0]
    for (let i = 1; i < 50; i++) {
        nullArray = [...nullArray, i]
    }
    return (
        <>
            <select id="fruit"
                onChange={(e) => {
                    console.log(e.target.value + "_" + ind)
                    uniformNumberArray[ind] = e.target.value
                    setUniformNumberArray(uniformNumberArray)
                }}>
                {nullArray.map((component, ind) => (
                    <option value={ind + 1}>{ind + 1}</option>
                ))
                }
            </select>
        </>

    )
}

const handleSousin = (copyMember, selectedMember, urlTournamentId, uniformNumberArray) => {

    let sendArray = copyMember


    for (let i = 0; i < sendArray.length; i++) {
        delete sendArray[i].hit_num
        delete sendArray[i].bat_num
        sendArray[i].tournament_id = urlTournamentId
        sendArray[i].uniform_number = uniformNumberArray[i]
 
    }

  //選択したものだけの配列を作る
    let sendArray2 = []
    sendArray.map((component, ind)=> {
        if(selectedMember[ind]===true) sendArray2 = [...sendArray2, sendArray[ind]]
    })
    console.log(sendArray2)



    fetch("http://localhost:5000/member/tournament_member_register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sendArray2),
    })
}


const selectHitted = (handedHitState, handleHandedHit) => {
    if (handedHitState === "左") {
        return (
            <>
                <button style={{ color: "white", background: "#00afcc" }}>左打</button>
                <button style={{ color: "black", background: "transparent" }} onClick={() => handleHandedHit("右")}>右打</button>
                <button style={{ color: "black", background: "transparent" }} onClick={() => handleHandedHit("両")}>両打</button>
            </>
        )
    }
    else if (handedHitState === "右") {
        return (
            <>
                <button style={{ color: "black", background: "transparent" }} onClick={() => handleHandedHit("左")}>左打</button>
                <button style={{ color: "white", background: "#00afcc" }}>右打</button>
                <button style={{ color: "black", background: "transparent" }} onClick={() => handleHandedHit("両")}>両打</button>
            </>
        )
    }
    else if (handedHitState === "両") {
        return (
            <>
                <button style={{ color: "black", background: "transparent" }} onClick={() => handleHandedHit("左")}>左打</button>
                <button style={{ color: "black", background: "transparent" }} onClick={() => handleHandedHit("右")}>右打</button>
                <button style={{ color: "white", background: "#00afcc" }}>両打</button>
            </>
        )
    }
}

const selectThrowed = (handedThrowState, handleHandedThrow) => {
    if (handedThrowState === "左") {
        return (
            <>
                <button style={{ color: "white", background: "#00afcc" }}>左投</button>
                <button style={{ color: "black", background: "transparent" }} onClick={() => handleHandedThrow("右")}>右投</button>
                <button style={{ color: "black", background: "transparent" }} onClick={() => handleHandedThrow("両")}>両投</button>
            </>
        )
    }
    else if (handedThrowState === "右") {
        return (
            <>
                <button style={{ color: "black", background: "transparent" }} onClick={() => handleHandedThrow("左")}>左投</button>
                <button style={{ color: "white", background: "#00afcc" }}>右打</button>
                <button style={{ color: "black", background: "transparent" }} onClick={() => handleHandedThrow("両")}>両投</button>
            </>
        )
    }
    else if (handedThrowState === "両") {
        return (
            <>
                <button style={{ color: "black", background: "transparent" }} onClick={() => handleHandedThrow("左")}>左投</button>
                <button style={{ color: "black", background: "transparent" }} onClick={() => handleHandedThrow("右")}>右投</button>
                <button style={{ color: "white", background: "#00afcc" }}>両打</button>
            </>
        )
    }
}


export const InputMember = () => {
    const ining = 1;
    const number = 1;

    const iningRef = useRef(null)
    const numberRef = useRef(null)
    const nameKanjiRef = useRef(null)
    const nameHiraRef = useRef(null)

    const [iningState, setIningState] = useState(ining)
    const [schoolState, setSchoolState] = useState(1)
    const [numberState, setNumberState] = useState(1)

    const [handedHitState, setHandedHitState] = useState("左")
    const [handedThrowState, setHandedThrowState] = useState("左")


    //メンバーを選択しているかどうかのフラグをつくる
    let copyArray = [false]
    const [selectedMember, setSelectedMember] = useState(copyArray)

    //urlから値を取得
    const [searchParams] = useSearchParams();
    const urlTournamentId = searchParams.get("urlTournamentId")
    const urlTournamentName = searchParams.get("urlTournamentName")
    const urlSchoolId = searchParams.get("urlSchoolId")
    const urlSchoolName = searchParams.get("urlSchoolName")

    //背番号を格納する配列
    const [uniformNumberArray, setUniformNumberArray] = useState([null]);

    //クリック時メンバー選択
    const handleSelected = (ind) => {
        copyArray = selectedMember.slice(0, selectedMember.length); // stateの配列をコピー(値渡し)
        copyArray[ind] = !copyArray[ind]
        setSelectedMember(copyArray)
    }

    const [copyMember, setCopyMember] = useState(Member)

    const initialSetIning = () => {
        for (let i = 1; i <= 3; i++) {
            const option = document.createElement('option')
            option.value = i
            option.text = i
            iningRef.current.appendChild(option)
        }
    }

    const initialSetNumber = () => {
        for (let i = 1; i <= 50; i++) {
            const option = document.createElement('option')
            option.value = i;
            option.text = i;
            numberRef.current.appendChild(option)
        }
    }


    useEffect(() => {

        initialSetIning();
        initialSetNumber();
        loadMember(uniformNumberArray, setUniformNumberArray)
        //明日のメモ
        //選手を追加すると、ロードしなおすため背番号が消えてしまう。
        //だから、copymemberとは別の配列を用意してそこに記録する
        //選手を追加する場合は下から出てくる
        //あと選手の送信も訂正すること
    }, [])


    const loadMember = (uniformNumberArray, setUniformNumberArray) => {
        //高校に所属する3年生以下の人間を全員呼び出す
        fetch("http://localhost:5000/member/member_call", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ school_id: urlSchoolId }),
        })
            .then((response) => response.json())
            .then((data) => {
                setCopyMember(data);
                console.log(data)
                setCheck(data, setSelectedMember);

                if (uniformNumberArray[0] == null) {
                    let Array = [1];
                    for (let i = 1; i < data.length; i++) {
                        Array = [...Array, 1]
                    }
                    uniformNumberArray = Array
                    console.log(uniformNumberArray)
                    setUniformNumberArray(uniformNumberArray)
                }

            })
    }



    const selectIning = (e) => {
        setIningState(e.target.value)
    }
    const selectNumber = (e) => {
        setNumberState(e.target.value)
    }
    const selectSchool = (e) => {
        setSchoolState(e.target.value)
    }
    const handleHandedHit = (value) => {
        setHandedHitState(value)
    }
    const handleHandedThrow = (value) => {
        setHandedThrowState(value)
    }




    const handleMembers = (uniformNumberArray, setUniformNumberArray) => {
        let Array = [{
            "school_id": urlSchoolId,
            "player_name_kanji": nameKanjiRef.current.value,
            "player_name_hira": nameHiraRef.current.value,
            "uniform_number": numberRef.current.value,
            "grade": iningRef.current.value,
            "handed_hit": handedHitState,
            "handed_throw": handedThrowState,
            "BA": 0,
            "bat_num": 0,
            "hit_num": 0
        }]

        console.log(Array)

        fetch("http://localhost:5000/member/member_register", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            //body: JSON.stringify({ email:login_id , password:login_ps }),
            body: JSON.stringify(Array),
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === "OK") {
                    setUniformNumberArray([...uniformNumberArray, numberRef.current.value])
                    console.log([...uniformNumberArray, numberRef.current.value])
                    loadMember(uniformNumberArray, setUniformNumberArray)
                }
            })
    }


    return (
        <>
            <div className="IMtitle">出場選手選択画面</div>
            <div className="subject">
                <h3>{urlTournamentName}</h3>
                <h4>編集中:{urlSchoolName}</h4>
            </div>

            <div className="toroku">
                <div className="MakeGame">
                    <div className="grade">
                        <div className="year">学年<select ref={iningRef} value={iningState} onChange={selectIning} ></select></div>
                        <div className="uniNum">背番号<select ref={numberRef} value={numberState} onChange={selectNumber} ></select></div>
                    </div>

                    <div className="inputName">
                        
                        名前（漢字）　　<input ref={nameKanjiRef} ></input>

                        <br />
                        名前（ひらがな）<input ref={nameHiraRef}></input>
                    </div>

                    <div className="selectDominant">
                        <div>{selectHitted(handedHitState, handleHandedHit)}</div>
                        <div>{selectThrowed(handedThrowState, handleHandedThrow)}</div>
                    </div>

                    <br />
                    <button className="addButton" onClick={() => handleMembers(uniformNumberArray, setUniformNumberArray)}>追加</button>
                    {/* <button onClick={() => { console.log(uniformNumberArray) }}>プルダウンテストボタン</button> */}
                </div>
            </div>
            <div className="hyoji">
                <div className="players">
                    {copyMember.map((member, ind) => (
                        <div className="school">
                            <button
                                onClick={() => handleSelected(ind)}
                                className={"InputMember" + selectedMember[ind]}
                            >
                                <div className="selectName">
                                    <div> &nbsp;&nbsp;{member.grade}年</div><div className="playerName">&nbsp;&nbsp;&nbsp;&nbsp;{member.player_name_kanji}（ {member.player_name_hira}）</div>
                                </div>
                                {/* &nbsp; 背番号{member.uniform_number}  */}
                                <div className="Dominant">&nbsp; {member.handed_hit}打 &nbsp; {member.handed_throw}投</div>
                            
                            </button>
                    
                            <div className="selectdiv">
                                背番号<br />
                                {makePulldownBN(ind, uniformNumberArray, setUniformNumberArray)}
                            </div>
                            <br /><br />
                        </div>
                        
                    ))}
                </div>
            </div>
            <div className="sendButtonArea">
                {<button
                    onClick={() => {
                        handleSousin(copyMember, selectedMember, urlTournamentId, uniformNumberArray)
                    }}
                    className="sendButton"
                    >登録
                </button>}       
            </div>
        </>
    )
}

export default InputMember