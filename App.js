import React, {useRef, useState, useEffect} from "react";
const { Member } = require("./Member");

const tableStyle = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    textAlign: 'center',
    width: '70%'
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



const App = () => {
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

  const [Position1, setPosition1] = useState("")
  const [Position2, setPosition2] = useState("")
  const [Position3, setPosition3] = useState("")
  const [Position4, setPosition4] = useState("")
  const [Position5, setPosition5] = useState("")
  const [Position6, setPosition6] = useState("")
  const [Position7, setPosition7] = useState("")
  const [Position8, setPosition8] = useState("")
  const [Position9, setPosition9] = useState("")
  
  const setPositionNo1 = () => {
    for (let i = 1; i <= 9; i++) {
      const option = document.createElement('option')
      option.value = i
      option.text = i
      PositionRef1.current.appendChild(option)
    }
  }
  const setPositionNo2 = () => {
    for (let i = 1; i <= 9; i++) {
      const option = document.createElement('option')
      option.value = i
      option.text = i
      PositionRef2.current.appendChild(option)
    }
  }
  const setPositionNo3 = () => {
    for (let i = 1; i <= 9; i++) {
      const option = document.createElement('option')
      option.value = i
      option.text = i
      PositionRef3.current.appendChild(option)
    }
  }
  const setPositionNo4 = () => {
    for (let i = 1; i <= 9; i++) {
      const option = document.createElement('option')
      option.value = i
      option.text = i
      PositionRef4.current.appendChild(option)
    }
  }
  const setPositionNo5 = () => {
    for (let i = 1; i <= 9; i++) {
      const option = document.createElement('option')
      option.value = i
      option.text = i
      PositionRef5.current.appendChild(option)
    }
  }
  const setPositionNo6 = () => {
    for (let i = 1; i <= 9; i++) {
      const option = document.createElement('option')
      option.value = i
      option.text = i
      PositionRef6.current.appendChild(option)
    }
  }
  const setPositionNo7 = () => {
    for (let i = 1; i <= 9; i++) {
      const option = document.createElement('option')
      option.value = i
      option.text = i
      PositionRef7.current.appendChild(option)
    }
  }
  const setPositionNo8 = () => {
    for (let i = 1; i <= 9; i++) {
      const option = document.createElement('option')
      option.value = i
      option.text = i
      PositionRef8.current.appendChild(option)
    }
  }
  const setPositionNo9 = () => {
    for (let i = 1; i <= 9; i++) {
      const option = document.createElement('option')
      option.value = i
      option.text = i
      PositionRef9.current.appendChild(option)
    }
  }  
  
  const selectPosition1 = (e) => {
    setPosition1(e.target.value);
  }
  const selectPosition2 = (e) => {
    setPosition2(e.target.value);
  }
  const selectPosition3 = (e) => {
    setPosition3(e.target.value);
  }
  const selectPosition4 = (e) => {
    setPosition4(e.target.value);
  }
  const selectPosition5 = (e) => {
    setPosition5(e.target.value);
  }
  const selectPosition6 = (e) => {
    setPosition6(e.target.value);
  }
  const selectPosition7 = (e) => {
    setPosition7(e.target.value);
  }
  const selectPosition8 = (e) => {
    setPosition8(e.target.value);
  }
  const selectPosition9 = (e) => {
    setPosition9(e.target.value);
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

  const [memberNameState1, setMemberState1] = useState("")  //選択した名前に変化させるためのuseStateを定義する
  const [memberNameState2, setMemberState2] = useState("")
  const [memberNameState3, setMemberState3] = useState("")
  const [memberNameState4, setMemberState4] = useState("")
  const [memberNameState5, setMemberState5] = useState("")
  const [memberNameState6, setMemberState6] = useState("")
  const [memberNameState7, setMemberState7] = useState("")
  const [memberNameState8, setMemberState8] = useState("")
  const [memberNameState9, setMemberState9] = useState("")

  const initialSetMember1 = () => {
    for (let i = 1; i <= Member.length; i++) {
      const option = document.createElement('option')
      option.value = Member[i - 1].player_name_kanji //なぜ"vulue"と"text"の両方に値を入れているのかは分かりません
      option.text = Member[i - 1].player_name_kanji
      memberNameRef1.current.appendChild(option)
    }
    kakikae1()
  }
  const initialSetMember2 = () => {
    for (let i = 1; i <= Member.length; i++) {
      const option = document.createElement('option')
      option.value = Member[i - 1].player_name_kanji //なぜ"vulue"と"text"の両方に値を入れているのかは分かりません
      option.text = Member[i - 1].player_name_kanji
      memberNameRef2.current.appendChild(option)
    }
    kakikae2()
  }
  const initialSetMember3 = () => {
    for (let i = 1; i <= Member.length; i++) {
      const option = document.createElement('option')
      option.value = Member[i - 1].player_name_kanji //なぜ"vulue"と"text"の両方に値を入れているのかは分かりません
      option.text = Member[i - 1].player_name_kanji
      memberNameRef3.current.appendChild(option)
    }
    kakikae3()
  }
  const initialSetMember4 = () => {
    for (let i = 1; i <= Member.length; i++) {
      const option = document.createElement('option')
      option.value = Member[i - 1].player_name_kanji //なぜ"vulue"と"text"の両方に値を入れているのかは分かりません
      option.text = Member[i - 1].player_name_kanji
      memberNameRef4.current.appendChild(option)
    }
    kakikae4()
  }
  const initialSetMember5 = () => {
    for (let i = 1; i <= Member.length; i++) {
      const option = document.createElement('option')
      option.value = Member[i - 1].player_name_kanji //なぜ"vulue"と"text"の両方に値を入れているのかは分かりません
      option.text = Member[i - 1].player_name_kanji
      memberNameRef5.current.appendChild(option)
    }
    kakikae5()
  }
  const initialSetMember6 = () => {
    for (let i = 1; i <= Member.length; i++) {
      const option = document.createElement('option')
      option.value = Member[i - 1].player_name_kanji //なぜ"vulue"と"text"の両方に値を入れているのかは分かりません
      option.text = Member[i - 1].player_name_kanji
      memberNameRef6.current.appendChild(option)
    }
    kakikae6()
  }
  const initialSetMember7 = () => {
    for (let i = 1; i <= Member.length; i++) {
      const option = document.createElement('option')
      option.value = Member[i - 1].player_name_kanji //なぜ"vulue"と"text"の両方に値を入れているのかは分かりません
      option.text = Member[i - 1].player_name_kanji
      memberNameRef7.current.appendChild(option)
    }
    kakikae7()
  }
  const initialSetMember8 = () => {
    for (let i = 1; i <= Member.length; i++) {
      const option = document.createElement('option')
      option.value = Member[i - 1].player_name_kanji //なぜ"vulue"と"text"の両方に値を入れているのかは分かりません
      option.text = Member[i - 1].player_name_kanji
      memberNameRef8.current.appendChild(option)
    }
    kakikae8()
  }
  const initialSetMember9 = () => {
    for (let i = 1; i <= Member.length; i++) {
      const option = document.createElement('option')
      option.value = Member[i - 1].player_name_kanji //なぜ"vulue"と"text"の両方に値を入れているのかは分かりません
      option.text = Member[i - 1].player_name_kanji
      memberNameRef9.current.appendChild(option)
    } 
    kakikae9()
  }

  const selectMember1 = (e) => {
    setMemberState1(e.terget)
    const kanji_num1 = Member.findIndex((name) => {return name.player_name_kanji === memberNameRef1.current.value})
    kakikae1(kanji_num1)
  }
  const selectMember2 = (e) => {
    setMemberState2(e.terget)
    const kanji_num2 = Member.findIndex((name) => {return name.player_name_kanji === memberNameRef2.current.value})
    kakikae2(kanji_num2)
  }
  const selectMember3 = (e) => {
    setMemberState3(e.terget)
    const kanji_num3 = Member.findIndex((name) => {return name.player_name_kanji === memberNameRef3.current.value})
    kakikae3(kanji_num3)
  }
  const selectMember4 = (e) => {
    setMemberState4(e.terget)
    const kanji_num4 = Member.findIndex((name) => {return name.player_name_kanji === memberNameRef4.current.value})
    kakikae4(kanji_num4)
  }
  const selectMember5 = (e) => {
    setMemberState5(e.terget)
    const kanji_num5 = Member.findIndex((name) => {return name.player_name_kanji === memberNameRef5.current.value})
    kakikae5(kanji_num5)
  }
  const selectMember6 = (e) => {
    setMemberState6(e.terget)
    const kanji_num6 = Member.findIndex((name) => {return name.player_name_kanji === memberNameRef6.current.value})
    kakikae6(kanji_num6)
  }
  const selectMember7 = (e) => {
    setMemberState7(e.terget)
    const kanji_num7 = Member.findIndex((name) => {return name.player_name_kanji === memberNameRef7.current.value})
    kakikae7(kanji_num7)
  }
  const selectMember8 = (e) => {
    setMemberState8(e.terget)
    const kanji_num8 = Member.findIndex((name) => {return name.player_name_kanji === memberNameRef8.current.value})
    kakikae8(kanji_num8)
  }
  const selectMember9 = (e) => {
    setMemberState9(e.terget)
    const kanji_num9 = Member.findIndex((name) => {return name.player_name_kanji === memberNameRef9.current.value})
    kakikae9(kanji_num9)
  }
  
  
  useEffect(() => {
    setPositionNo1()
    setPositionNo2()
    setPositionNo3()
    setPositionNo4()
    setPositionNo5()
    setPositionNo6()
    setPositionNo7()
    setPositionNo8()
    setPositionNo9()
    
    initialSetMember1()
    initialSetMember2()
    initialSetMember3()
    initialSetMember4()
    initialSetMember5()
    initialSetMember6()
    initialSetMember7()
    initialSetMember8()
    initialSetMember9()

  }, []);

  const kakikae1 = (x=0) => {
    document.getElementById("uniform_number1").innerHTML = Member[x].uniform_number
    document.getElementById("grade1").innerHTML = Member[x].grade
    document.getElementById("player_name_hira1").innerHTML = Member[x].player_name_hira
  }
  const kakikae2 = (x=0) => {
    document.getElementById("uniform_number2").innerHTML = Member[x].uniform_number
    document.getElementById("grade2").innerHTML = Member[x].grade
    document.getElementById("player_name_hira2").innerHTML = Member[x].player_name_hira
  }
  const kakikae3 = (x=0) => {
    document.getElementById("uniform_number3").innerHTML = Member[x].uniform_number
    document.getElementById("grade3").innerHTML = Member[x].grade
    document.getElementById("player_name_hira3").innerHTML = Member[x].player_name_hira
  }
  const kakikae4 = (x=0) => {
    document.getElementById("uniform_number4").innerHTML = Member[x].uniform_number
    document.getElementById("grade4").innerHTML = Member[x].grade
    document.getElementById("player_name_hira4").innerHTML = Member[x].player_name_hira
  }
  const kakikae5 = (x=0) => {
    document.getElementById("uniform_number5").innerHTML = Member[x].uniform_number
    document.getElementById("grade5").innerHTML = Member[x].grade
    document.getElementById("player_name_hira5").innerHTML = Member[x].player_name_hira
  }
  const kakikae6 = (x=0) => {
    document.getElementById("uniform_number6").innerHTML = Member[x].uniform_number
    document.getElementById("grade6").innerHTML = Member[x].grade
    document.getElementById("player_name_hira6").innerHTML = Member[x].player_name_hira
  }
  const kakikae7 = (x=0) => {
    document.getElementById("uniform_number7").innerHTML = Member[x].uniform_number
    document.getElementById("grade7").innerHTML = Member[x].grade
    document.getElementById("player_name_hira7").innerHTML = Member[x].player_name_hira
  }
  const kakikae8 = (x=0) => {
    document.getElementById("uniform_number8").innerHTML = Member[x].uniform_number
    document.getElementById("grade8").innerHTML = Member[x].grade
    document.getElementById("player_name_hira8").innerHTML = Member[x].player_name_hira
  }
  const kakikae9 = (x=0) => {
    document.getElementById("uniform_number9").innerHTML = Member[x].uniform_number
    document.getElementById("grade9").innerHTML = Member[x].grade
    document.getElementById("player_name_hira9").innerHTML = Member[x].player_name_hira
  }

  const tyouhuku = () => {
    if(Position1==Position2){
      alert("1番打者と2番打者の守備位置が重複しています")
    }else if(Position1==Position3){
      alert("1番打者と3番打者の守備位置が重複しています")
    }else if(Position1==Position4){
      alert("1番打者と4番打者の守備位置が重複しています")
    }else if(Position1==Position5){
      alert("1番打者と5番打者の守備位置が重複しています")
    }else if(Position1==Position6){
      alert("1番打者と6番打者の守備位置が重複しています")
    }else if(Position1==Position7){
      alert("1番打者と7番打者の守備位置が重複しています")
    }else if(Position1==Position8){
      alert("1番打者と8番打者の守備位置が重複しています")
    }else if(Position1==Position9){
      alert("1番打者と9番打者の守備位置が重複しています")
    }else if(Position2==Position3){
      alert("2番打者と3番打者の守備位置が重複しています")
    }else if(Position2==Position4){
      alert("2番打者と4番打者の守備位置が重複しています")
    }else if(Position2==Position5){
      alert("2番打者と5番打者の守備位置が重複しています")
    }else if(Position2==Position6){
      alert("2番打者と6番打者の守備位置が重複しています")
    }else if(Position2==Position7){
      alert("2番打者と7番打者の守備位置が重複しています")
    }else if(Position2==Position8){
      alert("2番打者と8番打者の守備位置が重複しています")
    }else if(Position2==Position9){
      alert("2番打者と9番打者の守備位置が重複しています")
    }else if(Position3==Position4){
      alert("3番打者と4番打者の守備位置が重複しています")
    }else if(Position3==Position5){
      alert("3番打者と5番打者の守備位置が重複しています")
    }else if(Position3==Position6){
      alert("3番打者と6番打者の守備位置が重複しています")
    }else if(Position3==Position7){
      alert("3番打者と7番打者の守備位置が重複しています")
    }else if(Position3==Position8){
      alert("3番打者と8番打者の守備位置が重複しています")
    }else if(Position3==Position9){
      alert("3番打者と9番打者の守備位置が重複しています")
    }else if(Position4==Position5){
      alert("4番打者と5番打者の守備位置が重複しています")
    }else if(Position4==Position6){
      alert("4番打者と6番打者の守備位置が重複しています")
    }else if(Position4==Position7){
      alert("4番打者と7番打者の守備位置が重複しています")
    }else if(Position4==Position8){
      alert("4番打者と8番打者の守備位置が重複しています")
    }else if(Position4==Position9){
      alert("4番打者と9番打者の守備位置が重複しています")
    }else if(Position5==Position6){
      alert("5番打者と6番打者の守備位置が重複しています")
    }else if(Position5==Position7){
      alert("5番打者と7番打者の守備位置が重複しています")
    }else if(Position5==Position8){
      alert("5番打者と8番打者の守備位置が重複しています")
    }else if(Position5==Position9){
      alert("5番打者と9番打者の守備位置が重複しています")
    }else if(Position6==Position7){
      alert("6番打者と7番打者の守備位置が重複しています")
    }else if(Position6==Position8){
      alert("6番打者と8番打者の守備位置が重複しています")
    }else if(Position6==Position9){
      alert("6番打者と9番打者の守備位置が重複しています")
    }else if(Position7==Position8){
      alert("7番打者と8番打者の守備位置が重複しています")
    }else if(Position7==Position9){
      alert("7番打者と9番打者の守備位置が重複しています")
    }else if(Position8==Position9){
      alert("8番打者と9番打者の守備位置が重複しています")
    }
    
    if(memberNameRef1.current.value===memberNameRef2.current.value){
      alert("1番打者と2番打者の選手氏名が重複しています")
    }else if(memberNameRef1.current.value===memberNameRef3.current.value){
      alert("1番打者と3番打者の選手氏名が重複しています")
    }else if(memberNameRef1.current.value===memberNameRef4.current.value){
      alert("1番打者と4番打者の選手氏名が重複しています")
    }else if(memberNameRef1.current.value===memberNameRef5.current.value){
      alert("1番打者と5番打者の選手氏名が重複しています")
    }else if(memberNameRef1.current.value===memberNameRef6.current.value){
      alert("1番打者と6番打者の選手氏名が重複しています")
    }else if(memberNameRef1.current.value===memberNameRef7.current.value){
      alert("1番打者と7番打者の選手氏名が重複しています")
    }else if(memberNameRef1.current.value===memberNameRef8.current.value){
      alert("1番打者と8番打者の選手氏名が重複しています")
    }else if(memberNameRef1.current.value===memberNameRef9.current.value){
      alert("1番打者と9番打者の選手氏名が重複しています")
    }else if(memberNameRef2.current.value===memberNameRef3.current.value){
      alert("2番打者と3番打者の選手氏名が重複しています")
    }else if(memberNameRef2.current.value===memberNameRef4.current.value){
      alert("2番打者と4番打者の選手氏名が重複しています")
    }else if(memberNameRef2.current.value===memberNameRef5.current.value){
      alert("2番打者と5番打者の選手氏名が重複しています")
    }else if(memberNameRef2.current.value===memberNameRef6.current.value){
      alert("2番打者と6番打者の選手氏名が重複しています")
    }else if(memberNameRef2.current.value===memberNameRef7.current.value){
      alert("2番打者と7番打者の選手氏名が重複しています")
    }else if(memberNameRef2.current.value===memberNameRef8.current.value){
      alert("2番打者と8番打者の選手氏名が重複しています")
    }else if(memberNameRef2.current.value===memberNameRef9.current.value){
      alert("2番打者と9番打者の選手氏名が重複しています")
    }else if(memberNameRef3.current.value===memberNameRef4.current.value){
      alert("3番打者と4番打者の選手氏名が重複しています")
    }else if(memberNameRef3.current.value===memberNameRef5.current.value){
      alert("3番打者と5番打者の選手氏名が重複しています")
    }else if(memberNameRef3.current.value===memberNameRef6.current.value){
      alert("3番打者と6番打者の選手氏名が重複しています")
    }else if(memberNameRef3.current.value===memberNameRef7.current.value){
      alert("3番打者と7番打者の選手氏名が重複しています")
    }else if(memberNameRef3.current.value===memberNameRef8.current.value){
      alert("3番打者と8番打者の選手氏名が重複しています")
    }else if(memberNameRef3.current.value===memberNameRef9.current.value){
      alert("3番打者と9番打者の選手氏名が重複しています")
    }else if(memberNameRef4.current.value===memberNameRef5.current.value){
      alert("4番打者と5番打者の選手氏名が重複しています")
    }else if(memberNameRef4.current.value===memberNameRef6.current.value){
      alert("4番打者と6番打者の選手氏名が重複しています")
    }else if(memberNameRef4.current.value===memberNameRef7.current.value){
      alert("4番打者と7番打者の選手氏名が重複しています")
    }else if(memberNameRef4.current.value===memberNameRef8.current.value){
      alert("4番打者と8番打者の選手氏名が重複しています")
    }else if(memberNameRef4.current.value===memberNameRef9.current.value){
      alert("4番打者と9番打者の選手氏名が重複しています")
    }else if(memberNameRef5.current.value===memberNameRef6.current.value){
      alert("5番打者と6番打者の選手氏名が重複しています")
    }else if(memberNameRef5.current.value===memberNameRef7.current.value){
      alert("5番打者と7番打者の選手氏名が重複しています")
    }else if(memberNameRef5.current.value===memberNameRef8.current.value){
      alert("5番打者と8番打者の選手氏名が重複しています")
    }else if(memberNameRef5.current.value===memberNameRef9.current.value){
      alert("5番打者と9番打者の選手氏名が重複しています")
    }else if(memberNameRef6.current.value===memberNameRef7.current.value){
      alert("6番打者と7番打者の選手氏名が重複しています")
    }else if(memberNameRef6.current.value===memberNameRef8.current.value){
      alert("6番打者と8番打者の選手氏名が重複しています")
    }else if(memberNameRef6.current.value===memberNameRef9.current.value){
      alert("6番打者と9番打者の選手氏名が重複しています")
    }else if(memberNameRef7.current.value===memberNameRef8.current.value){
      alert("7番打者と8番打者の選手氏名が重複しています")
    }else if(memberNameRef7.current.value===memberNameRef9.current.value){
      alert("7番打者と9番打者の選手氏名が重複しています")
    }else if(memberNameRef8.current.value===memberNameRef9.current.value){
      alert("8番打者と9番打者の選手氏名が重複しています")
    }
  }

  return (
    <div align='center'>
      <h2>選手登録画面</h2>
      <div id="error"></div>
      <table style={tableStyle}><tr><th>う高校</th></tr></table>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={thStyle} rowspan="2">打順</th>
            <th style={thStyle} rowspan="2">位置</th>
            <th style={thStyle}>ふりがな</th>
            <th style={thStyle} rowspan="2">背番号</th>
            <th style={thStyle} rowspan="2">学年</th>
          </tr>
          <tr><th style={thStyle}>選手氏名</th></tr>
            
          <tr>
            <td style={tdStyle} rowspan="2">1</td>
            <td style={tdStyle} rowspan="2"><select ref={PositionRef1} value={Position1} onChange={selectPosition1}></select></td>
            <td style={tdStyle}><div id="player_name_hira1"></div></td>
            <td style={tdStyle} rowspan="2"><div id="uniform_number1"></div></td>
            <td style={tdStyle} rowspan="2"><div id="grade1"></div></td>
          </tr>
          <tr>
            <td style={tdStyle}><select ref={memberNameRef1} value={memberNameState1} onChange={selectMember1}></select></td>
          </tr>
            
          <tr>
            <td style={tdStyle} rowspan="2">2</td>
            <td style={tdStyle} rowspan="2"><select ref={PositionRef2} value={Position2} onChange={selectPosition2}></select></td>
            <td style={tdStyle}><div id="player_name_hira2"></div></td>
            <td style={tdStyle} rowspan="2"><div id="uniform_number2"></div></td>
            <td style={tdStyle} rowspan="2"><div id="grade2"></div></td>
          </tr>
          <tr>
            <td style={tdStyle}><select ref={memberNameRef2} value={memberNameState2} onChange={selectMember2}></select></td>
          </tr>
            
          <tr>
            <td style={tdStyle} rowspan="2">3</td>
            <td style={tdStyle} rowspan="2"><select ref={PositionRef3} value={Position3} onChange={selectPosition3}></select></td>
            <td style={tdStyle}><div id="player_name_hira3"></div></td>
            <td style={tdStyle} rowspan="2"><div id="uniform_number3"></div></td>
              <td style={tdStyle} rowspan="2"><div id="grade3"></div></td>
          </tr>
          <tr>
            <td style={tdStyle}><select ref={memberNameRef3} value={memberNameState3} onChange={selectMember3}></select></td>
          </tr>
            
          <tr>
            <td style={tdStyle} rowspan="2">4</td>
            <td style={tdStyle} rowspan="2"><select ref={PositionRef4} value={Position4} onChange={selectPosition4}></select></td>
            <td style={tdStyle}><div id="player_name_hira4"></div></td>
            <td style={tdStyle} rowspan="2"><div id="uniform_number4"></div></td>
            <td style={tdStyle} rowspan="2"><div id="grade4"></div></td>
          </tr>
          <tr>
            <td style={tdStyle}><select ref={memberNameRef4} value={memberNameState4} onChange={selectMember4}></select></td>
          </tr>

          <tr>
            <td style={tdStyle} rowspan="2">5</td>
            <td style={tdStyle} rowspan="2"><select ref={PositionRef5} value={Position5} onChange={selectPosition5}></select></td>
            <td style={tdStyle}><div id="player_name_hira5"></div></td>
            <td style={tdStyle} rowspan="2"><div id="uniform_number5"></div></td>              <td style={tdStyle} rowspan="2"><div id="grade5"></div></td>
          </tr>
          <tr>
            <td style={tdStyle}><select ref={memberNameRef5} value={memberNameState5} onChange={selectMember5}></select></td>
          </tr>

          <tr>
            <td style={tdStyle} rowspan="2">6</td>
            <td style={tdStyle}rowspan="2" ><select ref={PositionRef6} value={Position6} onChange={selectPosition6}></select></td>
            <td style={tdStyle}><div id="player_name_hira6"></div></td>
            <td style={tdStyle} rowspan="2"><div id="uniform_number6"></div></td>
            <td style={tdStyle} rowspan="2"><div id="grade6"></div></td>
          </tr>
          <tr>
            <td style={tdStyle}><select ref={memberNameRef6} value={memberNameState6} onChange={selectMember6}></select></td>
          </tr>

          <tr>
            <td style={tdStyle} rowspan="2">7</td>
            <td style={tdStyle} rowspan="2"><select ref={PositionRef7} value={Position7} onChange={selectPosition7}></select></td>
            <td style={tdStyle}><div id="player_name_hira7"></div></td>
            <td style={tdStyle} rowspan="2"><div id="uniform_number7"></div></td>
            <td style={tdStyle} rowspan="2"><div id="grade7"></div></td>
          </tr>
          <tr>
            <td style={tdStyle}><select ref={memberNameRef7} value={memberNameState7} onChange={selectMember7}></select></td>
          </tr>

          <tr>
            <td style={tdStyle} rowspan="2">8</td>
            <td style={tdStyle} rowspan="2"><select ref={PositionRef8} value={Position8} onChange={selectPosition8}></select></td>
            <td style={tdStyle}><div id="player_name_hira8"></div></td>
            <td style={tdStyle} rowspan="2"><div id="uniform_number8"></div></td>
            <td style={tdStyle} rowspan="2"><div id="grade8"></div></td>
          </tr>
          <tr>
            <td style={tdStyle}><select ref={memberNameRef8} value={memberNameState8} onChange={selectMember8}></select></td>
          </tr>

          <tr>
            <td style={tdStyle} rowspan="2">9</td>
            <td style={tdStyle} rowspan="2"><select ref={PositionRef9} value={Position9} onChange={selectPosition9}></select></td>
            <td style={tdStyle}><div id="player_name_hira9"></div></td>
            <td style={tdStyle} rowspan="2"><div id="uniform_number9"></div></td>
            <td style={tdStyle} rowspan="2"><div id="grade9"></div></td>
          </tr>
          <tr>
            <td style={tdStyle}><select ref={memberNameRef9} value={memberNameState9} onChange={selectMember9}></select></td>
          </tr>

        </tbody>
      </table><br/>
      <button onClick={tyouhuku}>登録</button><br/><br/>
    </div>
  );
};

export default App;