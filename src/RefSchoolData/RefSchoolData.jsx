import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TitleBar } from "../OtherPage/TitleBar";
import MemberList from "./MemberList";

import "./RefSchoolData.css"

const RefSchoolData = () => {

    //const [update,setUpdata]=useState<boolean>(false)

    const [searchParams] = useSearchParams();
    const urlSchoolName = searchParams.get("urlSchoolName")
    const urlSchoolId = searchParams.get("urlSchoolId")
    const urlGrades = searchParams.get("urlGrades").split(',')
    const urlOption = searchParams.get("urlOption")
    // const [urlSchoolName, setUrlSchoolName] = useState('');
    // const [urlSchoolId, setUrlSchoolId] = useState('');
    // const [urlGrades, setUrlGrades] = useState('');
    // const [urlOption, setUrlOption] = useState('');

    // setUrlSchoolName(searchParams.get("urlSchoolName"));
    // setUrlSchoolId(searchParams.get("urlSchoolId"));
    // setUrlGrades(searchParams.get("urlGrades").split(','));
    // setUrlOption(searchParams.get("urlOption"));

    console.log(urlSchoolName);
    console.log(urlSchoolId);
    console.log(urlGrades);

    const [schoolsData, setSchoolsData] = useState([]);
    const [membersData, setMembersData] = useState([]);

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

    const readMemebers = (setMembersData, urlSchoolId, urlGrades, urlOption) => {
        // fetch(backendUrl + "/tournament/tournament_call", {
        fetch("http://localhost:5000/member/ref_member_call", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ school_id: urlSchoolId, grades: urlGrades, option: urlOption })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                console.log(urlGrades)
                if (data.length === 0) {
                    console.log("登録されていません")
                }
                else {
                    console.log(data)
                }
                setMembersData(data)
            })
    }

    //const [copyMember, setCopyMember] = useState(Member)

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
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

    const [grades, setGrades] = useState([{ grade: 1, completed: true }, { grade: 2, completed: true }, { grade: 3, completed: true }, { grade: 4, completed: true }]);

    const toggleGrade = (grade) => {
        const newGrades = [...grades];
        const Grade = newGrades.find((grades) => grades.grade === grade);
        Grade.completed = !Grade.completed;
        setGrades(newGrades);
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

    useEffect(() => {
        readSchools(setSchoolsData);
        readMemebers(setMembersData, urlSchoolId, urlGrades, urlOption);
        console.log('動いてます');
    }, []);

    // useEffect(() => {
    //     readMemebers(setMembersData, urlSchoolId, urlGrades, urlOption);
    //     console.log('動いてますよ');
    // }, []);

    return (
        <div>
            <TitleBar
                TitleText={"選手情報"}
                PageTransition={PageTransition}
                valueUrl={-1}
            />

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
                        console.log('kensakus');
                        let gradesArray = [];
                        for (var item of grades) {
                            if (item.completed) {
                                gradesArray.push(item.grade);
                            }
                        }
                        //this.props.history.goBack()
                        PageTransition(
                            // "ref_schoolData?urlSchoolId=" +
                            "?urlSchoolId=" +
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

            <div className="schoolName_2">
                <h3>{urlSchoolName}  選手一覧</h3>
            </div>
            <table border="2" className="membersExample">
                <tr>
                    <td width="50" rowspan="2" bgcolor="#000080">学年</td>
                    <td width="300" bgcolor="#000080">ふりがな</td>
                    <td width="50" rowspan="2" bgcolor="#000080">打</td>
                    <td width="50" rowspan="2" bgcolor="#000080">投</td>
                    <td width="75" rowspan="2" bgcolor="#000080">安打数</td>
                    <td width="75" rowspan="2" bgcolor="#000080">打席数</td>
                    <td width="75" rowspan="2" bgcolor="#000080">打率</td>
                </tr>
                <tr>
                    <td width="300" rowspan="2" bgcolor="#000080">名前</td>
                </tr>
            </table>
            <div className="refMemberData">
                <MemberList members={membersData} />
            </div>
        </div>
    );
}

export default RefSchoolData;