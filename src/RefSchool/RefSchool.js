import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import SchoolList from "./SchoolList";

import "./RefSchool.css"

//import { v4 as uuid4 } from "uuid";

const RefSchool = () => {

  // const backendUrl = require("../../../../DB/communication").backendUrl;

  //大会を読み込む

  const [schoolsData, setSchoolsData] = useState([]);

  const readSchools = (setSchoolsData) => {
    // fetch(backendUrl + "/tournament/tournament_call", {
    fetch("http://localhost:5000/school/school_call", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({})
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

  // let schoolsArray = [];

  const [grades, setGrades] = useState([{ grade: 1, completed: true }, { grade: 2, completed: true }, { grade: 3, completed: true }, { grade: 4, completed: true }]);

  const [gradesArray, setGradesArray] = useState([1, 2, 3, 4]);

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

  //const [nowTournamentName, setNowTournamentName] = useState("")


  // const [grade2, setGrades2] = useState([{ grade: 2, completed: true }]);
  // const [grade3, setGrades3] = useState([{ grade: 3, completed: true }]);
  // const [grade4, setGrades4] = useState([{ grade: 4, completed: true }]);

  // const [nowSchoolName, setNowSchoolName] = useState([schoolsData[0]['school_name']]);

  const [nowSchoolName, setNowSchoolName] = useState([0]);
  const [nowOption, setNowOption] = useState([0]);

  let optionArray = [{ option: 'player_name_hira', optionID: '1', optionName: 'あいうえお順' }, { option: 'grade', optionID: '2', optionName: '学年順' }, { option: 'BA', optionID: '3', optionName: '打率順' }, { option: 'hit_num', optionID: '4', optionName: '安打数順' }, { option: 'bat_num', optionID: '5', optionName: '打席数順' }]

  //let addInfo = {grades:grades, option:optionArray[nowOption[0]].option}

  console.log(schoolsData);

  useEffect(() => {
    //console.log('動いてます');
    readSchools(setSchoolsData);
  }, []);
  return (
    <div>
      <div class="headline">選手一覧　検索</div>
      <div className="main-grid">
        <aside>
          <div className="box_grade">
            <div className="box-title">学年</div>
            <label>
              <input type="checkbox" checked={grades[0].completed} readOnly onChange={handleGradeClick1} />
            </label>
            <p>１年生</p>
            <label>
              <input type="checkbox" checked={grades[1].completed} readOnly onChange={handleGradeClick2} />
            </label>
            <p>２年生</p>
            <label>
              <input type="checkbox" checked={grades[2].completed} readOnly onChange={handleGradeClick3} />
            </label>
            <p>３年生</p>
            <label>
              <input type="checkbox" checked={grades[3].completed} readOnly onChange={handleGradeClick4} />
            </label>
            <p>卒業生</p>
          </div>
        </aside>
        <article>
          <div className="box_schoolName">
            <div className="schoolName_1">高校名</div>
            <label>
              {makePulldown(0, schoolsData, "school_name", nowSchoolName, setNowSchoolName)}
            </label>
          </div>
          <div className="box_option">
            <div className="option">検索オプション</div>
            <label>
              {makePulldown(0, optionArray, "optionName", nowOption, setNowOption)}
            </label>
          </div>
        </article>
      </div>
      <div>
        <button 
          className='btn_In_sch2'
          onClick={() => {
            //検索したい学年を選択できるようにするためにチェックボックスで選択された学年の配列を作成
            //これによってDBのSQL文でwhere in 句が使えるようになる
            // let gradesArray = [];
            // for (var item of grades) {
            //   if (item.completed) {
            //     gradesArray.push(item.grade);
            //   }
            // }
            PageTransition(
              "ref_schoolData?urlSchoolId=" +
              schoolsData[nowSchoolName[0]].school_id +
              "&urlSchoolName=" +
              schoolsData[nowSchoolName[0]].school_name +
              "&urlGrades=" +
              gradesArray +
              "&urlOption=" +
              optionArray[nowOption[0]].option
            )
          }}>
          <p>検索</p>
        </button>
      </div>
      <div >
        <div className="box_schools">
          <div className="schools">高校一覧</div>
          <div className="school">
            <SchoolList schools={schoolsData} gradesArray={gradesArray} option={optionArray[nowOption[0]].option} />
          </div>
        </div>
      </div>
    </div>
  );

  /*
  const [todos, setTodos] = useState([
    {id: 1, name: "Todo1", completed: false}]);

    const todoNameRef = useRef();

    const handleAddTodo = () => {
      //タスクの追加
      console.log(todoNameRef.current.value);
      const name = todoNameRef.current.value; 
      if (name === "") return;
      setTodos((prevTodos) => {
        return [...prevTodos, {id: uuid4(), name: name, completed: false}]
      });
      todoNameRef.current.value = null;
    };

    const toggleTodo = (id) => {
      const newTodos = [...todos];
      const todo = newTodos.find((todo) => todo.id === id);
      console.log("aaaaa");
      console.log(todo.completed);
      console.log("bbbbb")
      todo.completed = !todo.completed;
      setTodos(newTodos);
    };

    const handleClear = () => {
      const newTodos = todos.filter((todo) => !todo.completed);
      setTodos(newTodos);
    }

  return  (
  <div>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input type="text" ref={todoNameRef}/>
    <button onClick={handleAddTodo}>タスクを追加</button>
    <button onClick={handleClear}>完了したタスクの削除</button>
    <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
  </div>);*/
}

export default RefSchool;
