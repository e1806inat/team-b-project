import React, { useState, useEffect } from "react";
import MemberList from "./MemberList";

import "./RefSchool.css"
import "./RefSchoolData.css"

const RefSchool = () => {

  const backendUrl = require("../../../../../DB/communication").backendUrl;

  //school_callで読み込んだ学校のデータを保持する
  const [schoolsData, setSchoolsData] = useState([]);
  //選択された学校の名前を保持する
  const [selectedSchoolName, setSelectedSchoolName] = useState('');
  //ref_member_callで読み込んだ選手のデータを保持する
  const [membersData, setMembersData] = useState([]);
  //選択された学校のデータを保持する
  const [uSelectSchool, setUSelectSchool] = useState([]);
  //選択されている学年を保持する
  const [uSelectGrade, setUSelectGrade] = useState([]);
  //選択されているオプションを保持する
  const [uSelectOption, setUSelectOption] = useState([]);


  //school_callをフェッチし学校のデータを取得する
  const readSchools = (setSchoolsData) => {
    // fetch(backendUrl + "/tournament/tournament_call", {
    fetch(backendUrl +"/school/school_call", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        console.log(data[0]['school_id'])
        setSchoolsData(data)
      })
  }

  //ref_member_callをフェッチし選択された条件にそって選手の一覧を取得する
  const readMemebers = (setMembersData, schoolId, selectedGrades, option) => {
    // fetch(backendUrl + "/tournament/tournament_call", {
    fetch(backendUrl +"/member/ref_member_call", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ school_id: schoolId, grades: selectedGrades, option: option })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        //console.log(urlGrades)
        if (data.length === 0) {
          console.log("登録されていません")
        }
        else {
          console.log(data)
        }
        setMembersData(data)
      })
  }

  //自作プルダウン
  const makePulldown = (pulldownId, ArrayList, idText, nowSelected, setNowSelected) => {
    //pulldownIdは0でいいです。
    //ArrayListは表示したい要素を並べた配列です、普通の配列ではなく連想配列です。
    //idテキストは連想配列の属性を書きます。
    //nowSelectedは今プルダウンで何が選択されているかが入ります。初期値は[0]で、これは0番目の値が選択されている状態です。
    //setNowSelectedはnowSelecedの値をuseStateの機能で上書きする関数です。setNowSelected(更新値)とすれば、nowSelectedに更新値が入ります。

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
          }
          }>
          {ArrayList.map((component, ind) => (
            <option value={ind}>{component[idText]}</option>
          ))
          }
        </select>
      </>
    )
  }

  //閲覧したい学年の情報をチェックボックスで保持する
  const [grades, setGrades] = useState([{ grade: 1, completed: true }, { grade: 2, completed: true }, { grade: 3, completed: true }, { grade: 4, completed: false }]);
  //バックエンドに送れる形(配列)に編集した学年情報を保持する
  const [gradesArray, setGradesArray] = useState([1, 2, 3]);

  const toggleGrade = (grade) => {
    const newGrades = [...grades];
    const Grade = newGrades.find((grades) => grades.grade === grade);
    Grade.completed = !Grade.completed;
    let NewGradesArray = [];
    for (var item of newGrades) {
      if (item.completed) {
        NewGradesArray.push(item.grade);
      }
    }
    console.log(NewGradesArray);
    setGrades(newGrades);
    setGradesArray(NewGradesArray);
  };



  //学年の数に合わせてチェックボックスの処理を分割した
  //汚いから直したい
  const handleGradeClick1 = () => {
    toggleGrade(1);
  };
  const handleGradeClick2 = () => {
    toggleGrade(2);
  };
  const handleGradeClick3 = () => {
    toggleGrade(3);
  };
  const handleGradeClick4 = () => {
    toggleGrade(4);
  };

  //プルダウンのためのステイト
  const [nowSchoolName, setNowSchoolName] = useState([0]);
  const [nowOption, setNowOption] = useState([0]);

  //選択できるオプションの配列
  let optionArray = [{ option: 'player_name_hira', optionID: '1', optionName: 'あいうえお順' }, { option: 'grade', optionID: '2', optionName: '学年順' }, { option: 'BA', optionID: '3', optionName: '打率順' }, { option: 'hit_num', optionID: '4', optionName: '安打数順' }, { option: 'bat_num', optionID: '5', optionName: '打席数順' }]

  useEffect(() => {
    readSchools(setSchoolsData);
  }, []);

  useEffect(() => {
    //学校情報を取得できている場合のみ動く
    if(Object.keys(schoolsData).length){
      readMemebers(setMembersData, uSelectSchool, uSelectGrade, uSelectOption);
    }
    //動くタイミングは以下の三つのステイトのいずれかが動作する時
  }, [uSelectSchool, uSelectGrade, uSelectOption]);

  return (
    <div>
      <h2 class="headline">選手一覧　検索</h2>
      <div className="search">
        <dl className="box_schoolName">
          <dt className="box_title_school">高校名　</dt>
          <dd>
            <label>
              {/* {makePulldown(0, schoolsData, "school_name", nowSchoolName, setNowSchoolName)} */}
              {makePulldown(0, schoolsData, "school_name", nowSchoolName, setNowSchoolName)}
            </label>
          </dd>
        </dl>
        <dl className="box_grade">
          <dt className="box_title_grade">学年　</dt>
          <dd>
            <label>
              <input type="checkbox" checked={grades[0].completed} readOnly onChange={handleGradeClick1} />
                １年生&nbsp;&nbsp;&nbsp;
            </label>
            <label>
              <input type="checkbox" checked={grades[1].completed} readOnly onChange={handleGradeClick2} />
              ２年生&nbsp;&nbsp;&nbsp;
            </label> 
            <label>
              <input type="checkbox" checked={grades[2].completed} readOnly onChange={handleGradeClick3} />
              ３年生&nbsp;&nbsp;&nbsp;
            </label>
            <label>
              <input type="checkbox" checked={grades[3].completed} readOnly onChange={handleGradeClick4} />
                卒業生
            </label> 
          </dd>
        </dl>
        
        <dl className="box_option">
          <dt className="box_title_option">検索オプション　</dt>
          <dd>
            <label>
              {makePulldown(0, optionArray, "optionName", nowOption, setNowOption)}
            </label>
          </dd>
        </dl>
        
        <div>
          <button
            className='btn_In_sch2'
            onClick={() => {
              setUSelectSchool(schoolsData[nowSchoolName[0]]['school_id']);
              setSelectedSchoolName(schoolsData[nowSchoolName[0]]['school_name']);
              setUSelectGrade(gradesArray);
              setUSelectOption(optionArray[nowOption[0]]['option']);
            }}>
            検索
          </button>
        </div>
      </div>


      <div >
        <div className="box_schools">
          <h2 className="schools">{selectedSchoolName}選手一覧</h2>
          <table border="1" className="membersExample">
            <tr>
              <td width="5%" rowspan="2" >学年</td>
              <td width="30%" >ふりがな</td>
              <td width="5%" rowspan="2">打</td>
              <td width="5%" rowspan="2">投</td>
              <td width="8%" rowspan="2">安打数</td>
              <td width="8%" rowspan="2">打席数</td>
              <td width="8%" rowspan="2">打率</td>
            </tr>
            <tr>
              <td width="30%" rowspan="2">名前</td>
            </tr>
          </table>
          <div className="refMemberData">
            <MemberList members={membersData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefSchool;
