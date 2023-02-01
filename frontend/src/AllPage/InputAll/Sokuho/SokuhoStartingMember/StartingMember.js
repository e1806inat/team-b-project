import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { TitleBar } from "../../../OtherPage/TitleBar/TitleBar";
import { MenuBar } from "../../../OtherPage/optionFunc/MenuBar"

//バックエンドのurlを取得
const backendUrl = require("../../../../DB/communication").backendUrl;

const { Member } = require("../../../../DB/Member");
const { PositionDB } = require("../../../../DB/Position9DB")


const tableStyle = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    textAlign: 'center'
}

const tdStyle = {
    border: '1px solid #85C1E9',
    background: 'white',
    padding: '5px'
};

const thStyle = {
    border: '1px solid #3498DB',
    background: '#3498DB',
    color: 'white'
};

const thStyle2 = {
    border: '1px solid #FF3347',
    background: '#FF3347',
    color: 'white'
};

const tdStyle2 = {
    border: '1px solid #FF99a3',
    background: 'white',
    padding: '5px'
};


//選手を読み込む
const loadRegisteredMember = (urlTournamentId, urlSchoolId, setRegisteredMember, isEmptyFlag, setIsEmptyFlag) => {
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
            if (data.length !== 0) { setIsEmptyFlag(!isEmptyFlag) }
            setRegisteredMember(data)
        })
}



//自作プルダウン
const makePulldown = (pulldownId, ArrayList, idText, nowSelected, setNowSelected, isInitial1, setIsInitial1) => {
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

                    let array2 = isInitial1.slice(0, isInitial1.length);
                    array2[pulldownId] = false
                    setIsInitial1(array2)


                }}>
                <option hidden>選択してください</option>
                {ArrayList.map((component, ind) => (
                    <option value={ind}>{component[idText]}</option>
                ))
                }
            </select>
        </>

    )
}

const tyouhuku = (nowSelected, urlSchoolName, nowSelected2, urlSchoolName2) => {
    //守備位置重複確認
    let error = 0;
    for (let i = 0; i <= 8; i++) {
        for (let j = i + 1; j <= 8; j++) {
            if (nowSelected[i] === nowSelected[j]) {
                alert(urlSchoolName + "の" + (i + 1) + "番打者と" + (j + 1) + "番打者の守備位置が重複しています")
                error++;
                break;
            }
            if (nowSelected2[i] === nowSelected2[j]) {
                alert(urlSchoolName2 + "の" + (i + 1) + "番打者と" + (j + 1) + "番打者の守備位置が重複しています")
                error++;
                break;
            }
        }
        if (error > 0) {
            error = 0;
            break;
        }
    }
    //選手氏名重複確認
    for (let i = 9; i <= 17; i++) {
        for (let j = i + 1; j <= 17; j++) {
            if (nowSelected[i] === nowSelected[j]) {
                alert(urlSchoolName + "の" + (i - 8) + "番打者と" + (j - 8) + "番打者の選手氏名が重複しています")
                error++;
                break;
            }
            if (nowSelected2[i] === nowSelected2[j]) {
                alert(urlSchoolName2 + "の" + (i - 8) + "番打者と" + (j - 8) + "番打者の選手氏名が重複しています")
                error++;
                break;
            }
        }
        if (error > 0) {
            error = 0;
            break;
        }
    }
}


// 選んだ選手情報を送信する
const sendSelectedMember = async (
    nowSelected,
    PositionDB,
    registeredMember,
    urlGameId,
    urlSchoolId,
    setRegisteredSM,
    loadStartingMember
) => {

    let returnValue = 1
    let toSendArray = await []

    for (let i = 0; i < 9; i++) {
        toSendArray = await [...toSendArray, {}]
    }

    for (let i = 0; i < 9; i++) {
        toSendArray[i].game_id = await urlGameId
        toSendArray[i].school_id = await urlSchoolId
        toSendArray[i].position = await PositionDB[nowSelected[i]].kata
        toSendArray[i].player_id = await registeredMember[nowSelected[i + 9]].player_id
        toSendArray[i].uniform_number = await registeredMember[nowSelected[i + 9]].uniform_number
        toSendArray[i].grade = await registeredMember[nowSelected[i + 9]].grade
        toSendArray[i].handed_hit = await registeredMember[nowSelected[i + 9]].handed_hit
        toSendArray[i].handed_throw = await registeredMember[nowSelected[i + 9]].handed_throw
        toSendArray[i].batting_order = await i + 1
        toSendArray[i].BA = await registeredMember[nowSelected[i + 9]].BA
    }
    await console.log(toSendArray)

    await deleteStartingMember(urlGameId, urlSchoolId)

    const fetch1 = await fetch(backendUrl + "/member/starting_member_register", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json", }, body: JSON.stringify(toSendArray),
    })
    const fetch1Result = await fetch1.text()
    await loadStartingMember(urlGameId, urlSchoolId, setRegisteredSM)

    return returnValue
}


