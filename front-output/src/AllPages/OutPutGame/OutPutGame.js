import pic from "./field2.png"
import "./App.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DasekiHistoryList from "./DasekiHistoryList";
import StartingMemberList from './StartingMemberList'

const pageStyle = {
  background: 'white'
}

const borderStyle = {
  display: "inline-block",
  border: "solid 2px #707070",
  background: '#191970',
  color: 'white',
  fontSize: "4vw"
}

const infoStyle = {
  textAlign: "center",
}

const group = {
  display: "flex",
}

const resultStyle = {
  background: '#e3e3e3',
  color: 'red',
  fontSize: '5vw',
  textAlign: 'center',
  width: '70%',
  resize: 'none',
  margin: 'auto'
}

const tableStyle = {
  border: '1px solid #707070',
  borderCollapse: 'collapse',
  textAlign: 'center',
  margin: 'auto',
  width: '70%'
}

const tdStyle = {
  border: '2px solid #707070',
  background: '#e3e3e3',
  padding: '5px',
  fontSize: '3vw'
};

const thStyle = {
  border: '2px solid #707070',
  background: '#3498DB',
  color: 'white',
  padding: '2px',
  fontSize: '3vw'
};

const team1Style = {
  border: '2px solid #707070',
  background: '#e3e3e3',
  color: 'red',
  padding: '2px',
  fontSize: '3vw'
}

const team2Style = {
  border: '2px solid #707070',
  background: '#e3e3e3',
  color: 'black',
  padding: '2px',
  fontSize: '3vw'
}

const batterStyle = {
  background: 'red',
  color: 'white',
  fontSize: '2vw',
  padding: '1px',
  width: "15%"
}

const pitcherStyle = {
  background: 'blue',
  color: 'white',
  fontSize: '2vw',
  padding: '1px',
  width: "15%"
}

const group2 = {
  display: "flex",
  justifyContent: 'space-around',
}

const playertableStyle = {
  border: '2px solid #707070',
  borderCollapse: 'collapse',
  textAlign: 'center',
  margin: 'auto',
  width: '48%'
}

const schoolStyle = {
  border: '2px solid #707070',
  background: '#e3e3e3',
  fontSize: '3vw',
  padding: '1px',
};

const playerStyle = {
  border: '2px solid #707070',
  background: '#e3e3e3',
  fontSize: '2vw',
  padding: '2px'
}

const playerresultStyle = {
  border: '2px solid #707070',
  background: '#e3e3e3',
  fontSize: '2vw',
  padding: '1px',
  width: '15%'
}

const fieldStyle = {
  textAlign: 'center',
}

const imgsize = {
  width: '80%',
  height: 'auto'
}

const countStyle = {
  fontSize: '6vw',
  margin: 'auto'
}

