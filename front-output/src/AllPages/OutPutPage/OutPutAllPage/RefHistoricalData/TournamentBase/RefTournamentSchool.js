import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TournamentMemberList from "./TournamentMemberList";

import "./RefTournamentSchool.css"

//import { v4 as uuid4 } from "uuid";

const RefTournamentSchool = () => {
  //多分ここでurlから大会IDと大会名を抜き出す
  //実際に組み込んで動かす場合はコメントアウトを外して使う
  const [searchParams] = useSearchParams();
  const urlTournamentName = searchParams.get("urlTournamentName");
  const urlTournamentId = searchParams.get("urlTournamentId");
  //urlTournamentは必要だったので入力しているが本番はurlから入力を受け取るようにする
  // const urlTournamentId = 1;

  const backendUrl = require("../../../../../DB/communication").backendUrl;

  //大会を読み込む

  const [schoolsData, setSchoolsData] = useState([]);
  const [selectedSchoolName, setSelectedSchoolName] = useState('');
  const [tournamentMembersData, setTournamentMembersData] = useState([]);
  const [uSelectSchool, setUSelectSchool] = useState([]);
  const [uSelectOption, setUSelectOption] = useState([]);



  const readSchools = (setSchoolsData) => {
    // fetch(backendUrl + "/tournament/tournament_call", {
    fetch(backendUrl +"/school/school_call_p", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "tournament_id": urlTournamentId })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setSchoolsData(data)
      })
  }

  const readTournamentMemebers = (setTournamentMembersData, urlSchoolId, urlTournamentId, urlOption) => {
    // fetch(backendUrl + "/tournament/tournament_call", {

    fetch(backendUrl +"/member/ref_tournament_member_call", {
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

  console.log(selectedSchoolName)


  return (
    <div>
      {/*ほんとは県大会ではなく{urlTournamentName}にする*/}
      <h2 class="headline_t">{urlTournamentName}　選手一覧　検索</h2>
      <div className="main-grid">
        <div className="search">
          <dl className="box_schoolName_t">
            <dt className="schoolName_t">高校名</dt>
            <dd>
              <label>
                {/* {makePulldown(0, schoolsData, "school_name", nowSchoolName, setNowSchoolName)} */}
                {makePulldown(0, schoolsData, "school_name", nowSchoolName, setNowSchoolName)}
              </label>
            </dd>
          </dl>

          <dl className="box_option_t">
            <dt className="option_t">検索オプション</dt>
            <dd>
              <label>
                {makePulldown(0, optionArray, "optionName", nowOption, setNowOption)}
              </label>
            </dd>
          </dl>


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
        </div>


        <div className="box_schools_t">
          <h2 className="schoolName_t2" bordercolor="red">
            {/*ほんとは県大会ではなく{urlTournamentName}にする*/}
            {selectedSchoolName}{"　"}出場選手一覧

          </h2>
          <table border="2" className="membersExample_t">
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
          <div className="refMemberData_t">
            <TournamentMemberList members={tournamentMembersData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefTournamentSchool;