//　今のスターティングメンバーを読み込む
const loadStartingMember = (game_id, school_id, setRegisteredSM) => {
    fetch(backendUrl + "/member/starting_member_call", {
        method: "POST", mode: "cors",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ game_id: game_id, school_id: school_id }),
    })
        .then((response) => response.json())
        .then((data) => {
            data.sort((a, b) => a.batting_order - b.batting_order)
            setRegisteredSM(data);
        })
}

//  スターティングメンバーを削除
const deleteStartingMember = async (game_id, school_id) => {
    await fetch(backendUrl + "/member/starting_member_delete_batch", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: game_id, school_id: school_id }),
    })
        .then((response) => response.text())
        .then((data) => { console.log(data) })
}



// 被りチェック
const isDuplicate = (nowSelected) => {
    let TorF = false

    let positionNo = nowSelected.slice(0, 9)
    let MemberNo = nowSelected.slice(9, 18)

    positionNo.map((v, ind1) => {
        positionNo.map((u, ind2) => {
            if (ind1 !== ind2) {
                if (v === u) {
                    TorF = true
                }
            }
        })
    })

    MemberNo.map((v, ind1) => {
        MemberNo.map((u, ind2) => {
            if (ind1 !== ind2) {
                if (v === u) {
                    TorF = true
                }
            }
        })
    })

    return TorF
}


