import React, { useState, useEffect, useRef } from "react"
import { useSearchParams, useNavigate } from "react-router-dom";
import { myIndexOf } from "./functions/myIndexOf";
import "./InputMember.css"
import MemberPopup from "./functions/MemberPopup/MemberPopup"

import { TitleBar } from "../../../OtherPage/TitleBar/TitleBar";
import { OptionButton } from "../../../OtherPage/optionFunc/OptionButton"

//バックエンドのurlを取得
const backendUrl = require("../../../../DB/communication").backendUrl;


const loadMember = (uniformNumberArray, setUniformNumberArray, urlTournamentId, urlSchoolId, setCopyMember, selectedMember, setSelectedMember, isInitial, setRegisteredMembers) => {
    //高校に所属する3年生以下の人間を全員呼び出す
    fetch(backendUrl + "/member/member_call", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ school_id: urlSchoolId }),
    })
        .then((response) => response.json())
        .then((allUnder3MemberData) => {
            setCopyMember(allUnder3MemberData);
            console.log(allUnder3MemberData)

            //初回レンダリング時のみ実行
            if (isInitial === true) {
                //既に選手登録されている人間を読み出す
                fetch(backendUrl + "/member/tournament_member_call", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ tournament_id: urlTournamentId, school_id: urlSchoolId }),
                })
                    .then((response) => response.json())
                    .then((selectedMembersData) => {
                        setRegisteredMembers(selectedMembersData)

                        let tempSelectedMember = []
                        let tempUniformNumber = []


                        console.log(selectedMembersData)

                        if (allUnder3MemberData.length !== 0) {
                            allUnder3MemberData.map((allUnder3Member, index) => {

                                tempSelectedMember = [...tempSelectedMember, false]
                                tempUniformNumber = [...tempUniformNumber, 1]

                                for (let i = 0; i < selectedMembersData.length; i++) {
                                    if (selectedMembersData[i].player_id === allUnder3Member.player_id) {
                                        tempSelectedMember[index] = true
                                    }
                                }

                                let i = selectedMembersData.findIndex((v)=> v.player_id === allUnder3Member.player_id)
                                if(i!==-1){
                                tempUniformNumber[tempUniformNumber.length-1] = selectedMembersData[i].uniform_number
                                }
                            })
                        }



                        setCheck(allUnder3MemberData, tempSelectedMember, setSelectedMember);
                        tempUniformNumber = tempUniformNumber.slice(0, tempUniformNumber.length)
                        setUniformNumberArray(tempUniformNumber)

                    })
            }

            else {
                setCheck(allUnder3MemberData, selectedMember, setSelectedMember)
            }

            if (uniformNumberArray[0] == null) {
                let Array = [1];
                for (let i = 1; i < allUnder3MemberData.length; i++) {
                    Array = [...Array, 1]
                }
                uniformNumberArray = Array
                console.log("aaaaa")
                setUniformNumberArray(uniformNumberArray)
            }

        })
}



const { Schools } = require("../../../../DB/Schools"); //分割代入
//const { Member } = require("../../../../DB/Member")
const Member = [{}]

const setCheck = (copyMember, selectedMember, setSelectedMember) => {
    let copyArray = []
    const beforeChecked = selectedMember

    for (let i = 0; i < copyMember.length; i++) {
        copyArray = [...copyArray, false]
    }

    if (beforeChecked.length !== 0) {
        for (let i = 0; i < beforeChecked.length; i++) {
            copyArray[i] = beforeChecked[i]
        }
    }

    setSelectedMember(copyArray)
}

//背番号
const setBacknumber = (copyMember, setCopyMember) => {
    for (let i = 0; i < copyMember.length; i++) {
        copyMember[i].uniform_number = 1
    }
    setCopyMember(copyMember)

}

