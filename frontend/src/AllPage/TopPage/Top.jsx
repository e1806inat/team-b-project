import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { Member } = require("../../DB/Member");
const { Member2 } = require("../../DB/Member2");
const { PositionDB } = require("../../DB/PositionDB");


const loadMember = () => {
  fetch("http://localhost:5000/member/tournament_member_call", {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ tournament_id: 1, school_id: 1 }),
  })
      .then((response) => response.json())
      .then((data) => { console.log(data); })
}



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
    color: 'white',
    padding: '2px'
};

const thStyle_shimei = {
    border: '1px solid #3498DB',
    background: '#3498DB',
    color: 'white',
    padding: '2px'
}


const tdStyle2 = {
    border: '1px solid #F5494F',
    background: 'white',
    padding: '5px'
};

const thStyle2 = {
    border: '1px solid #F62E36',
    background: '#F62E36',
    color: 'white',
    padding: '2px'
};

const Top = () => {

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

   


    //守備位置

    const PositionRef1 = useRef(null)
    const PositionRef2 = useRef(null)
    const PositionRef3 = useRef(null)
    const PositionRef4 = useRef(null)
    const PositionRef5 = useRef(null)
    const PositionRef6 = useRef(null)
    const PositionRef7 = useRef(null)
    const PositionRef8 = useRef(null)
    const PositionRef9 = useRef(null)

    const PositionRef1_team2 = useRef(null)
    const PositionRef2_team2 = useRef(null)
    const PositionRef3_team2 = useRef(null)
    const PositionRef4_team2 = useRef(null)
    const PositionRef5_team2 = useRef(null)
    const PositionRef6_team2 = useRef(null)
    const PositionRef7_team2 = useRef(null)
    const PositionRef8_team2 = useRef(null)
    const PositionRef9_team2 = useRef(null)

    let initialValues = [{ position: "", name: "" }]
    for (let i = 0; i < 9 - 1; i++) {
        initialValues = [...initialValues, { position: "", name: "" }]
    }

    let initialValues_team2 = [{ position: "", name: "" }]
    for (let i = 0; i < 9 - 1; i++) {
        initialValues_team2 = [...initialValues_team2, { position: "", name: "" }]
    }

    const [Position, setPosition] = useState(initialValues)
    const [Position_team2, setPosition_team2] = useState(initialValues_team2)


    //動的にポジションの関数を指定
    const doPositionDitect = {
        "1": function (option) { PositionRef1.current.appendChild(option); },
        "2": function (option) { PositionRef2.current.appendChild(option); },
        "3": function (option) { PositionRef3.current.appendChild(option); },
        "4": function (option) { PositionRef4.current.appendChild(option); },
        "5": function (option) { PositionRef5.current.appendChild(option); },
        "6": function (option) { PositionRef6.current.appendChild(option); },
        "7": function (option) { PositionRef7.current.appendChild(option); },
        "8": function (option) { PositionRef8.current.appendChild(option); },
        "9": function (option) { PositionRef9.current.appendChild(option); },
    };

    const doPositionDitect_team2 = {
        "1": function (option) { PositionRef1_team2.current.appendChild(option); },
        "2": function (option) { PositionRef2_team2.current.appendChild(option); },
        "3": function (option) { PositionRef3_team2.current.appendChild(option); },
        "4": function (option) { PositionRef4_team2.current.appendChild(option); },
        "5": function (option) { PositionRef5_team2.current.appendChild(option); },
        "6": function (option) { PositionRef6_team2.current.appendChild(option); },
        "7": function (option) { PositionRef7_team2.current.appendChild(option); },
        "8": function (option) { PositionRef8_team2.current.appendChild(option); },
        "9": function (option) { PositionRef9_team2.current.appendChild(option); },
    };


    const setPositionNo = () => {
        for (let i = 1; i <= 9; i++) {
            for (let j = 1; j <= 9; j++) {
                const option = document.createElement('option')
                option.value = j
                option.text = PositionDB[j-1].kata
                doPositionDitect[i](option)
            }
        }
    }

    const setPositionNo_team2 = () => {
        for (let i = 1; i <= 9; i++) {
            for (let j = 1; j <= 9; j++) {
                const option = document.createElement('option')
                option.value = j
                option.text = PositionDB[j-1].kata
                doPositionDitect_team2[i](option)
            }
        }
    }

    const selectPosition = (e, id) => {
        let copyPosition = Position.slice(0, Position.length); // stateの配列をコピー(値渡し)
        copyPosition[id - 1].position = e.target.value
        setPosition(copyPosition)
        console.log(copyPosition)
    }

    const selectPosition_team2 = (e, id) => {
        let copyPosition_team2 = Position_team2.slice(0, Position_team2.length); // stateの配列をコピー(値渡し)
        copyPosition_team2[id - 1].position = e.target.value
        setPosition_team2(copyPosition_team2)
        console.log(copyPosition_team2)
    }

    //選手氏名
    const memberNameRef1 = useRef(null)  //useref(refarenceで値を参照するという意味)を定義する
    const memberNameRef2 = useRef(null)
    const memberNameRef3 = useRef(null)
    const memberNameRef4 = useRef(null)
    const memberNameRef5 = useRef(null)
    const memberNameRef6 = useRef(null)
    const memberNameRef7 = useRef(null)
    const memberNameRef8 = useRef(null)
    const memberNameRef9 = useRef(null)

    const memberNameRef1_team2 = useRef(null)  //useref(refarenceで値を参照するという意味)を定義する
    const memberNameRef2_team2 = useRef(null)
    const memberNameRef3_team2 = useRef(null)
    const memberNameRef4_team2 = useRef(null)
    const memberNameRef5_team2 = useRef(null)
    const memberNameRef6_team2 = useRef(null)
    const memberNameRef7_team2 = useRef(null)
    const memberNameRef8_team2 = useRef(null)
    const memberNameRef9_team2 = useRef(null)

    const doMemberDitect = {
        "1": function (option) { memberNameRef1.current.appendChild(option); },
        "2": function (option) { memberNameRef2.current.appendChild(option); },
        "3": function (option) { memberNameRef3.current.appendChild(option); },
        "4": function (option) { memberNameRef4.current.appendChild(option); },
        "5": function (option) { memberNameRef5.current.appendChild(option); },
        "6": function (option) { memberNameRef6.current.appendChild(option); },
        "7": function (option) { memberNameRef7.current.appendChild(option); },
        "8": function (option) { memberNameRef8.current.appendChild(option); },
        "9": function (option) { memberNameRef9.current.appendChild(option); },
    };

    const doMemberDitect_team2 = {
        "1": function (option) { memberNameRef1_team2.current.appendChild(option); },
        "2": function (option) { memberNameRef2_team2.current.appendChild(option); },
        "3": function (option) { memberNameRef3_team2.current.appendChild(option); },
        "4": function (option) { memberNameRef4_team2.current.appendChild(option); },
        "5": function (option) { memberNameRef5_team2.current.appendChild(option); },
        "6": function (option) { memberNameRef6_team2.current.appendChild(option); },
        "7": function (option) { memberNameRef7_team2.current.appendChild(option); },
        "8": function (option) { memberNameRef8_team2.current.appendChild(option); },
        "9": function (option) { memberNameRef9_team2.current.appendChild(option); },
    };

    const doKakikaeDitect = {
        "1": function () { kakikae1(); },
        "2": function () { kakikae2(); },
        "3": function () { kakikae3(); },
        "4": function () { kakikae4(); },
        "5": function () { kakikae5(); },
        "6": function () { kakikae6(); },
        "7": function () { kakikae7(); },
        "8": function () { kakikae8(); },
        "9": function () { kakikae9(); },
    }

    const doKakikaeDitect_team2 = {
        "1": function () { kakikae1_team2(); },
        "2": function () { kakikae2_team2(); },
        "3": function () { kakikae3_team2(); },
        "4": function () { kakikae4_team2(); },
        "5": function () { kakikae5_team2(); },
        "6": function () { kakikae6_team2(); },
        "7": function () { kakikae7_team2(); },
        "8": function () { kakikae8_team2(); },
        "9": function () { kakikae9_team2(); },
    }

    const initialSetMember = () => {
        for (let i = 1; i <= 9; i++) {
            for (let j = 1; j <= Member.length; j++) {
                const option = document.createElement('option')
                option.value = Member[j - 1].player_name_kanji //なぜ"vulue"と"text"の両方に値を入れているのかは分かりません
                option.text = Member[j - 1].player_name_kanji
                doMemberDitect[i](option)
            }
            for(let k = 1; k <= 9; k++){
              doKakikaeDitect[k]()
            }    
        }
    }

    const initialSetMember_team2 = () => {
        for (let i = 1; i <= 9; i++) {
            for (let j = 1; j <= Member2.length; j++) {
                const option = document.createElement('option')
                option.value = Member2[j - 1].player_name_kanji //なぜ"vulue"と"text"の両方に値を入れているのかは分かりません
                option.text = Member2[j - 1].player_name_kanji
                doMemberDitect_team2[i](option)
            }
            for(let k = 1; k <= 9; k++){
              doKakikaeDitect_team2[k]()
            }    
        }
    }

    const selectMember = (e, id) => {
      let copyPosition = Position.slice(0, Position.length); // stateの配列をコピー(値渡し)
      copyPosition[id - 1].name = e.target.value
      setPosition(copyPosition)
      console.log(copyPosition)

      const kanji_num1 = Member.findIndex((name) => { return name.player_name_kanji === memberNameRef1.current.value })
      kakikae1(kanji_num1)
      const kanji_num2 = Member.findIndex((name) => { return name.player_name_kanji === memberNameRef2.current.value })
      kakikae2(kanji_num2)
      const kanji_num3 = Member.findIndex((name) => { return name.player_name_kanji === memberNameRef3.current.value })
      kakikae3(kanji_num3)
      const kanji_num4 = Member.findIndex((name) => { return name.player_name_kanji === memberNameRef4.current.value })
      kakikae4(kanji_num4)
      const kanji_num5 = Member.findIndex((name) => { return name.player_name_kanji === memberNameRef5.current.value })
      kakikae5(kanji_num5)
      const kanji_num6 = Member.findIndex((name) => { return name.player_name_kanji === memberNameRef6.current.value })
      kakikae6(kanji_num6)
      const kanji_num7 = Member.findIndex((name) => { return name.player_name_kanji === memberNameRef7.current.value })
      kakikae7(kanji_num7)
      const kanji_num8 = Member.findIndex((name) => { return name.player_name_kanji === memberNameRef8.current.value })
      kakikae8(kanji_num8)
      const kanji_num9 = Member.findIndex((name) => { return name.player_name_kanji === memberNameRef9.current.value })
      kakikae9(kanji_num9)
    }

    const selectMember_team2 = (e, id) => {
        let copyPosition_team2 = Position_team2.slice(0, Position_team2.length); // stateの配列をコピー(値渡し)
        copyPosition_team2[id - 1].name = e.target.value
        setPosition_team2(copyPosition_team2)
        console.log(copyPosition_team2)
  
        const kanji_num1_team2 = Member2.findIndex((name) => { return name.player_name_kanji === memberNameRef1_team2.current.value })
        kakikae1_team2(kanji_num1_team2)
        const kanji_num2_team2 = Member2.findIndex((name) => { return name.player_name_kanji === memberNameRef2_team2.current.value })
        kakikae2_team2(kanji_num2_team2)
        const kanji_num3_team2 = Member2.findIndex((name) => { return name.player_name_kanji === memberNameRef3_team2.current.value })
        kakikae3_team2(kanji_num3_team2)
        const kanji_num4_team2 = Member2.findIndex((name) => { return name.player_name_kanji === memberNameRef4_team2.current.value })
        kakikae4_team2(kanji_num4_team2)
        const kanji_num5_team2 = Member2.findIndex((name) => { return name.player_name_kanji === memberNameRef5_team2.current.value })
        kakikae5_team2(kanji_num5_team2)
        const kanji_num6_team2 = Member2.findIndex((name) => { return name.player_name_kanji === memberNameRef6_team2.current.value })
        kakikae6_team2(kanji_num6_team2)
        const kanji_num7_team2 = Member2.findIndex((name) => { return name.player_name_kanji === memberNameRef7_team2.current.value })
        kakikae7_team2(kanji_num7_team2)
        const kanji_num8_team2 = Member2.findIndex((name) => { return name.player_name_kanji === memberNameRef8_team2.current.value })
        kakikae8_team2(kanji_num8_team2)
        const kanji_num9_team2 = Member2.findIndex((name) => { return name.player_name_kanji === memberNameRef9_team2.current.value })
        kakikae9_team2(kanji_num9_team2)
    }

    useEffect(() => {
        setPositionNo()
        initialSetMember()
        setPositionNo_team2()
        initialSetMember_team2()
        loadMember()
    }, []);

   

    const kakikae1 = (x = 0) => {
        document.getElementById("uniform_number"+1).innerHTML = Member[x].uniform_number
        document.getElementById("grade"+1).innerHTML = Member[x].grade
        document.getElementById("player_name_hira"+1).innerHTML = Member[x].player_name_hira
    }
    const kakikae2 = (x = 0) => {
        document.getElementById("uniform_number2").innerHTML = Member[x].uniform_number
        document.getElementById("grade2").innerHTML = Member[x].grade
        document.getElementById("player_name_hira2").innerHTML = Member[x].player_name_hira
    }
    const kakikae3 = (x = 0) => {
        document.getElementById("uniform_number3").innerHTML = Member[x].uniform_number
        document.getElementById("grade3").innerHTML = Member[x].grade
        document.getElementById("player_name_hira3").innerHTML = Member[x].player_name_hira
    }
    const kakikae4 = (x = 0) => {
        document.getElementById("uniform_number4").innerHTML = Member[x].uniform_number
        document.getElementById("grade4").innerHTML = Member[x].grade
        document.getElementById("player_name_hira4").innerHTML = Member[x].player_name_hira
    }
    const kakikae5 = (x = 0) => {
        document.getElementById("uniform_number5").innerHTML = Member[x].uniform_number
        document.getElementById("grade5").innerHTML = Member[x].grade
        document.getElementById("player_name_hira5").innerHTML = Member[x].player_name_hira
    }
    const kakikae6 = (x = 0) => {
        document.getElementById("uniform_number6").innerHTML = Member[x].uniform_number
        document.getElementById("grade6").innerHTML = Member[x].grade
        document.getElementById("player_name_hira6").innerHTML = Member[x].player_name_hira
    }
    const kakikae7 = (x = 0) => {
        document.getElementById("uniform_number7").innerHTML = Member[x].uniform_number
        document.getElementById("grade7").innerHTML = Member[x].grade
        document.getElementById("player_name_hira7").innerHTML = Member[x].player_name_hira
    }
    const kakikae8 = (x = 0) => {
        document.getElementById("uniform_number8").innerHTML = Member[x].uniform_number
        document.getElementById("grade8").innerHTML = Member[x].grade
        document.getElementById("player_name_hira8").innerHTML = Member[x].player_name_hira
    }
    const kakikae9 = (x = 0) => {
        document.getElementById("uniform_number9").innerHTML = Member[x].uniform_number
        document.getElementById("grade9").innerHTML = Member[x].grade
        document.getElementById("player_name_hira9").innerHTML = Member[x].player_name_hira
    }


    const kakikae1_team2 = (x = 0) => {
        document.getElementById("uniform_number1_team2").innerHTML = Member2[x].uniform_number
        document.getElementById("grade1_team2").innerHTML = Member2[x].grade
        document.getElementById("player_name_hira1_team2").innerHTML = Member2[x].player_name_hira
    }
    const kakikae2_team2 = (x = 0) => {
        document.getElementById("uniform_number2_team2").innerHTML = Member2[x].uniform_number
        document.getElementById("grade2_team2").innerHTML = Member2[x].grade
        document.getElementById("player_name_hira2_team2").innerHTML = Member2[x].player_name_hira
    }
    const kakikae3_team2 = (x = 0) => {
        document.getElementById("uniform_number3_team2").innerHTML = Member2[x].uniform_number
        document.getElementById("grade3_team2").innerHTML = Member2[x].grade
        document.getElementById("player_name_hira3_team2").innerHTML = Member2[x].player_name_hira
    }
    const kakikae4_team2 = (x = 0) => {
        document.getElementById("uniform_number4_team2").innerHTML = Member2[x].uniform_number
        document.getElementById("grade4_team2").innerHTML = Member2[x].grade
        document.getElementById("player_name_hira4_team2").innerHTML = Member2[x].player_name_hira
    }
    const kakikae5_team2 = (x = 0) => {
        document.getElementById("uniform_number5_team2").innerHTML = Member2[x].uniform_number
        document.getElementById("grade5_team2").innerHTML = Member2[x].grade
        document.getElementById("player_name_hira5_team2").innerHTML = Member2[x].player_name_hira
    }
    const kakikae6_team2 = (x = 0) => {
        document.getElementById("uniform_number6_team2").innerHTML = Member2[x].uniform_number
        document.getElementById("grade6_team2").innerHTML = Member2[x].grade
        document.getElementById("player_name_hira6_team2").innerHTML = Member2[x].player_name_hira
    }
    const kakikae7_team2 = (x = 0) => {
        document.getElementById("uniform_number7_team2").innerHTML = Member2[x].uniform_number
        document.getElementById("grade7_team2").innerHTML = Member2[x].grade
        document.getElementById("player_name_hira7_team2").innerHTML = Member2[x].player_name_hira
    }
    const kakikae8_team2 = (x = 0) => {
        document.getElementById("uniform_number8_team2").innerHTML = Member2[x].uniform_number
        document.getElementById("grade8_team2").innerHTML = Member2[x].grade
        document.getElementById("player_name_hira8_team2").innerHTML = Member2[x].player_name_hira
    }
    const kakikae9_team2 = (x = 0) => {
        document.getElementById("uniform_number9_team2").innerHTML = Member2[x].uniform_number
        document.getElementById("grade9_team2").innerHTML = Member2[x].grade
        document.getElementById("player_name_hira9_team2").innerHTML = Member2[x].player_name_hira
    }

    const tyouhuku = () => {
      //守備位置重複確認
      for(let i=1; i<=9; i++){
        for(let j=i+1; j<=9; j++){
          if(Position[i-1].position === Position[j-1].position){
            alert("チーム１の" + i + "番打者と" + j + "番打者の守備位置が重複しています")
            break;
          }
          if(Position_team2[i-1].position === Position_team2[j-1].position){
            alert("チーム２の" + i + "番打者と" + j + "番打者の守備位置が重複しています")
            break;
          }
        }
      }
      //選手氏名重複確認
      for(let i=1; i<=9; i++){
        for(let j=i+1; j<=9; j++){
          if(Position[i-1].name === Position[j-1].name){
            alert("チーム１の" + i + "番打者と" + j + "番打者の選手氏名が重複しています")
            break;
          }
          if(Position_team2[i-1].name === Position_team2[j-1].name){
            alert("チーム２の" + i + "番打者と" + j + "番打者の選手氏名が重複しています")
            break;
          }
        }
      }
    }

    useEffect(()=>{
        PageTransition("home")
    })


    return (
        <div align='center'>  
            <h2>選手登録画面</h2>
            <div id="error"></div>
            <table style={tableStyle}>
                <tbody>
                    <tr><th>う高校</th></tr>
                    <tr>
                        <th style={thStyle} rowSpan="2">打順</th>
                        <th style={thStyle} rowSpan="2">位置</th>
                        <th style={thStyle}>ふりがな</th>
                        <th style={thStyle} rowSpan="2">背番号</th>
                        <th style={thStyle} rowSpan="2">学年</th>
                    </tr>
                    <tr><th style={thStyle_shimei}>選手氏名</th></tr>

                    <tr>
                        <td style={tdStyle} rowSpan="2">1</td>
                        <td style={tdStyle} rowSpan="2"><select ref={PositionRef1} value={Position[1 - 1].position} onChange={(e) => selectPosition(e, 1)}></select></td>
                        <td style={tdStyle}><div id="player_name_hira1"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="uniform_number1"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="grade1"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle}><select ref={memberNameRef1} value={Position[1 - 1].name} onChange={(e) => selectMember(e, 1)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle} rowSpan="2">2</td>
                        <td style={tdStyle} rowSpan="2"><select ref={PositionRef2} value={Position[2 - 1].position} onChange={(e) => selectPosition(e, 2)}></select></td>
                        <td style={tdStyle}><div id="player_name_hira2"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="uniform_number2"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="grade2"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle}><select ref={memberNameRef2} value={Position[2 - 1].name} onChange={(e) => selectMember(e, 2)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle} rowSpan="2">3</td>
                        <td style={tdStyle} rowSpan="2"><select ref={PositionRef3} value={Position[3 - 1].position} onChange={(e) => selectPosition(e, 3)}></select></td>
                        <td style={tdStyle}><div id="player_name_hira3"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="uniform_number3"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="grade3"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle}><select ref={memberNameRef3} value={Position[3 - 1].name} onChange={(e) => selectMember(e, 3)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle} rowSpan="2">4</td>
                        <td style={tdStyle} rowSpan="2"><select ref={PositionRef4} value={Position[4 - 1].position} onChange={(e) => selectPosition(e, 4)}></select></td>
                        <td style={tdStyle}><div id="player_name_hira4"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="uniform_number4"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="grade4"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle}><select ref={memberNameRef4} value={Position[4 - 1].name} onChange={(e) => selectMember(e, 4)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle} rowSpan="2">5</td>
                        <td style={tdStyle} rowSpan="2"><select ref={PositionRef5} value={Position[5 - 1].position} onChange={(e) => selectPosition(e, 5)}></select></td>
                        <td style={tdStyle}><div id="player_name_hira5"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="uniform_number5"></div></td>              
                        <td style={tdStyle} rowSpan="2"><div id="grade5"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle}><select ref={memberNameRef5} value={Position[5 - 1].name} onChange={(e) => selectMember(e, 5)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle} rowSpan="2">6</td>
                        <td style={tdStyle} rowSpan="2" ><select ref={PositionRef6} value={Position[6 - 1].position} onChange={(e) => selectPosition(e, 6)}></select></td>
                        <td style={tdStyle}><div id="player_name_hira6"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="uniform_number6"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="grade6"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle}><select ref={memberNameRef6} value={Position[6 - 1].name} onChange={(e) => selectMember(e, 6)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle} rowSpan="2">7</td>
                        <td style={tdStyle} rowSpan="2"><select ref={PositionRef7} value={Position[7 - 1].position} onChange={(e) => selectPosition(e, 7)}></select></td>
                        <td style={tdStyle}><div id="player_name_hira7"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="uniform_number7"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="grade7"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle}><select ref={memberNameRef7} value={Position[7 - 1].name} onChange={(e) => selectMember(e, 7)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle} rowSpan="2">8</td>
                        <td style={tdStyle} rowSpan="2"><select ref={PositionRef8} value={Position[8 - 1].position} onChange={(e) => selectPosition(e, 8)}></select></td>
                        <td style={tdStyle}><div id="player_name_hira8"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="uniform_number8"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="grade8"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle}><select ref={memberNameRef8} value={Position[8 - 1].name} onChange={(e) => selectMember(e, 8)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle} rowSpan="2">9</td>
                        <td style={tdStyle} rowSpan="2"><select ref={PositionRef9} value={Position[9 - 1].position} onChange={(e) => selectPosition(e, 9)}></select></td>
                        <td style={tdStyle}><div id="player_name_hira9"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="uniform_number9"></div></td>
                        <td style={tdStyle} rowSpan="2"><div id="grade9"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle}><select ref={memberNameRef9} value={Position[9 - 1].name} onChange={(e) => selectMember(e, 9)}></select></td>
                    </tr>

                </tbody>
            </table><br /><br />
            <table style={tableStyle}>
                <tbody>
                    <tr><th>え高校</th></tr>
                    <tr>
                        <th style={thStyle2} rowSpan="2">打順</th>
                        <th style={thStyle2} rowSpan="2">位置</th>
                        <th style={thStyle2}>ふりがな</th>
                        <th style={thStyle2} rowSpan="2">背番号</th>
                        <th style={thStyle2} rowSpan="2">学年</th>
                    </tr>
                    <tr><th style={thStyle2}>選手氏名</th></tr>

                    <tr>
                        <td style={tdStyle2} rowSpan="2">1</td>
                        <td style={tdStyle2} rowSpan="2"><select ref={PositionRef1_team2} value={Position_team2[1 - 1].position} onChange={(e) => selectPosition_team2(e, 1)}></select></td>
                        <td style={tdStyle2}><div id="player_name_hira1_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="uniform_number1_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="grade1_team2"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle2}><select ref={memberNameRef1_team2} value={Position_team2[1 - 1].name} onChange={(e) => selectMember_team2(e, 1)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle2} rowSpan="2">2</td>
                        <td style={tdStyle2} rowSpan="2"><select ref={PositionRef2_team2} value={Position_team2[2 - 1].position} onChange={(e) => selectPosition_team2(e, 2)}></select></td>
                        <td style={tdStyle2}><div id="player_name_hira2_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="uniform_number2_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="grade2_team2"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle2}><select ref={memberNameRef2_team2} value={Position_team2[2 - 1].name} onChange={(e) => selectMember_team2(e, 2)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle2} rowSpan="2">3</td>
                        <td style={tdStyle2} rowSpan="2"><select ref={PositionRef3_team2} value={Position_team2[3 - 1].position} onChange={(e) => selectPosition_team2(e, 3)}></select></td>
                        <td style={tdStyle2}><div id="player_name_hira3_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="uniform_number3_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="grade3_team2"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle2}><select ref={memberNameRef3_team2} value={Position_team2[3 - 1].name} onChange={(e) => selectMember_team2(e, 3)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle2} rowSpan="2">4</td>
                        <td style={tdStyle2} rowSpan="2"><select ref={PositionRef4_team2} value={Position_team2[4 - 1].position} onChange={(e) => selectPosition_team2(e, 4)}></select></td>
                        <td style={tdStyle2}><div id="player_name_hira4_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="uniform_number4_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="grade4_team2"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle2}><select ref={memberNameRef4_team2} value={Position_team2[4 - 1].name} onChange={(e) => selectMember_team2(e, 4)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle2} rowSpan="2">5</td>
                        <td style={tdStyle2} rowSpan="2"><select ref={PositionRef5_team2} value={Position_team2[5 - 1].position} onChange={(e) => selectPosition_team2(e, 5)}></select></td>
                        <td style={tdStyle2}><div id="player_name_hira5_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="uniform_number5_team2"></div></td>              
                        <td style={tdStyle2} rowSpan="2"><div id="grade5_team2"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle2}><select ref={memberNameRef5_team2} value={Position_team2[5 - 1].name} onChange={(e) => selectMember_team2(e, 5)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle2} rowSpan="2">6</td>
                        <td style={tdStyle2} rowSpan="2" ><select ref={PositionRef6_team2} value={Position_team2[6 - 1].position} onChange={(e) => selectPosition_team2(e, 6)}></select></td>
                        <td style={tdStyle2}><div id="player_name_hira6_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="uniform_number6_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="grade6_team2"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle2}><select ref={memberNameRef6_team2} value={Position_team2[6 - 1].name} onChange={(e) => selectMember_team2(e, 6)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle2} rowSpan="2">7</td>
                        <td style={tdStyle2} rowSpan="2"><select ref={PositionRef7_team2} value={Position_team2[7 - 1].position} onChange={(e) => selectPosition_team2(e, 7)}></select></td>
                        <td style={tdStyle2}><div id="player_name_hira7_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="uniform_number7_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="grade7_team2"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle2}><select ref={memberNameRef7_team2} value={Position_team2[7 - 1].name} onChange={(e) => selectMember_team2(e, 7)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle2} rowSpan="2">8</td>
                        <td style={tdStyle2} rowSpan="2"><select ref={PositionRef8_team2} value={Position_team2[8 - 1].position} onChange={(e) => selectPosition_team2(e, 8)}></select></td>
                        <td style={tdStyle2}><div id="player_name_hira8_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="uniform_number8_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="grade8_team2"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle2}><select ref={memberNameRef8_team2} value={Position_team2[8 - 1].name} onChange={(e) => selectMember_team2(e, 8)}></select></td>
                    </tr>

                    <tr>
                        <td style={tdStyle2} rowSpan="2">9</td>
                        <td style={tdStyle2} rowSpan="2"><select ref={PositionRef9_team2} value={Position_team2[9 - 1].position} onChange={(e) => selectPosition_team2(e, 9)}></select></td>
                        <td style={tdStyle2}><div id="player_name_hira9_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="uniform_number9_team2"></div></td>
                        <td style={tdStyle2} rowSpan="2"><div id="grade9_team2"></div></td>
                    </tr>
                    <tr>
                        <td style={tdStyle2}><select ref={memberNameRef9_team2} value={Position_team2[9 - 1].name} onChange={(e) => selectMember_team2(e, 9)}></select></td>
                    </tr>

                </tbody>
            </table><br /><br />

            <button onClick={tyouhuku}>登録</button><br /><br />  
        </div>
    );
};

export default Top