const StartingMember = () => {

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    //プルダウンのための初期値作成
    let initialPulldown = []
    let initialTorF = []
    for (let i = 0; i < 18; i++) {
        initialPulldown = [...initialPulldown, "0"]
        initialTorF = [...initialTorF, true]
    }

    //今選択しているものの内容を監視
    const [nowSelected, setNowSelected] = useState(initialPulldown) //チーム1
    const [nowSelected2, setNowSelected2] = useState(initialPulldown) //チーム2

    //プルダウンで今初期値かどうかを監視
    const [isInitial1, setIsInitial1] = useState(initialTorF)
    const [isInitial2, setIsInitial2] = useState(initialTorF)

    //受け取った配列が空でないかを監視
    const [isEmptyFlag, setIsEmptyFlag] = useState(false)

    //既に登録されている先行チームの選手情報を管理するステイト
    const [registeredSM1, setRegisteredSM1] = useState([])

    //既に登録されている後攻チームの選手情報を管理するステイト
    const [registeredSM2, setRegisteredSM2] = useState([])

    //データを再読み込みするためのステイト
    const [useEffectFlag, setUseEffectFlag] = useState(false)


    //map関数を使うための空配列作成
    let enptyArray = []
    for (let i = 0; i < 9; i++) {
        enptyArray = [...enptyArray, 0]
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

    //表示するメンバーのステイトのための初期値、これがないと最初にエラーが出る
    const initialComponent = [{
        BA: 0.5,
        grade: 3,
        handed_hit: "右",
        handed_throw: "右",
        player_id: 2,
        player_name_hira: "",
        player_name_kanji: "",
        school_id: 1,
        tournament_id: 1,
        uniform_number: 1
    }]

    //表示するメンバーのステイト定義
    const [registeredMember1, setRegisteredMember1] = useState(initialComponent)
    const [registeredMember2, setRegisteredMember2] = useState(initialComponent)

    useEffect(() => {
        loadRegisteredMember(urlTournamentId, urlSchoolId, setRegisteredMember1, isEmptyFlag, setIsEmptyFlag)
        loadRegisteredMember(urlTournamentId, urlSchoolId2, setRegisteredMember2, isEmptyFlag, setIsEmptyFlag)
    }, [])

    useEffect(() => {
        // console.log(loadStartingMemberAsync(urlGameId, urlSchoolId))
        loadStartingMember(urlGameId, urlSchoolId, setRegisteredSM1)
        loadStartingMember(urlGameId, urlSchoolId2, setRegisteredSM2)
    }, [useEffectFlag])

    return (
        <div align='center'>
            <TitleBar
                TitleText={"スタメン選択画面"}
                PageTransition={PageTransition}
                valueUrl={-1}
            />
            <MenuBar
                menuArray={[
                    {
                        text: "InputMember",
                        urlTournamentId: urlTournamentId,
                        urlTournamentName: urlTournamentName,
                        urlSchoolName: urlSchoolName,
                        urlSchoolName2: urlSchoolName2,
                        urlSchoolId: urlSchoolId,
                        urlSchoolId2: urlSchoolId2
                    },
                    {
                        text: "InputSchool",
                        urlTournamentId: urlTournamentId,
                        urlTournamentName: urlTournamentName
                    }
                ]}
            />
            <h3>編集中：{urlTournamentName}</h3>
            <div id="error"></div>
            <table style={tableStyle}>
                <tbody>
                    <tr><th colSpan={5}><font size="+2">{urlSchoolName}　</font></th></tr>
                    <tr>
                        <th style={thStyle} rowspan="2">打順</th>
                        <th style={thStyle} rowspan="2">位置</th>
                        <th style={thStyle}>ふりがな</th>
                        <th style={thStyle} rowspan="2">背番号</th>
                        <th style={thStyle} rowspan="2">学年</th>
                        <th style={thStyle} rowspan="2">既登録の選手情報</th>
                    </tr>
                    <tr><th style={thStyle}>選手氏名</th></tr>

                    {registeredMember1.length === 0 &&
                        <div>選手が登録されていません</div>
                    }

                    {registeredMember1.length !== 0 && enptyArray.map((component, ind) => (
                        <>
                            <tr>
                                <td style={tdStyle} rowspan="2">{ind + 1}</td>
                                <td style={tdStyle} rowspan="2">

                                    {makePulldown(ind, PositionDB, "kata", nowSelected, setNowSelected, isInitial1, setIsInitial1)}
                                </td>
                                <td style={tdStyle}><div id="player_name_hira1">
                                    {!isInitial1[ind + 9] && registeredMember1[nowSelected[ind + 9]].player_name_hira}
                                    {isInitial1[ind + 9] && "　"}
                                </div></td>
                                <td style={tdStyle} rowspan="2"><div id="uniform_number1">
                                    {!isInitial1[ind + 9] && registeredMember1[nowSelected[ind + 9]].uniform_number}
                                    {isInitial1[ind + 9] && "　"}
                                    </div></td>
                                <td style={tdStyle} rowspan="2"><div id="grade1">
                                    {!isInitial1[ind + 9] && registeredMember1[nowSelected[ind + 9]].grade}
                                    {isInitial1[ind + 9] && "　"}
                                    </div></td>
                                <td style={tdStyle} rowspan="2">
                                    {/* 既登録の選手情報 */}
                                    <div >
                                        {(registeredSM1 !== undefined) &&
                                            registeredSM1.some((v) => v.batting_order === ind + 1) &&
                                            registeredSM1.find((v) => v.batting_order === ind + 1).position
                                        }
                                    </div>
                                    <div>
                                        {(registeredSM1 !== undefined) &&
                                            registeredSM1.some((v) => v.batting_order === ind + 1) &&
                                            registeredSM1.find((v) => v.batting_order === ind + 1).player_name_kanji
                                        }
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={tdStyle}>
                                    {makePulldown(ind + 9, registeredMember1, "player_name_kanji", nowSelected, setNowSelected, isInitial1, setIsInitial1)}
                                </td>
                            </tr>
                        </>
                    ))
                    }

                </tbody>
            </table><br />


            <table style={tableStyle}>
                <tbody>
                    <tr><th colSpan={5}><font size="+2">{urlSchoolName2}　</font></th></tr>
                    <tr>
                        <th style={thStyle2} rowspan="2">打順</th>
                        <th style={thStyle2} rowspan="2">位置</th>
                        <th style={thStyle2}>ふりがな</th>
                        <th style={thStyle2} rowspan="2">背番号</th>
                        <th style={thStyle2} rowspan="2">学年</th>
                        <th style={thStyle2} rowspan="2">既登録の選手情報</th>
                    </tr>
                    <tr><th style={thStyle2}>選手氏名</th></tr>

                    {registeredMember2.length === 0 &&
                        <div>選手が登録されていません</div>
                    }
                    {registeredMember2.length !== 0 && enptyArray.map((component, ind) => (
                        <>
                            <tr>
                                <td style={tdStyle2} rowspan="2">{ind + 1}</td>
                                <td style={tdStyle2} rowspan="2">

                                    {makePulldown(ind, PositionDB, "kata", nowSelected2, setNowSelected2, isInitial2, setIsInitial2)}
                                </td>
                                <td style={tdStyle2}><div id="player_name_hira1">
                                    {!isInitial2[ind + 9] && registeredMember2[nowSelected2[ind + 9]].player_name_hira}
                                    {isInitial2[ind + 9] && "　"}
                                </div></td>
                                <td style={tdStyle2} rowspan="2"><div id="uniform_number1">
                                    {!isInitial2[ind + 9] && registeredMember2[nowSelected2[ind + 9]].uniform_number}
                                    {isInitial2[ind + 9] && "　"}
                                </div></td>
                                <td style={tdStyle2} rowspan="2"><div id="grade1">
                                    {!isInitial2[ind + 9] && registeredMember2[nowSelected2[ind + 9]].grade}
                                    {isInitial2[ind + 9] && "　"}
                                </div></td>
                                <td style={tdStyle2} rowspan="2">

                                    {/* 既登録の選手情報 */}
                                    <div id="regiSM2">
                                        {(registeredSM2 !== undefined) &&
                                            registeredSM2.some((v) => v.batting_order === ind + 1) &&
                                            registeredSM2.find((v) => v.batting_order === ind + 1).position
                                        }
                                    </div>
                                    <div>
                                        {(registeredSM2 !== undefined) &&
                                            registeredSM2.some((v) => v.batting_order === ind + 1) &&
                                            registeredSM2.find((v) => v.batting_order === ind + 1).player_name_kanji
                                        }
                                    </div>
                                </td>

                            </tr>
                            <tr>
                                <td style={tdStyle2}>
                                    {makePulldown(ind + 9, registeredMember2, "player_name_kanji", nowSelected2, setNowSelected2, isInitial2, setIsInitial2)}
                                </td>
                            </tr>
                        </>
                    ))
                    }

                </tbody>
            </table><br />


            {!isDuplicate(nowSelected) &&
                <button onClick={async () => {

                    var a = await sendSelectedMember(
                        nowSelected,
                        PositionDB,
                        registeredMember1,
                        urlGameId,
                        urlSchoolId,
                        setRegisteredSM1,
                        loadStartingMember
                    )

                    var b = await sendSelectedMember(
                        nowSelected2,
                        PositionDB,
                        registeredMember2,
                        urlGameId,
                        urlSchoolId2,
                        setRegisteredSM2,
                        loadStartingMember
                    )
                    // .then(setUseEffectFlag(!useEffectFlag))
                    if (a + b === 2) {
                        setUseEffectFlag(a + b)
                    }

                }}>登録</button>
            }

            {isDuplicate(nowSelected) &&
                <button onClick={() => {
                    tyouhuku(
                        nowSelected,
                        urlSchoolName,
                        nowSelected2,
                        urlSchoolName2
                    )
                }}>登録</button>
            }

            {/* ページ遷移ボタン */}
            {
                (registeredSM1 !== undefined) &&
                registeredSM1.length >= 9 &&
                (registeredSM2 !== undefined) &&
                registeredSM2.length >= 9 &&
                <button onClick={() => PageTransition(
                    "SokuhoGameStart?urlTournamentId=" +
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
                )}>速報ページに移動する</button>
            }
            <br /><br />
        </div>
    );
};

export default StartingMember