import pic from "./field2.png"
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DasekiHistoryList from "./DasekiHistoryList";
import StartingMemberList from './StartingMemberList'

import { useCookies } from "react-cookie";

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

export const Bulletin = () => {

  const intervalRef = useRef(null);

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const [searchParams] = useSearchParams();
  // const urlTableName = searchParams.get("urlTableName");
  const urlGameId = searchParams.get("urlGameId");
  // const urlTableName = "test116";
  // const urlGameId = "1";
  // const urlSchoolId1 = searchParams.get("urlSchoolId1");
  // const urlSchoolId2 = searchParams.get("urlSchoolId2");
  //打席情報
  //試合全体の打席情報
  const [dasekiData, setDasekiData] = useState([]);
  // const [revDasekiData, setRevDasekiData] = useState([]);
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
  //現在の学校名１
  const [nowSchoolName1, setNowSchoolName1] = useState('');
  //現在の学校名２
  const [nowSchoolName2, setNowSchoolName2] = useState('');
  //トータルスコア１
  const [totalScore1, setTotalScore1] = useState(0);
  //トータルスコア２
  const [totalScore2, setTotalScore2] = useState(0);

  const [dasekiScore, setDasekiScore] = useState([]);
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
  //自動更新flag
  const [autoUpdateFlag, setAutoUpdateFlag] = useState(true);
  //自動更新管理
  const [autoUpdate, setAutoUpdate] = useState('');
  //手動更新管理
  const [manualUpdate, setManualUpdate] = useState('');

  useEffect(() => {
    //試合情報フェッチ
    const gameStart = async () => {
      const CheckSess = await fetch("http://localhost:5000/auth/check_sess", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionID: cookies.sessionID })
      })
      const sess = await CheckSess.text();

      console.log(sess)

      if (sess === 'logout') {
        // navigate("/login");
        // return <Redirect to="http://localhost:3000/login"/>
      }
      // if(sess === 'logout'){
      //   navigate("/login");
      //   // return <Redirect to="http://localhost:3000/login"/>
      // }

      const ResGameData = await fetch("http://localhost:5000/game/a_game_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId })
      })
      const GameData = await ResGameData.json();

      //console.log(GameData)

      setGameData(GameData)
      setGameYear(GameData[0]['game_ymd'].split('-')[0]);
      setGameMonth(GameData[0]['game_ymd'].split('-')[1]);
      setGameDay(GameData[0]['game_ymd'].split('-')[2]);
      setTournamentName(GameData[0]['tournament_name']);
      setSchoolName1(GameData[0]['school_name_1']);
      setSchoolName2(GameData[0]['school_name_2']);

      //大会登録メンバー１フェッチ
      const ResTournamentMember1 = await fetch("http://localhost:5000/member/tournament_member_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournament_id: GameData[0]['tournament_id'], school_id: GameData[0]['school_id_1'] })
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
        body: JSON.stringify({ tournament_id: GameData[0]['tournament_id'], school_id: GameData[0]['school_id_2'] })
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
        body: JSON.stringify({ game_id: urlGameId, school_id: GameData[0]['school_id_1'] })
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
        body: JSON.stringify({ game_id: urlGameId, school_id: GameData[0]['school_id_2'] })
      })
      const startMember2 = await ResStartingMember2.json();

      //console.log(startMember2)

      setStartingMember2(startMember2);

      //スタメン１＋２結合
      const startMember = await startMember1.concat(startMember2);

      //setBattersData(startMember);

      const ResTableName = await fetch("http://localhost:5000/game/ref_table_name", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId })
      })
      const tableName = await ResTableName.json();

      //console.log(tableName[0]['tmp_table_name'])
      //打席情報フェッチ
      const ResDasekiData = await fetch("http://localhost:5000/daseki/tmp_daseki_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ table_name: tableName[0]['tmp_table_name'], game_id: urlGameId })
      })
      let daseki = await ResDasekiData.json();

      setVenueName(GameData[0]['venue_name']);

      //console.log(typeof (daseki[0]['school_id']))
      //console.log(typeof (gameData[0]['school_id_1']))

      console.log(daseki)

      var dasekiInd = await daseki.length - 1;

      //console.log(dasekiInd)

      setNowDaseki(daseki[dasekiInd]);

      if (daseki[dasekiInd]['school_id'] === GameData[0]['school_id_1']) {
        //console.log('inatukidesu')
        setTotalScore1(daseki[dasekiInd]['total_score']);
      } else {
        setTotalScore2(daseki[dasekiInd]['total_score']);
      }

      if (daseki[dasekiInd]['school_id'] === GameData[0]['school_id_1']) {
        setNowSchoolName1(GameData[0]['school_name_1']);
        setNowSchoolName2(GameData[0]['school_name_2']);
      } else {
        setNowSchoolName1(GameData[0]['school_name_2']);
        setNowSchoolName2(GameData[0]['school_name_1']);
      }


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
      setPinchText(daseki[dasekiInd]['pinch']);
      setDasekiData(daseki);

      //console.log(daseki)
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
      //let perScore = scoreArray

      //console.log(sendScores)

      var sumScore = function (scores) {
        var tmpScore = 0;
        //console.log(scores)
        for (var score of scores) {
          tmpScore += score;
        }
        return tmpScore;
      }

      //var revDaseki = [...daseki].reverse();

      // console.log(revDaseki)
      // console.log(daseki)

      daseki.map((u) => {
        //null対策
        if (sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] === null) sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = 0
        //受け取ったスコアを配列に格納
        var ind = u.inning % 10 - 1;
        if (ind === 0) {
          var rind = 1;
        } else {
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
      setScoreState(sendScores);
      // console.log(sendScore)
      // console.log(sendScores)

      //console.log(sendScore[0][0])
      setScoreState1(sendScore[0]);
      setScoreState2(sendScore[1]);
      setTotalScoreState1(sumScore(sendScore[0]));
      setTotalScoreState2(sumScore(sendScore[1]));
      // var sumScore1 = sumScore(sendScore[0]);
      // var sumScore2 = sumScore(sendScore[1]);

      //console.log(sendScore[0]);

      //現在の回数を算出
      var stateArray = daseki[dasekiInd]['inning'].toString().split("");
      //console.log(stateArray)
      if (stateArray[stateArray.length - 1] === '1') {
        setNowState(stateArray[0] + '回表');
      } else {
        setNowState(stateArray[0] + '回裏');
      }
      //バッター情報を登録
      setBatterData(daseki[dasekiInd]);

      //投手IDと一致する名前の検索
      for (var pitcher of tournamentMember) {
        if (pitcher['player_id'] === daseki[dasekiInd]['pitcher_id']) {
          setPitcherData(pitcher);
          break
        }
      }
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    }
    gameStart();
  }, [autoUpdate, manualUpdate]);

  useEffect(() => {
    if(intervalRef.current === null){
      setAutoUpdateFlag(true);
      intervalRef.current = setInterval(() => {
        cntUpdate++;
        // console.log(autoUpdateFlag);
        // console.log(cntUpdate);
        setAutoUpdate(cntUpdate);
      }, 60000);
    }
  }, [])

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

  function autoUpdateButton() {
    setAutoUpdateFlag(true);
    if(intervalRef.current === null){
      intervalRef.current = setInterval(() => {
        cntUpdate++;
        // console.log(autoUpdateFlag);
        // console.log(cntUpdate);
        setAutoUpdate(cntUpdate)
      }, 60000);
    }
    //setAutoUpdate(cntUpdate);
  }

  function manualUpdateButton() {
    setAutoUpdateFlag(false);
    console.log(intervalRef.current)
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    cntUpdate = 0;
  }

  function updateButton() {
    if (autoUpdateFlag === false) {
      setManualUpdate(manualUpdate + 1);
    }
  }

  function skipDaseki(dinning){
      //console.log(dasekiData[nowDaseki['at_bat_id'] - 2])
      console.log('aaaaa')
      var tmpNowDaseki = dasekiData.find(function(u){
        return u.inning === dinning;
      })
      //console.log(tmpNowDaseki)
      setNowDaseki(tmpNowDaseki);
      setPinchText(tmpNowDaseki["pinch"]);
      // setNowDaseki(dasekiData[nowDaseki['at_bat_id'] - 2]);
      //var tmpNowDaseki = dasekiData[nowDaseki['at_bat_id'] - 1];
      //console.log(nowDaseki[])
      if (tmpNowDaseki['school_id'] === gameData[0]['school_id_1']) {
        setNowSchoolName1(gameData[0]['school_name_1']);
        setNowSchoolName2(gameData[0]['school_name_2']);
      } else {
        setNowSchoolName1(gameData[0]['school_name_2']);
        setNowSchoolName2(gameData[0]['school_name_1']);
      }
      //現在第何打席(配列の添え字)かをnowBatで保持
      var nowBat = tmpNowDaseki['at_bat_id'] - 1;
      //console.log(beforeBat)

      const InitialScore = [
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null]
      ]

      let sendScore = InitialScore;

      dasekiData.slice(0, nowBat).map((u) => {
        //null対策
        if (sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] === null) sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = 0
        //受け取ったスコアを配列に格納
        sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] + u.score
        //console.log(Math.floor(u.inning / 10) - 1)
      })

      var sumScore = function (scores) {
        var tmpScore = 0;
        //console.log(scores)
        for (var score of scores) {
          tmpScore += score;
        }
        return tmpScore;
      }

      setScoreState1(sendScore[0]);
      setScoreState2(sendScore[1]);
      setTotalScoreState1(sumScore(sendScore[0]));
      setTotalScoreState2(sumScore(sendScore[1]));

      //console.log(dasekiData[beforeBat])
      setBatterData(dasekiData[nowBat]);
      for (var pitcher of tournamentMember) {
        if (pitcher['player_id'] === dasekiData[nowBat]['pitcher_id']) {
          setPitcherData(pitcher);
          break
        }
      }

      //console.log(sendScore)

      //現在の回数を算出
      //仕様上の問題で回が変わる最初のinning以外をnullにしている
      if (dasekiData[nowBat]['inning'] !== null) {
        var stateArray = dasekiData[nowBat]['inning'].toString().split("");
        //console.log(stateArray)
        if (stateArray[stateArray.length - 1] === '1') {
          setNowState(stateArray[0] + '回表');
        } else {
          setNowState(stateArray[0] + '回裏');
        }
      }
      setNowDaseki(dasekiData[nowBat]);
  }

  function beforebatter() {
    //console.log('beforebatter')
    //前に打席データがあるかを判定
    //あれば前の打席データを表示しなければreturn
    if (nowDaseki['at_bat_id'] - 1 <= 0) {
      return;
    } else {
      console.log(dasekiData[nowDaseki['at_bat_id'] - 2])
      setNowDaseki(dasekiData[nowDaseki['at_bat_id'] - 2]);
      setPinchText(dasekiData[nowDaseki['at_bat_id'] - 2]["pinch"]);
      //var tmpNowDaseki = dasekiData[nowDaseki['at_bat_id'] - 1];
      //console.log(nowDaseki[])
      if (dasekiData[nowDaseki['at_bat_id'] - 2]['school_id'] === gameData[0]['school_id_1']) {
        setNowSchoolName1(gameData[0]['school_name_1']);
        setNowSchoolName2(gameData[0]['school_name_2']);
      } else {
        setNowSchoolName1(gameData[0]['school_name_2']);
        setNowSchoolName2(gameData[0]['school_name_1']);
      }
      //現在第何打席かをbeforeBatに保持する
      var beforeBat = nowDaseki['at_bat_id'] - 2;
      //console.log(beforeBat)

      const InitialScore = [
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null]
      ]

      let sendScore = InitialScore;

      dasekiData.slice(0, beforeBat).map((u) => {
        //null対策
        if (sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] === null) sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = 0
        //受け取ったスコアを配列に格納
        sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] + u.score
        //console.log(Math.floor(u.inning / 10) - 1)
      })

      var sumScore = function (scores) {
        var tmpScore = 0;
        //console.log(scores)
        for (var score of scores) {
          tmpScore += score;
        }
        return tmpScore;
      }

      setScoreState1(sendScore[0]);
      setScoreState2(sendScore[1]);
      setTotalScoreState1(sumScore(sendScore[0]));
      setTotalScoreState2(sumScore(sendScore[1]));

      //console.log(dasekiData[beforeBat])
      setBatterData(dasekiData[beforeBat]);
      for (var pitcher of tournamentMember) {
        if (pitcher['player_id'] === dasekiData[beforeBat]['pitcher_id']) {
          setPitcherData(pitcher);
          break
        }
      }

      //console.log(sendScore)

      //現在の回数を算出
      //仕様上の問題で回が変わる最初のinning以外をnullにしている
      if (dasekiData[beforeBat]['inning'] !== null) {
        var stateArray = dasekiData[beforeBat]['inning'].toString().split("");
        //console.log(stateArray)
        if (stateArray[stateArray.length - 1] === '1') {
          setNowState(stateArray[0] + '回表');
        } else {
          setNowState(stateArray[0] + '回裏');
        }
      }
      setNowDaseki(dasekiData[beforeBat]);
    }
  }

  function nextbatter() {
    //console.log('nextbatter')

    if (nowDaseki['at_bat_id'] >= dasekiData.length) {
      return;
    } else {
      console.log(dasekiData[nowDaseki['at_bat_id']]);
      setNowDaseki(dasekiData[nowDaseki['at_bat_id']]);
      setPinchText(dasekiData[nowDaseki['at_bat_id']]["pinch"]);
      if (dasekiData[nowDaseki['at_bat_id']]['school_id'] === gameData[0]['school_id_1']) {
        setNowSchoolName1(gameData[0]['school_name_1']);
        setNowSchoolName2(gameData[0]['school_name_2']);
      } else {
        setNowSchoolName1(gameData[0]['school_name_2']);
        setNowSchoolName2(gameData[0]['school_name_1']);
      }
      //現在の第何打席かをbeforeBatに保持する
      var nextBat = nowDaseki['at_bat_id'];

      const InitialScore = [
        [null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null]
      ]

      let sendScore = InitialScore;

      dasekiData.slice(0, nextBat).map((u) => {
        //null対策
        if (sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] === null) sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = 0
        //受け取ったスコアを配列に格納
        sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] = sendScore[u.inning % 10 - 1][Math.floor(u.inning / 10) - 1] + u.score
        //console.log(Math.floor(u.inning / 10) - 1)
      })

      var sumScore = function (scores) {
        var tmpScore = 0;
        //console.log(scores)
        for (var score of scores) {
          tmpScore += score;
        }
        return tmpScore;
      }

      setScoreState1(sendScore[0]);
      setScoreState2(sendScore[1]);
      setTotalScoreState1(sumScore(sendScore[0]));
      setTotalScoreState2(sumScore(sendScore[1]));

      //console.log(sendScore)
      //console.log(dasekiData[nextBat])
      setBatterData(dasekiData[nextBat]);
      for (var pitcher of tournamentMember) {
        if (pitcher['player_id'] === dasekiData[nextBat]['pitcher_id']) {
          setPitcherData(pitcher);
          break
        }
      }

      //現在の回数を算出
      if (dasekiData[nextBat]['inning'] !== null) {
        var stateArray = dasekiData[nextBat]['inning'].toString().split("");
        //console.log(stateArray)
        if (stateArray[stateArray.length - 1] === '1') {
          setNowState(stateArray[0] + '回表');
        } else {
          setNowState(stateArray[0] + '回裏');
        }
      }
      setNowDaseki(dasekiData[nextBat]);
    }
  }

  const logStyle = {
    width: "50%",
    height: "4vw",
    fontSize: "3vw"
  }

  //const tournamentName = gameData[0]['tournament_name'];
  //const venueName = gameData[0]['venue_name'];

  // const beforebatter = () => {};


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
            <td onClick={skipDaseki.bind(this, 11)} style={tdStyle}>{scoreState1[0]}</td>
            <td onClick={skipDaseki.bind(this, 21)} style={tdStyle}>{scoreState1[1]}</td>
            <td onClick={skipDaseki.bind(this, 31)} style={tdStyle}>{scoreState1[2]}</td>
            <td onClick={skipDaseki.bind(this, 41)} style={tdStyle}>{scoreState1[3]}</td>
            <td onClick={skipDaseki.bind(this, 51)} style={tdStyle}>{scoreState1[4]}</td>
            <td onClick={skipDaseki.bind(this, 61)} style={tdStyle}>{scoreState1[5]}</td>
            <td onClick={skipDaseki.bind(this, 71)} style={tdStyle}>{scoreState1[6]}</td>
            <td onClick={skipDaseki.bind(this, 81)} style={tdStyle}>{scoreState1[7]}</td>
            <td onClick={skipDaseki.bind(this, 91)} style={tdStyle}>{scoreState1[8]}</td>
            <td style={tdStyle}>{totalScoreState1}</td>
          </tr>
          <tr>
            <td style={team2Style}>{schoolName2}</td>
            <td onClick={skipDaseki.bind(this, 12)} style={tdStyle}>{scoreState2[0]}</td>
            <td onClick={skipDaseki.bind(this, 22)} style={tdStyle}>{scoreState2[1]}</td>
            <td onClick={skipDaseki.bind(this, 32)} style={tdStyle}>{scoreState2[2]}</td>
            <td onClick={skipDaseki.bind(this, 42)} style={tdStyle}>{scoreState2[3]}</td>
            <td onClick={skipDaseki.bind(this, 52)} style={tdStyle}>{scoreState2[4]}</td>
            <td onClick={skipDaseki.bind(this, 62)} style={tdStyle}>{scoreState2[5]}</td>
            <td onClick={skipDaseki.bind(this, 72)} style={tdStyle}>{scoreState2[6]}</td>
            <td onClick={skipDaseki.bind(this, 82)} style={tdStyle}>{scoreState2[7]}</td>
            <td onClick={skipDaseki.bind(this, 92)} style={tdStyle}>{scoreState2[8]}</td>
            <td style={tdStyle}>{totalScoreState2}</td>
          </tr>
        </tbody>

      </table><br></br>
      <div style={group2}>

        <table style={playertableStyle}>
          <tbody>
            <tr><th style={schoolStyle} colSpan="2">{nowSchoolName1}</th></tr>
            <tr><th style={batterStyle}>打者</th><th style={playerStyle}>{batterData['player_name_kanji']}</th></tr>
            {pinchText !== '' && <tr><th style={playerStyle} colSpan="2">{pinchText}</th></tr>}
          </tbody>
        </table>

        <table style={playertableStyle}>
          <tbody>
            <tr><th style={schoolStyle} colSpan="2">{nowSchoolName2}</th></tr>
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
      <div>
        <button onClick={() => { autoUpdateButton() }} style={logStyle}>自動更新</button>
        <button onClick={() => { manualUpdateButton() }} style={logStyle}>手動更新</button>
        <button onClick={updateButton} style={logStyle}>更新↺</button>
      </div>
      <div style={fieldStyle}><img src={pic} alt="field" style={imgsize} /></div><br></br>
      <button onClick={beforebatter} style={logStyle}>前の打席</button>
      <button onClick={nextbatter} style={logStyle}>次の打席</button><br></br>
      <div className="textSokuhou">
        <span class="box-title">テキスト速報</span>
        <DasekiHistoryList dasekiesInfo={[...dasekiData].reverse()} gameData={gameData} score={scoreState} />
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
export default Bulletin;