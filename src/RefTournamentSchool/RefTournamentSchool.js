import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TournamentMemberList from "./TournamentMemberList";

import "./RefTournamentSchool.css"

//import { v4 as uuid4 } from "uuid";

const RefTournamentSchool = () => {
  //多分ここでurlから大会IDと大会名を抜き出す
  //実際に組み込んで動かす場合はコメントアウトを外して使う
  // const [searchParams] = useSearchParams();
  // const urlTournamentName = searchParams.get("urlTournamentName");
  //const urlTournamentId = searchParams.get("urlTournamentId");
  //urlTournamentは必要だったので入力しているが本番はurlから入力を受け取るようにする
  const urlTournamentId = 1;

  // const backendUrl = require("../../../../DB/communication").backendUrl;

  //大会を読み込む

  const [schoolsData, setSchoolsData] = useState([]);
  const [selectedSchoolName, setSelectedSchoolName] = useState('');
  const [tournamentMembersData, setTournamentMembersData] = useState([]);
  const [uSelectSchool, setUSelectSchool] = useState([]);
  const [uSelectOption, setUSelectOption] = useState([]);

  const tmpSchools = [
    {
        "school_id": 1,
        "school_name": "川之江高等学校"
    },
    {
        "school_id": 2,
        "school_name": "三島高等学校"
    },
    {
        "school_id": 3,
        "school_name": "土居高等学校"
    },
    {
        "school_id": 4,
        "school_name": "新居浜東高等学校"
    },
    {
        "school_id": 5,
        "school_name": "新居浜西高等学校"
    }
]

  const tmpMembers = [
    {
        "player_id": 22,
        "school_id": 2,
        "player_name_kanji": "受湯　札",
        "player_name_hira": "じゅとう　さつ",
        "grade": 3,
        "handed_hit": "右",
        "handed_throw": "右",
        "hit_num": 0,
        "bat_num": 5,
        "BA": 0
    },
    {
        "player_id": 23,
        "school_id": 2,
        "player_name_kanji": "岩弘　健司",
        "player_name_hira": "いわひろ　けんじ",
        "grade": 3,
        "handed_hit": "右",
        "handed_throw": "右",
        "hit_num": 0,
        "bat_num": 6,
        "BA": 0
    },
    {
        "player_id": 24,
        "school_id": 2,
        "player_name_kanji": "回丘　恵三",
        "player_name_hira": "かいおか　けいぞう",
        "grade": 3,
        "handed_hit": "右",
        "handed_throw": "右",
        "hit_num": 1,
        "bat_num": 8,
        "BA": 0.125
    },
    {
        "player_id": 25,
        "school_id": 2,
        "player_name_kanji": "皆葉　恒武",
        "player_name_hira": "みなば　つねたけ",
        "grade": 3,
        "handed_hit": "右",
        "handed_throw": "右",
        "hit_num": 4,
        "bat_num": 9,
        "BA": 0.444
    },
    {
        "player_id": 26,
        "school_id": 2,
        "player_name_kanji": "土井元　恵三",
        "player_name_hira": "どいもと　けいぞう",
        "grade": 3,
        "handed_hit": "右",
        "handed_throw": "右",
        "hit_num": 0,
        "bat_num": 5,
        "BA": 0
    }]

  const readSchools = (setSchoolsData) => {
    // fetch(backendUrl + "/tournament/tournament_call", {
    fetch("http://localhost:5000/school/school_call_p", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "tournament_id": 1 })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setSchoolsData(data)
      })
  }

  const readTournamentMemebers = (setTournamentMembersData, urlSchoolId, urlTournamentId, urlOption) => {
    // fetch(backendUrl + "/tournament/tournament_call", {

    fetch("http://localhost:5000/member/ref_tournament_member_call", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ school_id: urlSchoolId, tournament_id: urlTournamentId, option: urlOption })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.length === 0) {
          console.log("登録されていません")
        }
        else {
          console.log(data)
        }
        setTournamentMembersData(data)
      })
  }


  //console.log(setSchoolsData);
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

  const [nowSchoolName, setNowSchoolName] = useState([0]);
  const [nowOption, setNowOption] = useState([0]);

  let optionArray = [{ option: 'player_name_hira', optionID: '1', optionName: 'あいうえお順' }, { option: 'grade', optionID: '2', optionName: '学年順' }, { option: 'BA', optionID: '3', optionName: '打率順' }, { option: 'hit_num', optionID: '4', optionName: '安打数順' }, { option: 'bat_num', optionID: '5', optionName: '打席数順' }]

  useEffect(() => {
    readSchools(setSchoolsData);
  }, []);

  useEffect(() => {
    if (Object.keys(schoolsData).length) {
      readTournamentMemebers(setTournamentMembersData, uSelectSchool, urlTournamentId, uSelectOption);
    }
  }, [uSelectSchool, uSelectOption]);


  return (
    <div>
      {/*ほんとは県大会ではなく{urlTournamentName}にする*/}
      <div class="headline_t">県大会　選手一覧　検索</div>
      <div className="main-grid">
        <article>
          <div className="box_schoolName_t">
            <div className="schoolName_t">高校名</div>
            <label>
              {/* {makePulldown(0, schoolsData, "school_name", nowSchoolName, setNowSchoolName)} */}
              {makePulldown(0, tmpSchools, "school_name", nowSchoolName, setNowSchoolName)}
            </label>
          </div>
          <div className="box_option_t">
            <div className="option_t">検索オプション</div>
            <label>
              {makePulldown(0, optionArray, "optionName", nowOption, setNowOption)}
            </label>
          </div>
        </article>
      </div>
      <div>
        <button
          className='btn_In_tsch2'
          onClick={() => {
            setUSelectSchool(schoolsData[nowSchoolName[0]]['school_id']);
            setSelectedSchoolName(schoolsData[nowSchoolName[0]]['school_name']);
            setUSelectOption(optionArray[nowOption[0]]['option']);
          }}>
          <p>検索</p>
        </button>
      </div>
      <div className="box_schools_t">
        <div className="schoolName_t2" bordercolor="red">
           {/*ほんとは県大会ではなく{urlTournamentName}にする*/}
          <p>{selectedSchoolName}　県大会出場　選手一覧</p>
        </div>
        <table border="2" className="membersExample_t">
          <tr>
            <td width="50" rowspan="2" bgcolor="#228b22">学年</td>
            <td width="300" bgcolor="#228b22">ふりがな</td>
            <td width="50" rowspan="2" bgcolor="#228b22">打</td>
            <td width="50" rowspan="2" bgcolor="#228b22">投</td>
            <td width="75" rowspan="2" bgcolor="#228b22">安打数</td>
            <td width="75" rowspan="2" bgcolor="#228b22">打席数</td>
            <td width="75" rowspan="2" bgcolor="#228b22">打率</td>
          </tr>
          <tr>
            <td width="300" rowspan="2" bgcolor="#228b22">名前</td>
          </tr>
        </table>
        <div className="refMemberData_t">
          <TournamentMemberList members={tmpMembers} />
        </div>
      </div>
    </div>
  );
}

export default RefTournamentSchool;
