import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const { Member } = require("../../../../DB/Member");
const { PositionDB } = require("../../../../DB/Position9DB")

const tableStyle = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    textAlign: 'center',
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
    fetch("http://localhost:5000/member/tournament_member_call", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournament_id: urlTournamentId, school_id: urlSchoolId }),
    })
        .then((response) => response.json())
        .then((data) => {
            //console.log(data)
            if (data.length !== 0) { setIsEmptyFlag(!isEmptyFlag) }
            setRegisteredMember(data)
        })
}



//自作プルダウン
const makePulldown = (pulldownId, ArrayList, idText, nowSelected, setNowSelected) => {
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
                }}>
                {ArrayList.map((component, ind) => (
                    <option value={ind}>{component[idText]}</option>
                ))
                }
            </select>
        </>

    )
}

const tyouhuku = (nowSelected,urlSchoolName,nowSelected2,urlSchoolName2) => {
    //守備位置重複確認
    for(let i=0; i<=8; i++){
      for(let j=i+1; j<=8; j++){
        if(nowSelected[i] === nowSelected[j]){
          alert(urlSchoolName+"の"+(i+1)+ "番打者と" + (j+1) + "番打者の守備位置が重複しています")
          break;
        }
        if(nowSelected2[i] === nowSelected2[j]){
          alert(urlSchoolName2+"の"+(i+1)+ "番打者と" + (j+1) + "番打者の守備位置が重複しています")
          break;
        }
      }
    }
    //選手氏名重複確認
    for(let i=9; i<=17; i++){
      for(let j=i+1; j<=17; j++){
        if(nowSelected[i] === nowSelected[j]){
          alert(urlSchoolName + "の"+(i-8)+ "番打者と" + (j-8) + "番打者の選手氏名が重複しています")
          break;
        }
        if(nowSelected2[i] === nowSelected2[j]){
            alert(urlSchoolName2 + "の"+(i-8)+ "番打者と" + (j-8) + "番打者の選手氏名が重複しています")
            break;
          }
      }
    }
  }
  

const sendSelectedMember = (
    nowSelected,
    PositionDB,
    registeredMember1,
    urlGameId,
    urlSchoolId
) => {

    let toSendArray = []

    for (let i = 0; i < 9; i++) {
        toSendArray = [...toSendArray, {}]
    }

    for (let i = 0; i < 9; i++) {
        toSendArray[i].game_id = urlGameId
        toSendArray[i].school_id = urlSchoolId
        toSendArray[i].position = PositionDB[nowSelected[i]].kata
        toSendArray[i].player_id = registeredMember1[nowSelected[i + 9]].player_id
        toSendArray[i].uniform_number = registeredMember1[nowSelected[i + 9]].uniform_number
        toSendArray[i].grade = registeredMember1[nowSelected[i + 9]].grade
        toSendArray[i].handed_hit = registeredMember1[nowSelected[i + 9]].handed_hit
        toSendArray[i].handed_throw = registeredMember1[nowSelected[i + 9]].handed_throw
        toSendArray[i].batting_order = i + 1
        toSendArray[i].BA = registeredMember1[nowSelected[i + 9]].BA
    }

    //console.log(toSendArray)


    fetch("http://localhost:5000/member/starting_member_register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(toSendArray),
    })
        .then((response) => response.text())
        .then((data) => (data))
}


