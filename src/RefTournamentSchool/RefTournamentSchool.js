import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TournamentSchoolList from "./TournamentSchoolList";

import "./RefTournamentSchool.css"

//import { v4 as uuid4 } from "uuid";

const RefTournamentSchool = () => {
  //多分ここでurlから大会IDと大会名を抜き出す
  // const [searchParams] = useSearchParams();
  // const urlTournamentName = searchParams.get("urlTournamentName");
  // const urlTournamentId = searchParams.get("urlTournamentId");

  // const backendUrl = require("../../../../DB/communication").backendUrl;

  //大会を読み込む

  const [schoolsData, setSchoolsData] = useState([]);
  

  const readSchools = (setSchoolsData) => {
    // fetch(backendUrl + "/tournament/tournament_call", {
    fetch("http://localhost:5000/school/school_call_p", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"tournament_id":1})
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setSchoolsData(data)
      })
  }

  //ページ遷移用
  const navigate = useNavigate()
  const PageTransition = (url) => {
    navigate(url)
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
  
  //let addInfo = {tournament_id:urlTournamentId, option:optionArray[nowOption[0]].option}
  let addInfo = {tournament_id:"1", option:optionArray[nowOption[0]].option}

  console.log(addInfo);

  //console.log(participantSchoolsData);

  useEffect(() => {
    //console.log('動いてます');
    readSchools(setSchoolsData);
  }, []);
  return (
    <div>
      {/*ほんとは県大会ではなく{urlTournamentName}にする*/}
      <div class="headline_t">県大会　選手一覧　検索</div>
      <div className="main-grid">
        <article>
          <div className="box_schoolName_t">
            <div className="schoolName_t">高校名</div>
            <label>
              {makePulldown(0, schoolsData, "school_name", nowSchoolName, setNowSchoolName)}
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
            PageTransition(
              "ref_PschoolData?urlSchoolId=" +
              schoolsData[nowSchoolName[0]].school_id +
              "&urlSchoolName=" +
              schoolsData[nowSchoolName[0]].school_name +
              "&urlTournamentId=" +
              '1' +
              "&urlOption=" +
              optionArray[nowOption[0]].option
            )
          }}>
          <p>検索</p>
        </button>
      </div>
      <div >
        <div className="box_schools_t">
          {/*ほんとは県大会ではなく{urlTournamentName}にする*/}
          <div className="schools_t">県大会　参加高校一覧</div>
          <div className="school_t">
            <TournamentSchoolList schools={schoolsData} addInfo={addInfo}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefTournamentSchool;