const makePulldownBN = (ind, uniformNumberArray, setUniformNumberArray) => {

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
                    let copyUniformNumberArray = uniformNumberArray
                    copyUniformNumberArray = copyUniformNumberArray.slice(0, copyUniformNumberArray.length)
                    copyUniformNumberArray[ind] = e.target.value
                    setUniformNumberArray(copyUniformNumberArray)
                }}>
                <option value={0}>背番号を変更する</option>
                {nullArray.map((component, ind) => (
                    <option value={ind + 1}>{ind + 1}</option>
                ))
                }
            </select>
        </>
    )
}

const handleSousin = (copyMember, selectedMember, urlTournamentId, uniformNumberArray, registeredMembers) => {

    let sendArray = copyMember


    for (let i = 0; i < sendArray.length; i++) {
        delete sendArray[i].hit_num
        delete sendArray[i].bat_num
        sendArray[i].tournament_id = urlTournamentId
        sendArray[i].uniform_number = uniformNumberArray[i]

    }

    //選択したものだけの配列を作る
    let sendArray2 = []
    sendArray.map((component, ind) => {
        if (selectedMember[ind] === true) sendArray2 = [...sendArray2, sendArray[ind]]
    })

    //選択されたものから、既に登録されている人間を除いた配列を作る、登録されているやつを全員消すなら問題なし
    // let sendArray3 = []
    // sendArray2.map((v) => {
    //     if (registeredMembers.some((u) => u.player_name_kanji === v.player_name_kanji)) { }
    //     else {
    //         sendArray3 = [...sendArray3, v]
    //     }
    // })

    // console.log(sendArray3)

    console.log(registeredMembers)
    console.log(sendArray2)
    registeredMembers.map((v)=> {
        fetch(backendUrl + "/member/tournament_member_delete", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tournament_id:urlTournamentId, player_id:v.player_id }),
        })
    
    })


//バックエンドに送信
    fetch(backendUrl + "/member/tournament_member_register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sendArray2),
    })
}

const lordRegisteredMember = (urlTournamentId, urlSchoolId) => {
    fetch(backendUrl + "/member/tournament_member_call", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournament_id: urlTournamentId, school_id: urlSchoolId }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
}


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

//選択している数を表示
const cntSelectedMemberNum = (selectedMember) => {
    let cnt = 0
    selectedMember.map((v) => {
        if (v) cnt++
    })
    return cnt
}





