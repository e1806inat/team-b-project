import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TitleBar } from "../OtherPage/TitleBar";
import TournamentMemberList from "./TournamentMemberList";


const RefTournamentMember = () => {

    const [searchParams] = useSearchParams();
    const urlSchoolId = searchParams.get("urlSchoolId")
    const urlSchoolName = searchParams.get("urlSchoolName")
    const urlTournamentId = searchParams.get("urlTournamentId")
    const urlOption = searchParams.get("urlOption")

    const [schoolsData, setSchoolsData] = useState([]);
    const [tournamentMembersData, setTournamentMembersData] = useState([]);

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

    const [nowSchoolName, setNowSchoolName] = useState([0]);
    const [nowOption, setNowOption] = useState([0]);

    let optionArray = [{ option: 'player_name_hira', optionID: '1', optionName: 'あいうえお順' }, { option: 'grade', optionID: '2', optionName: '学年順' }, { option: 'BA', optionID: '3', optionName: '打率順' }, { option: 'hit_num', optionID: '4', optionName: '安打数順' }, { option: 'bat_num', optionID: '5', optionName: '打席数順' }]

    useEffect(() => {
        readSchools(setSchoolsData);
        readTournamentMemebers(setTournamentMembersData, urlSchoolId, urlTournamentId, urlOption);
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
                        //検索したい学年を選択できるようにするためにチェックボックスで選択された学年の配列を作成
                        //これによってDBのSQL文でwhere in 句が使えるようになる
                        //this.props.history.goBack()
                        PageTransition(
                            // "ref_schoolData?urlSchoolId=" +
                            "?urlSchoolId=" +
                            schoolsData[nowSchoolName[0]].school_id +
                            "&urlSchoolName=" +
                            schoolsData[nowSchoolName[0]].school_name +
                            "&urlOption=" +
                            optionArray[nowOption[0]].option
                        )
                    }}>
                    <p>検索</p>
                </button>
            </div>

            <div className="schoolName_t2" bordercolor="red">
                <p>{urlSchoolName}　県大会出場　選手一覧</p>
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
                <TournamentMemberList members={tournamentMembersData} />
            </div>
        </div>
    );
}

export default RefTournamentMember;