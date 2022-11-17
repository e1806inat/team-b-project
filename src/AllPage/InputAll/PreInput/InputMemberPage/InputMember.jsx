import React, { useState, useEffect, useRef } from "react"
import { myIndexOf } from "./functions/myIndexOf";
import "./InputMember.css"
const { Schools } = require("../../../../DB/Schools"); //分割代入
//const { Member } = require("../../../../DB/Member")
const Member = [{}]


const selectHitted = (handedHitState, handleHandedHit) => {
    if (handedHitState === "左") {
        return (
            <>
                <button style={{ color: "white", background: "lightskyblue" }}>左打</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedHit("右")}>右打</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedHit("両")}>両打</button>
            </>
        )
    }
    else if (handedHitState === "右") {
        return (
            <>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedHit("左")}>左打</button>
                <button style={{ color: "white", background: "lightskyblue" }}>右打</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedHit("両")}>両打</button>
            </>
        )
    }
    else if (handedHitState === "両") {
        return (
            <>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedHit("左")}>左打</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedHit("右")}>右打</button>
                <button style={{ color: "white", background: "lightskyblue" }}>両打</button>
            </>
        )
    }
}

const selectThrowed = (handedThrowState, handleHandedThrow) => {
    if (handedThrowState === "左") {
        return (
            <>
                <button style={{ color: "white", background: "lightskyblue" }}>左投</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedThrow("右")}>右投</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedThrow("両")}>両投</button>
            </>
        )
    }
    else if (handedThrowState === "右") {
        return (
            <>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedThrow("左")}>左投</button>
                <button style={{ color: "white", background: "lightskyblue" }}>右打</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedThrow("両")}>両投</button>
            </>
        )
    }
    else if (handedThrowState === "両") {
        return (
            <>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedThrow("左")}>左投</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedThrow("右")}>右投</button>
                <button style={{ color: "white", background: "lightskyblue" }}>両打</button>
            </>
        )
    }
}


export const InputMember = () => {
    const ining = 1;
    const number = 1;

    const iningRef = useRef(null)
    const schoolRef = useRef(null)
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

    const setCheck = () => {
        for (let i = 0; i < copyArray.length - 1; i++) {
            copyArray = [...copyArray, false]
        }
    }



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
        console.log(Member[0].player_name_kanji)
    }

    const initialSetNumber = () => {
        for (let i = 1; i <= 50; i++) {
            const option = document.createElement('option')
            option.value = i;
            option.text = i;
            numberRef.current.appendChild(option)
        }
    }



    const initialSetSchool = () => {
        for (let i = 1; i <= Schools.length; i++) {
            const option = document.createElement('option')
            option.value = Schools[i - 1].school
            option.text = Schools[i - 1].school
            schoolRef.current.appendChild(option)
        }
    }


    useEffect(() => {
        initialSetIning();
        initialSetNumber();
        initialSetSchool();
        loadMember();
    }, [])



    const loadMember = () => {

        fetch("http://localhost:5000/member/member_call", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ school_id: 1 }),
        })
            .then((response) => response.json())
            .then((data) => handleSendedMember(data))
    }

    const handleSendedMember = (data) => {
        console.log(data)
        setCopyMember(data)
        setCheck()
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


    const handleSousin = () => {
        fetch("http://localhost:5000/member/member_register", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            //body: JSON.stringify({ email:login_id , password:login_ps }),
            body: JSON.stringify(Member),
        })
    }

    const handleMembers = () => {

        setCopyMember([{
            "game_id": 1,
            "school_id": 1,
            "player_name_kanji": nameKanjiRef.current.value,
            "player_name_hira": nameHiraRef.current.value,
            "uniform_number": numberRef.current.value,
            "grade": iningRef.current.value,
            "handed_hit": handedHitState,
            "handed_throw": handedThrowState
        }, ...copyMember])
        console.log(copyMember)
    }


    return (
        <>
            <h1>選手登録画面{<button onClick={handleSousin}>送信</button>}</h1>

            <div className="toroku">
                <div className="MakeGame">
                    <select ref={schoolRef} value={schoolState} onChange={selectSchool} ></select>
                    <br />
                    学年<select ref={iningRef} value={iningState} onChange={selectIning} ></select>&nbsp;
                    背番号<select ref={numberRef} value={numberState} onChange={selectNumber} ></select>&nbsp;&nbsp;

                    {selectHitted(handedHitState, handleHandedHit)}

                    <br />

                    名前（漢字）　<input ref={nameKanjiRef} ></input>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    {selectThrowed(handedThrowState, handleHandedThrow)}

                    <br />

                    名前（ひらがな）　<input ref={nameHiraRef}></input> &nbsp; &nbsp; <button onClick={handleMembers}>追加</button>
                </div>
                <hr></hr>
            </div>
            <div className="hyoji">
                <div className="players">
                    {copyMember.map((member, ind) => (
                        <div className="school">
                            <button onClick={() => handleSelected(ind)} className={"InputMember" + selectedMember[ind]}>
                                {member.player_name_hira} &nbsp; {member.grade}年 &nbsp;
                                {/* &nbsp; 背番号{member.uniform_number}  */}
                                &nbsp; {member.handed_hit}打 &nbsp; {member.handed_throw}投
                                <hr></hr>{member.player_name_kanji}
                            </button><br /><br />
                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}

export default InputMember