export const OutPutGame = () => {

  const [searchParams] = useSearchParams();
  // const urlTableName = searchParams.get("urlTableName");
  // const urlGameId = searchParams.get("urlGameId");
  const urlTableName = "test116";
  const urlGameId = "1";
  // const urlSchoolId1 = searchParams.get("urlSchoolId1");
  // const urlSchoolId2 = searchParams.get("urlSchoolId2");
  //打席情報
  //試合全体の打席情報
  const [dasekiData, setDasekiData] = useState([]);
  //現在の打席情報
  const [nowDaseki, setNowDaseki] = useState([]);
  //試合情報
  const [gameData, setGameData] = useState([]);
  //大会登録選手school1
  const [tournamentMember1, setTournamentMember1] = useState([]);
  //大会登録選手school2
  const [tournamentMember2, setTournamentMember2] = useState([]);
  //大会登録選手school1+school2
  const [tournamentMember, setTournamentMember] = useState([]);
  //スタメンschool1
  const [startingMember1, setStartingMember1] = useState([]);
  //スタメンschool2
  const [startingMember2, setStartingMember2] = useState([]);
  //回戦情報
  const [nowState, setNowState] = useState('');
  //開催年
  const [gameYear, setGameYear] = useState('');
  //開催月
  const [gameMonth, setGameMonth] = useState('');
  //開催日
  const [gameDay, setGameDay] = useState('');
  //大会名
  const [tournamentName, setTournamentName] = useState('');
  //会場名
  const [venueName, setVenueName] = useState('');
  //学校名１
  const [schoolName1, setSchoolName1] = useState('');
  //学校名２
  const [schoolName2, setSchoolName2] = useState('');
  //トータルスコア１
  const [totalScore1, setTotalScore1] = useState(0);
  //トータルスコア２
  const [totalScore2, setTotalScore2] = useState(0);
  //交代情報
  const [pinchText, setPinchText] = useState(0);
  // const [batterName, setBatterName] = useState('');
  // const [pitcherName, setPitcherName] = useState('');
  //打者データ
  const [batterData, setBatterData] = useState('');
  //投手データ
  const [pitcherData, setPitcherData] = useState('');
  //点数データ
  const [scoreState, setScoreState] = useState('');
  const [scoreState1, setScoreState1] = useState([null, null, null, null, null, null, null, null, null, null, null, null]);
  const [scoreState2, setScoreState2] = useState([null, null, null, null, null, null, null, null, null, null, null, null]);
  const [totalScoreState1, setTotalScoreState1] = useState('');
  const [totalScoreState2, setTotalScoreState2] = useState('');
  //const [battersData, setBattersData] = useState([]);
  //自動更新管理
  const [autoUpdate, setAutoUpdate] = useState('');

  useEffect(() => {
    //試合情報フェッチ
    const gameStart = async () => {

      const CheckSess = await fetch("http://localhost:5000/auth/check_sess", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const sess = await CheckSess.text();

      console.log(sess)

      // if(sess === 'logout'){

      // }

      const ResGameData = await fetch("http://localhost:5000/game/a_game_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId })
      })
      const gameData = await ResGameData.json();

      //console.log(gameData)

      setGameData(gameData)
      setGameYear(gameData[0]['game_ymd'].split('-')[0]);
      setGameMonth(gameData[0]['game_ymd'].split('-')[1]);
      setGameDay(gameData[0]['game_ymd'].split('-')[2]);
      setTournamentName(gameData[0]['tournament_name']);
      setVenueName(gameData[0]['venue_name']);
      setSchoolName1(gameData[0]['school_name_1']);
      setSchoolName2(gameData[0]['school_name_2']);
      //大会登録メンバー１フェッチ
      const ResTournamentMember1 = await fetch("http://localhost:5000/member/tournament_member_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournament_id: gameData[0]['tournament_id'], school_id: gameData[0]['school_id_1'] })
        //body: JSON.stringify({ tournament_id: "35", school_id: "1" })
      })
      const member1 = await ResTournamentMember1.json();

      //console.log(member1);
      setTournamentMember1(member1);
      //大会登録メンバー２フェッチ
      const ResTournamentMember2 = await fetch("http://localhost:5000/member/tournament_member_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournament_id: gameData[0]['tournament_id'], school_id: gameData[0]['school_id_2'] })
      })
      const member2 = await ResTournamentMember2.json();
      //console.log(member2)
      const member = await member1.concat(member2);
      setTournamentMember2(member2);
      setTournamentMember(member);
      //console.log(member)
      //console.log('aasdfasdfasdfasdfasfsdfasd')

      //スタメン１フェッチ
      const ResStartingMember1 = await fetch("http://localhost:5000/member/starting_member_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId, school_id: gameData[0]['school_id_1'] })
      })
      const startMember1 = await ResStartingMember1.json();

      //console.log(startMember1)
      //console.log('aasdfasdfasdfasdfasfsdfasd')

      setStartingMember1(startMember1);

      //スタメン２フェッチ
      const ResStartingMember2 = await fetch("http://localhost:5000/member/starting_member_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId, school_id: gameData[0]['school_id_2'] })
      })
      const startMember2 = await ResStartingMember2.json();

      //console.log(startMember2)

      setStartingMember2(startMember2);

      //スタメン１＋２結合
      const startMember = await startMember1.concat(startMember2);

      //setBattersData(startMember);

      //打席情報フェッチ
      const ResDasekiData = await fetch("http://localhost:5000/daseki/tmp_daseki_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ table_name: urlTableName, game_id: urlGameId })
      })

      let daseki = await ResDasekiData.json();

      //console.log(typeof (daseki[0]['school_id']))
      //console.log(typeof (gameData[0]['school_id_1']))

      console.log(daseki)

      setNowDaseki(daseki[0]);

      if (daseki[0]['school_id'] === gameData[0]['school_id_1']) {
        console.log('inatukidesu')
        setTotalScore1(daseki[0]['total_score']);
      } else {
        setTotalScore2(daseki[0]['total_score']);
      }

      //var revDaseki = daseki;
      

      //交代情報をidから名前に変更
      daseki.forEach((dasekiValue, ind) => {
        if (dasekiValue['pinch'] !== null) {
          console.log('abcdef')
          var pinchArray = dasekiValue['pinch'].split(',');
          var tmpText = '打者交代：　';
          for (var pinch of pinchArray) {
            var pinchNum = pinch.split('→');
            for (var value1 of member) {
              if (value1['player_id'].toString() === pinchNum[0]) {
                tmpText = tmpText + value1['player_name_kanji'].split(' ')[0] + '→';
                for (var value2 of member) {
                  if (value2['player_id'].toString() === pinchNum[1]) {
                    tmpText = tmpText + value2['player_name_kanji'].split(' ')[0] + '　';
                  }
                }
              }
            }
          }
          daseki[ind]['pinch'] = tmpText;
        }
      })
      setPinchText(daseki[0]['pinch']);
      setDasekiData(daseki);

      //スコア取得
      //スコアの初期化
      const InitialScore = [
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null]
      ]

      const scoreArray = [
        [],
        []
      ]

      let sendScore = InitialScore
      let sendScores = scoreArray

      console.log(sendScores)

      var sumScore = function(scores){
        var tmpScore = 0; 
        //console.log(scores)
        for(var score of scores){
          tmpScore += score;
        }
        return tmpScore;
      }

      var revDaseki = [...daseki].reverse();

      // console.log(revDaseki)
      // console.log(daseki)

      revDaseki.map((u) => {
        //null対策
        if (sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] === null) sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = 0
        //受け取ったスコアを配列に格納
        var ind = u.inning % 10 - 1;
        if(ind === 0){
          var rind = 1;
        }else{
          var rind = 0;
        } 
        sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] + u.score
        //console.log(Math.floor(u.inning / 10) - 1)
        sendScores[u.inning % 10 - 1].push(u.total_score)
        //console.log(sumScore(sendScore[rind]))
        sendScores[rind].push(sumScore(sendScore[rind]));
      })
      // sendScores[0].reverse();
      // sendScores[1].reverse();
      setScoreState(sendScores.reverse());

      
      console.log(sendScore[0][0])
      setScoreState1(sendScore[0]);
      setScoreState2(sendScore[1]);
      setTotalScoreState1(sumScore(sendScore[0]));
      setTotalScoreState2(sumScore(sendScore[1]));
      // var sumScore1 = sumScore(sendScore[0]);
      // var sumScore2 = sumScore(sendScore[1]);

      console.log(sendScore[0]);

      //現在の回数を算出
      var stateArray = daseki[0]['inning'].toString().split("");
      //console.log(stateArray)
      if (stateArray[stateArray.length - 1] === '1') {
        setNowState(stateArray[0] + '回表');
      } else {
        setNowState(stateArray[0] + '回裏');
      }
      //バッター情報を登録
      setBatterData(daseki[0]);

      //投手IDと一致する名前の検索
      for (var pitcher of tournamentMember) {
        if (pitcher['player_id'] === daseki[0]['pitcher_id']) {
          setPitcherData(pitcher);
          break
        }
      }
    }
    gameStart();
  }, [autoUpdate]);

  var cntUpdate = 0;
  //console.log(scoreState[0][0])
  var ballcnt = 0;
  function change_ball_count() {
    ballcnt += 1;

    if (ballcnt === 1) {
      console.log(1);

      document.getElementById("ball1").style.backgroundColor = "green";
    }
    else if (ballcnt === 2) {
      console.log(2);
      document.getElementById("ball2").style.backgroundColor = "green";
    }
    else if (ballcnt === 3) {
      console.log(3);
      document.getElementById("ball3").style.backgroundColor = "green";
    }
    else if (ballcnt === 4) {
      console.log(4);
      document.getElementById("ball4").style.backgroundColor = "green";
    }
    else {
      document.getElementById("ball1").style.backgroundColor = "black";
      document.getElementById("ball2").style.backgroundColor = "black";
      document.getElementById("ball3").style.backgroundColor = "black";
      document.getElementById("ball4").style.backgroundColor = "black";
      ballcnt = 0;
    }
  }

  var strcnt = 0;
  function change_str_count() {
    strcnt += 1;

    if (strcnt === 1) {
      console.log(1);
      document.getElementById("str1").style.backgroundColor = "yellow";
    }
    else if (strcnt === 2) {
      console.log(2);
      document.getElementById("str2").style.backgroundColor = "yellow";
    }
    else if (strcnt === 3) {
      console.log(3);
      document.getElementById("str3").style.backgroundColor = "yellow";
    }
    else {
      document.getElementById("str1").style.backgroundColor = "black";
      document.getElementById("str2").style.backgroundColor = "black";
      document.getElementById("str3").style.backgroundColor = "black";
      strcnt = 0;
    }
  }

  var outcnt = 0;
  function change_out_count() {
    outcnt += 1;

    if (outcnt === 1) {
      console.log(1);
      document.getElementById("out1").style.backgroundColor = "red";
    }
    else if (outcnt === 2) {
      console.log(2);
      document.getElementById("out2").style.backgroundColor = "red";
    }
    else if (outcnt === 3) {
      console.log(3);
      document.getElementById("out3").style.backgroundColor = "red";
    }
    else {
      document.getElementById("out1").style.backgroundColor = "black";
      document.getElementById("out2").style.backgroundColor = "black";
      document.getElementById("out3").style.backgroundColor = "black";
      outcnt = 0;
    }
  }

  function beforebatter() {

  }

  function nextbatter() {

  }

  const logStyle = {
    width: "50%",
    height: "4vw",
    fontSize: "3vw"
  }

  // 3秒ごとに実行
  setInterval(() => {
    cntUpdate++;
    //console.log(cntUpdate);
    setAutoUpdate(cntUpdate);
  }, 30000);

  //const tournamentName = gameData[0]['tournament_name'];
  //const venueName = gameData[0]['venue_name'];


  return (
    <div style={pageStyle}>
      <div style={infoStyle}>
        <div style={borderStyle}>{gameYear}年{gameMonth}月{gameDay}日 {tournamentName} {venueName}</div>
      </div>
      <div style={group}>
        <textarea style={resultStyle} readOnly defaultValue={nowState} />
        <div>{nowDaseki['text_inf']}</div>
      </div><br></br>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={thStyle}></th>
            <th style={thStyle}>1</th>
            <th style={thStyle}>2</th>
            <th style={thStyle}>3</th>
            <th style={thStyle}>4</th>
            <th style={thStyle}>5</th>
            <th style={thStyle}>6</th>
            <th style={thStyle}>7</th>
            <th style={thStyle}>8</th>
            <th style={thStyle}>9</th>
            <th style={thStyle}>計</th>
          </tr>
          <tr>
            <td style={team1Style}>{schoolName1}</td>
            <td style={tdStyle}>{scoreState1[0]}</td>
            <td style={tdStyle}>{scoreState1[1]}</td>
            <td style={tdStyle}>{scoreState1[2]}</td>
            <td style={tdStyle}>{scoreState1[3]}</td>
            <td style={tdStyle}>{scoreState1[4]}</td>
            <td style={tdStyle}>{scoreState1[5]}</td>
            <td style={tdStyle}>{scoreState1[6]}</td>
            <td style={tdStyle}>{scoreState1[7]}</td>
            <td style={tdStyle}>{scoreState1[8]}</td>
            <td style={tdStyle}>{totalScoreState1}</td>
          </tr>
          <tr>
            <td style={team2Style}>{schoolName2}</td>
            <td style={tdStyle}>{scoreState2[0]}</td>
            <td style={tdStyle}>{scoreState2[1]}</td>
            <td style={tdStyle}>{scoreState2[2]}</td>
            <td style={tdStyle}>{scoreState2[3]}</td>
            <td style={tdStyle}>{scoreState2[4]}</td>
            <td style={tdStyle}>{scoreState2[5]}</td>
            <td style={tdStyle}>{scoreState2[6]}</td>
            <td style={tdStyle}>{scoreState2[7]}</td>
            <td style={tdStyle}>{scoreState2[8]}</td>
            <td style={tdStyle}>{totalScoreState2}</td>
          </tr>
        </tbody>

      </table><br></br>
      <div style={group2}>

        <table style={playertableStyle}>
          <tbody>
            <tr><th style={schoolStyle} colSpan="2">{schoolName1}</th></tr>
            <tr><th style={batterStyle}>打者</th><th style={playerStyle}>{batterData['player_name_kanji']}</th></tr>
            {pinchText !== '' && <tr><th style={playerStyle} colSpan="2">{pinchText}</th></tr>}
          </tbody>
        </table>

        <table style={playertableStyle}>
          <tbody>
            <tr><th style={schoolStyle} colSpan="2">{schoolName2}</th></tr>
            <tr><th style={pitcherStyle}>投手</th><th style={playerStyle}>{pitcherData['player_name_kanji']}</th></tr>
            {/* <tr><th style={playerStyle} colSpan="2">投手の情報</th></tr> */}
          </tbody>
        </table>
      </div><br></br>
      <div style={group2}>
        <table style={playertableStyle}>
          <tbody>
            <tr><th style={playerresultStyle}>打者成績</th><th style={playerStyle}>代打または現在の打者の今日の成績</th></tr>
          </tbody>
        </table>
        <table style={playertableStyle}>
          <tbody>
            <tr><th style={playerresultStyle}>投手成績</th><th style={playerStyle}>投手交代または現在の投手の今日の成績</th></tr>
          </tbody>
        </table>
      </div>
      {/* <div>
        <div align="center" className="out-result">

          <div style={countStyle}> B </div>
          <div id="ball1"></div>
          <div id="ball2"></div>
          <div id="ball3"></div>
          <div id="ball4"></div>

          <div style={countStyle}> S </div>
          <div id="str1"></div>
          <div id="str2"></div>
          <div id="str3"></div>

          <div style={countStyle}> O
          </div>
          <div id="out1"></div>
          <div id="out2"></div>
          <div id="out3"></div>
        </div>
        <button onClick={change_ball_count}>ボール</button>
        <button onClick={change_str_count}>ストライク</button>
        <button onClick={change_out_count}>アウト</button>
      </div> */}
      <div style={fieldStyle}><img src={pic} alt="field" style={imgsize} /></div><br></br>
      <button onClick={beforebatter} style={logStyle}>前の打席</button>
      <button onClick={nextbatter} style={logStyle}>次の打席</button><br></br>
      <div className="textSokuhou">
        <span class="box-title">テキスト速報</span>
        <DasekiHistoryList dasekiesInfo={dasekiData} gameData={gameData} score={scoreState} scoreState1={scoreState1} scoreState2={scoreState2}/>
      </div>
      <div>
        <div className="startingMemberTag">先発メンバー</div>
        <div className="startingMember">
          <div className="schoolBox">{schoolName1}</div>
          <table border="1" className="members">
            <tr>
              <td width="8%" height="50" rowspan="2" bgcolor="#228b22">打順</td>
              <td width="30%" height="50" bgcolor="#228b22">名前</td>
              <td width="10%" height="50" rowspan="2" bgcolor="#228b22">背番号</td>
              <td width="18%" height="50" rowspan="2" bgcolor="#228b22">ポジション</td>
              <td width="16%" height="50" rowspan="2" bgcolor="#228b22">打率</td>
            </tr>
          </table>
          <StartingMemberList startingMembers={startingMember1} />


          <div className="schoolBox">{schoolName2}</div>
          <table border="1" className="members">
            <tr>
              <td width="8%" height="50" rowspan="2" bgcolor="#228b22">打順</td>
              <td width="30%" height="50" bgcolor="#228b22">名前</td>
              <td width="10%" height="50" rowspan="2" bgcolor="#228b22">背番号</td>
              <td width="18%" height="50" rowspan="2" bgcolor="#228b22">ポジション</td>
              <td width="16%" height="50" rowspan="2" bgcolor="#228b22">打率</td>
            </tr>
          </table>
          <StartingMemberList startingMembers={startingMember2} />
        </div>
      </div>
    </div>
  )
}
export default OutPutGame;