export const InputMember = () => {

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }


    const ining = 1;
    const number = 1;

    const iningRef = useRef(null)
    const numberRef = useRef(null)

    //名前を管理するステイト
    const [nameKanji, setNameKanji] = useState({ famiryName: "", firstName: "" })
    const [nameHira, setNameHira] = useState({ famiryName: "", firstName: "" })

    const [iningState, setIningState] = useState(ining)
    const [schoolState, setSchoolState] = useState(1)
    const [numberState, setNumberState] = useState(1)

    const [handedHitState, setHandedHitState] = useState("左")
    const [handedThrowState, setHandedThrowState] = useState("左")

    //既に選手登録されている選手を管理するステイト
    const [registeredMembers, setRegisteredMembers] = useState([])

    //数を監視するステイト
    let selectedMemberNum = 0

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
        console.log(selectedMember[ind])
        if (cntSelectedMemberNum(selectedMember) >= 20 && selectedMember[ind] === false) {}
        else{
            copyArray = selectedMember.slice(0, selectedMember.length); // stateの配列をコピー(値渡し)
            copyArray[ind] = !copyArray[ind]
            setSelectedMember(copyArray)
        }
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
        loadMember(uniformNumberArray,
            setUniformNumberArray,
            urlTournamentId,
            urlSchoolId,
            setCopyMember,
            selectedMember,
            setSelectedMember,
            true,
            setRegisteredMembers)
        //明日のメモ
        //選手を追加すると、ロードしなおすため背番号が消えてしまう。
        //だから、copymemberとは別の配列を用意してそこに記録する
        //選手を追加する場合は下から出てくる
        //あと選手の送信も訂正すること
        lordRegisteredMember(urlTournamentId, urlSchoolId)
    }, [])






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




    const handleMembers = (uniformNumberArray, setUniformNumberArray, nameKanji, nameHira) => {
        let Array = [{
            "school_id": urlSchoolId,
            "player_name_kanji": nameKanji.famiryName + "　" + nameKanji.firstName,
            "player_name_hira": nameHira.famiryName + "　" + nameHira.firstName,
            "uniform_number": numberRef.current.value,
            "grade": iningRef.current.value,
            "handed_hit": handedHitState,
            "handed_throw": handedThrowState,
            "BA": 0,
            "bat_num": 0,
            "hit_num": 0
        }]


        if (copyMember.some((u) => u.player_name_kanji === Array[0].player_name_kanji) &&
            copyMember.some((u) => u.player_name_hira === Array[0].player_name_hira)
        ) {
            console.log("out")
        }
        else {
            console.log("safe")
            fetch("http://localhost:5000/member/member_register", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Array),
            })
                .then((response) => response.text())
                .then((data) => {
                    if (data === "OK") {
                        //背番号の取得
                        let copyUniformNumberArray = uniformNumberArray
                        copyUniformNumberArray = copyUniformNumberArray.slice(0, copyUniformNumberArray.length)
                        console.log(numberRef.current.value)
                        setUniformNumberArray([...copyUniformNumberArray, numberRef.current.value])
                        console.log([...uniformNumberArray, numberRef.current.value])
                        loadMember(uniformNumberArray, setUniformNumberArray, urlTournamentId, urlSchoolId, setCopyMember, selectedMember, setSelectedMember, false)
                    }
                })
        }


    }


    return (
        <>
            <TitleBar
                TitleText={"選手登録画面"}
                PageTransition={PageTransition}
                valueUrl={-1}
            />
            <OptionButton />


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

                        氏（漢字）　　<input onChange={(e) => setNameKanji({ famiryName: e.target.value, firstName: nameKanji.firstName })} ></input>
                        名（漢字）　　<input onChange={(e) => setNameKanji({ famiryName: nameKanji.famiryName, firstName: e.target.value })} ></input>


                        <br />
                        氏（ひらがな）<input onChange={(e) => setNameHira({ famiryName: e.target.value, firstName: nameHira.firstName })}></input>
                        名（ひらがな）<input onChange={(e) => setNameHira({ famiryName: nameHira.famiryName, firstName: e.target.value })}></input>
                    </div>

                    <div className="selectDominant">
                        <div>{selectHitted(handedHitState, handleHandedHit)}</div>
                        <div>{selectThrowed(handedThrowState, handleHandedThrow)}</div>
                    </div>

                    <br />
                    <button
                        className="addButton"
                        onClick={() => handleMembers(uniformNumberArray, setUniformNumberArray, nameKanji, nameHira)}
                    >追加</button>
                    {
                        // () => {
                        //     selectedMember.map((v) => {
                        //         if (v) selectedMemberNum = selectedMemberNum + 1
                        //         console.log(selectedMemberNum)
                        //     })
                        //     return(<a>{selectedMemberNum}</a>)

                        // }
                        cntSelectedMemberNum(selectedMember)
                    }

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
                                <div className="Dominant">&nbsp; {member.handed_hit}打 &nbsp; {member.handed_throw}投 &nbsp; 背番号:{uniformNumberArray[ind]}</div>

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
                {/* {<button
                    onClick={() => {
                        handleSousin(copyMember, selectedMember, urlTournamentId, uniformNumberArray)
                    }}
                    className="sendButton"
                    >登録
                </button>} */}
                <MemberPopup
                    handleSousin={handleSousin}
                    copyMember={copyMember}
                    selectedMember={selectedMember}
                    urlTournamentId={urlTournamentId}
                    uniformNumberArray={uniformNumberArray}
                    PageTransition={PageTransition}
                    registeredMembers={registeredMembers}
                />
            </div>
        </>
    )
}

export default InputMember