const StartingMember = () => {

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    //プルダウンのための初期値作成
    let initialPulldown = []
    for (let i = 0; i < 18; i++) {
        initialPulldown = [...initialPulldown, 0]
    }

    //今選択しているものの内容を監視
    const [nowSelected, setNowSelected] = useState(initialPulldown) //チーム1
    const [nowSelected2, setNowSelected2] = useState(initialPulldown) //チーム2

    //受け取った配列が空でないかを監視
    const [isEmptyFlag, setIsEmptyFlag] = useState(false)



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
        player_name_hira: "はしば ひでよし",
        player_name_kanji: "羽柴 秀吉",
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

    return (
        <div align='center'>
            <h2>スタメン選択画面</h2>
            <h3>編集中：{urlTournamentName}</h3>
            <div id="error"></div>
            <table style={tableStyle}>
                <tbody>
                <tr><th>{urlSchoolName}</th></tr>
                    <tr>
                        <th style={thStyle} rowspan="2">打順</th>
                        <th style={thStyle} rowspan="2">位置</th>
                        <th style={thStyle}>ふりがな</th>
                        <th style={thStyle} rowspan="2">背番号</th>
                        <th style={thStyle} rowspan="2">学年</th>
                    </tr>
                    <tr><th style={thStyle}>選手氏名</th></tr>

                    {registeredMember1.length !== 0 && enptyArray.map((component, ind) => (
                        <>
                            <tr>
                                <td style={tdStyle} rowspan="2">{ind + 1}</td>
                                <td style={tdStyle} rowspan="2">

                                    {makePulldown(ind, PositionDB, "kata", nowSelected, setNowSelected)}
                                </td>
                                <td style={tdStyle}><div id="player_name_hira1">{registeredMember1[nowSelected[ind + 9]].player_name_hira}</div></td>
                                <td style={tdStyle} rowspan="2"><div id="uniform_number1">{registeredMember1[nowSelected[ind + 9]].uniform_number}</div></td>
                                <td style={tdStyle} rowspan="2"><div id="grade1">{registeredMember1[nowSelected[ind + 9]].grade}</div></td>
                            </tr>
                            <tr>
                                <td style={tdStyle}>
                                    {makePulldown(ind + 9, registeredMember1, "player_name_kanji", nowSelected, setNowSelected)}
                                </td>
                            </tr>
                        </>
                    ))
                    }

                </tbody>
            </table><br />

            <table style={tableStyle}>
                <tbody>
                <tr><th>{urlSchoolName2}</th></tr>
                    <tr>
                        <th style={thStyle2} rowspan="2">打順</th>
                        <th style={thStyle2} rowspan="2">位置</th>
                        <th style={thStyle2}>ふりがな</th>
                        <th style={thStyle2} rowspan="2">背番号</th>
                        <th style={thStyle2} rowspan="2">学年</th>
                    </tr>
                    <tr><th style={thStyle2}>選手氏名</th></tr>

                    {registeredMember2.length !== 0 && enptyArray.map((component, ind) => (
                        <>
                            <tr>
                                <td style={tdStyle2} rowspan="2">{ind + 1}</td>
                                <td style={tdStyle2} rowspan="2">

                                    {makePulldown(ind, PositionDB, "kata", nowSelected2, setNowSelected2)}
                                </td>
                                <td style={tdStyle2}><div id="player_name_hira1">{registeredMember2[nowSelected2[ind + 9]].player_name_hira}</div></td>
                                <td style={tdStyle2} rowspan="2"><div id="uniform_number1">{registeredMember2[nowSelected2[ind + 9]].uniform_number}</div></td>
                                <td style={tdStyle2} rowspan="2"><div id="grade1">{registeredMember2[nowSelected2[ind + 9]].grade}</div></td>
                            </tr>
                            <tr>
                                <td style={tdStyle2}>
                                    {makePulldown(ind + 9, registeredMember2, "player_name_kanji", nowSelected2, setNowSelected2)}
                                </td>
                            </tr>
                        </>
                    ))
                    }

                </tbody>
            </table><br />

            <button onClick={() => {
                tyouhuku(
                    nowSelected,
                    urlSchoolName,
                    nowSelected2,
                    urlSchoolName2
                )
                sendSelectedMember(
                    nowSelected,
                    PositionDB,
                    registeredMember1,
                    urlGameId,
                    urlSchoolId)

                sendSelectedMember(
                    nowSelected2,
                    PositionDB,
                    registeredMember2,
                    urlGameId,
                    urlSchoolId2)

            }}>登録</button>
            <button onClick={() => PageTransition(
                                "InputPlayGame?urlTournamentId="+
                                urlTournamentId +
                                "&urlTournamentName=" +
                                urlTournamentName +
                                "&urlSchoolId="+
                                urlSchoolId +
                                "&urlSchoolName=" +
                                urlSchoolName +
                                "&urlSchoolId2="+
                                urlSchoolId2 +
                                "&urlSchoolName2=" +
                                urlSchoolName2 +
                                "&urlGameId=" +
                                urlGameId
                            )}>速報ページに移動する</button>

            <br /><br />
        </div>
    );
};

export default StartingMember