import React, { useState, useEffect } from "react"; 
import './App.css';

//データベースから初期項目を読み出し
//データベースから読み出した値はdataに入ります
//それをsetUseSchoolsを使って、Schoolsにdataを入れています
const readSchool = (setUseSchools) => {
  fetch("http://localhost:5000/school/school_call", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {

      setUseSchools(data)

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

export const App = () => {

  //プルダウンのための初期値作成
  let initialPulldown = [0]

  const [Schools, setUseSchools] = useState([{ school_id: 1, school_name: "ラサール高等学校" }]);
  const [nowSelected, setNowSelected] = useState(initialPulldown);

  useEffect(() => {
    readSchool(setUseSchools)
  }, []);

  return (
    <div className="App">

      <h1>〇〇大会出場　選手一覧　検索</h1>
      <br></br>
      <br></br>
      <br></br>
      <div align="center" class="sel_tytle" >高校名</div>
      <div class="cp_ipselect cp_sl01">
      {makePulldown(0, Schools, "school_name", nowSelected, setNowSelected)}
      </div>
      <br></br>
      <br></br>
      <div align="center" class="sel_tytle">検索オプション</div>
      <div class="cp_ipselect cp_sl01"> 
      <select name="sei_option">
        <option value="touroku" selected>登録順</option>
        <option value="gakunen">学年順</option>
        <option value="daritu">打率順</option>
        <option value="anda">安打数順</option>
        <option value="daseki">打席数順</option>
      </select>
      </div>

      <br></br>
      <div align="center">
      <button align="center">検索</button>
      </div>
      <br></br>
      {/* これ↓がmap関数で連続表示させている状態です */}
      <br></br>
      <table align="center">
      <tr><th>
      〇〇大会出場　高校一覧
      </th></tr>
      <tr><td>
      <div className="mapFunction">
        {Schools.map((component, ind) => (
          <>
            <button class="sel_button"value={ind}>{component.school_name}</button>
            <br></br>
          </>
        ))
        }
      </div>
      </td></tr>
      </table>
    </div>
  );      
};

export default App;