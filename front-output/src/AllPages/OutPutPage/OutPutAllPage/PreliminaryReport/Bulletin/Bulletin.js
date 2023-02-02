import "./App.css"
import "./OutPutGame.css"
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DasekiHistoryList from "./DasekiHistoryList";
import StartingMemberList from './StartingMemberList'
import { Ground } from './Ground';
import { battedBall } from './battedBall';

import { useCookies } from "react-cookie";
import OutPutGame from "../../../../OutPutGame/OutPutGame";

import { outCount } from './outCount'

import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

//import "./App.css";


//バックエンドのurlを取得
const backendUrl = require("../../../../../DB/communication").backendUrl;


const group2 = {
  display: "flex",
  justifyContent: 'space-around',
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
  const [matchNum, setMatchNum] = useState('');
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
  const [resultScore1, setResultScore1] = useState('default');
  //トータルスコア２
  const [totalScore2, setTotalScore2] = useState(0);
  const [resultScore2, setResultScore2] = useState('default');

  //アウトカウント    
  const [nowOutCountState, setNowOutCountState] = useState(0);

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

  const [flag, setFlag] = useState(2);

  useEffect(() => {
    //試合情報フェッチ
    const gameStart = async () => {
      const CheckSess = await fetch(backendUrl + "/auth/check_sess", {
        method: "POST", mode: "cors",
        headers: { "Content-Type": "application/json", }, body: JSON.stringify({ sessionID: cookies.sessionID })
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

      const ResGameData = await fetch(backendUrl + "/game/a_game_call", {
        method: "POST", mode: "cors", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ game_id: urlGameId })
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
      setMatchNum(GameData[0]['match_num']);
      //setGameSet(GameData[0]['match_results']);
      if (GameData[0]['match_results'] !== '' && GameData[0]['match_results'] !== null) {
        setResultScore1(GameData[0]['match_results'].split('-')[0]);
        setResultScore1(GameData[1]['match_results'].split('-')[1]);
      }


      //大会登録メンバー１フェッチ
      const ResTournamentMember1 = await fetch(backendUrl + "/member/tournament_member_call", {
        method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ tournament_id: GameData[0]['tournament_id'], school_id: GameData[0]['school_id_1'] })
        //body: JSON.stringify({ tournament_id: "35", school_id: "1" })
      })
      const member1 = await ResTournamentMember1.json();

      //console.log(member1);
      setTournamentMember1(member1);
      //大会登録メンバー２フェッチ
      const ResTournamentMember2 = await fetch(backendUrl + "/member/tournament_member_call", {
        method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
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
      const ResStartingMember1 = await fetch(backendUrl + "/member/starting_member_call", {
        method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ game_id: urlGameId, school_id: GameData[0]['school_id_1'] })
      })
      const startMember1 = await ResStartingMember1.json();

      //console.log(startMember1)
      //console.log('aasdfasdfasdfasdfasfsdfasd')

      setStartingMember1(startMember1);

      //スタメン２フェッチ
      const ResStartingMember2 = await fetch(backendUrl + "/member/starting_member_call", {
        method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ game_id: urlGameId, school_id: GameData[0]['school_id_2'] })
      })
      const startMember2 = await ResStartingMember2.json();

      //console.log(startMember2)

      setStartingMember2(startMember2);

      //スタメン１＋２結合
      const startMember = await startMember1.concat(startMember2);

      //setBattersData(startMember);

      const ResTableName = await fetch(backendUrl + "/game/ref_table_name", {
        method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ game_id: urlGameId })
      })
      const tableName = await ResTableName.json();

      //console.log(tableName[0]['tmp_table_name'])

      //打席情報フェッチ
      if (GameData[0]['match_results'] === null) {
        const ResDasekiData = await fetch(backendUrl + "/daseki/tmp_daseki_call", {
          method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
          body: JSON.stringify({ table_name: tableName[0]['tmp_table_name'], game_id: urlGameId })
        })
        var daseki = await ResDasekiData.json();
      } else {
        const ResDasekiData = await fetch(backendUrl + "/daseki/daseki_transmission", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ game_id: urlGameId })
        })
        var daseki = await ResDasekiData.json();
      }

      setVenueName(GameData[0]['venue_name']);

      console.log(daseki)

      //console.log(typeof (daseki[0]['school_id']))
      //console.log(typeof (gameData[0]['school_id_1']))

      var dasekiInd = await daseki.length - 1;

      //console.log(dasekiInd)

      setNowDaseki(daseki[dasekiInd]);

      setNowOutCountState(daseki[dasekiInd]['outcount']);

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
      for (var pitcher of member) {
        if (pitcher['player_id'] === daseki[dasekiInd]['pitcher_id']) {
          setPitcherData(pitcher);
          break
        }
      }



      //console.log("ここから追加");
      console.log(daseki);
      //ここから追加しました
      const canvasSize = 2000;

      const homebase = 520;
      const h = 70;
      const l = -110;
      const w = 0.03 * homebase;  //ベースの幅
      const margin = 10;    //ベース位置調整用

      const canvas = document.getElementById("canvas")
      const canvasContext = canvas.getContext("2d")
      var context = canvasContext
      if (context !== null) {
        Ground(context);
      }

      if (context !== null) {

        //削除
        context.clearRect(0, 0, canvasSize, canvasSize);

        Ground(context);

        console.log(daseki[0]['base']);
        console.log(typeof (daseki[0]['base']));
        //ベースの色
        let baseColor2 = new Array(3).fill("white");
        //let runnerCountState = [];
        console.log(daseki[0]['base']);
        let base = daseki[dasekiInd]['base'].split('');
        if (base[0] === '1') {
          baseColor2[2] = "blue";
        }
        if (base[1] === '1') {
          baseColor2[1] = "blue";
        }
        if (base[2] === '1') {
          baseColor2[0] = "blue";
        }


        context.strokeStyle = "black";

        //３塁ベース
        context.fillStyle = baseColor2[2];
        context.beginPath();
        context.moveTo(homebase * 3 / 4 + l, homebase * 3 / 4 - margin + h);
        context.lineTo(homebase * 3 / 4 - w + l, homebase * 3 / 4 + w - margin + h);
        context.lineTo(homebase * 3 / 4 + l, homebase * 3 / 4 + w * 2 - margin + h);
        context.lineTo(homebase * 3 / 4 + w + l, homebase * 3 / 4 + w - margin + h);
        context.closePath();
        context.fill();
        context.lineWidth = 1;
        context.stroke();

        //2塁ベース
        context.fillStyle = baseColor2[1];
        context.beginPath();
        context.moveTo(homebase + l, homebase / 2 - margin + h);
        context.lineTo(homebase - w + l, homebase / 2 + w - margin + h);
        context.lineTo(homebase + l, homebase / 2 + w * 2 - margin + h);
        context.lineTo(homebase + w + l, homebase / 2 + w - margin + h);
        context.closePath();
        context.fill();
        context.stroke();

        //1塁ベース
        context.fillStyle = baseColor2[0];
        context.beginPath();
        context.moveTo(homebase * 5 / 4 + l, homebase * 3 / 4 - margin + h);
        context.lineTo(homebase * 5 / 4 - w + l, homebase * 3 / 4 + w - margin + h);
        context.lineTo(homebase * 5 / 4 + l, homebase * 3 / 4 + w * 2 - margin + h);
        context.lineTo(homebase * 5 / 4 + w + l, homebase * 3 / 4 + w - margin + h);
        context.closePath();
        context.fill();
        context.stroke();

        console.log(daseki);
        let X = Number(daseki[dasekiInd]['touched_coordinate'].split('_')[0]);
        let Y = Number(daseki[dasekiInd]['touched_coordinate'].split('_')[1]);

        // let X = 1;
        // let Y = 1;
        console.log(X);

        battedBall(context, X, Y, Number(daseki[dasekiInd]['ball_kind']));

      }
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    }
    gameStart();
  }, [autoUpdate, manualUpdate]);

  useEffect(() => {
    if (intervalRef.current === null) {
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
    if (intervalRef.current === null) {
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

  function skipDaseki(dinning) {
    if (dinning > dasekiData[dasekiData.length - 1]['inning']) {
      return;
    } else {
      //console.log(dasekiData[nowDaseki['at_bat_id'] - 2])
      console.log('aaaaa')
      var tmpNowDaseki = dasekiData.find(function (u) {
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
      setNowOutCountState(dasekiData[nowBat]['outcount']);


      //ここから追加しました
      const canvasSize = 2000;

      const homebase = 520;
      const h = 70;
      const l = -110;
      const w = 0.03 * homebase;  //ベースの幅
      const margin = 10;    //ベース位置調整用

      const canvas = document.getElementById("canvas")
      const canvasContext = canvas.getContext("2d")
      var context = canvasContext
      if (context !== null) {
        Ground(context);
      }

      if (context !== null) {

        //削除
        context.clearRect(0, 0, canvasSize, canvasSize);

        Ground(context);

        //dasekiData[nowDaseki['at_bat_id'] - 2]

        //console.log(daseki[0]['base']);
        //ベースの色
        let baseColor2 = new Array(3).fill("white");
        let runnerCountState = [];
        console.log(dasekiData[nowDaseki['at_bat_id'] - 2]['base']);
        let base = tmpNowDaseki['base'].split('');
        console.log(base);
        if (base[0] === '1') {
          baseColor2[2] = "blue";
        }
        if (base[1] === '1') {
          baseColor2[1] = "blue";
        }
        if (base[2] === '1') {
          baseColor2[0] = "blue";
        }
        // for (let i = 0; i < 3; i++) {
        //   runnerCountState[i] = Number(dasekiData[nowDaseki['at_bat_id'] - 2]['base']) / (10 ** i) % 10;
        //   console.log(runnerCountState[i]);
        //   if (runnerCountState[i] === 1) {
        //     baseColor2[i] = "blue";
        //   }
        //   else {
        //     baseColor2[i] = "white";
        //   }
        // }
        console.log(baseColor2)


        context.strokeStyle = "black";

        //３塁ベース
        context.fillStyle = baseColor2[2];
        context.beginPath();
        context.moveTo(homebase * 3 / 4 + l, homebase * 3 / 4 - margin + h);
        context.lineTo(homebase * 3 / 4 - w + l, homebase * 3 / 4 + w - margin + h);
        context.lineTo(homebase * 3 / 4 + l, homebase * 3 / 4 + w * 2 - margin + h);
        context.lineTo(homebase * 3 / 4 + w + l, homebase * 3 / 4 + w - margin + h);
        context.closePath();
        context.fill();
        context.lineWidth = 1;
        context.stroke();

        //2塁ベース
        context.fillStyle = baseColor2[1];
        context.beginPath();
        context.moveTo(homebase + l, homebase / 2 - margin + h);
        context.lineTo(homebase - w + l, homebase / 2 + w - margin + h);
        context.lineTo(homebase + l, homebase / 2 + w * 2 - margin + h);
        context.lineTo(homebase + w + l, homebase / 2 + w - margin + h);
        context.closePath();
        context.fill();
        context.stroke();

        //1塁ベース
        context.fillStyle = baseColor2[0];
        context.beginPath();
        context.moveTo(homebase * 5 / 4 + l, homebase * 3 / 4 - margin + h);
        context.lineTo(homebase * 5 / 4 - w + l, homebase * 3 / 4 + w - margin + h);
        context.lineTo(homebase * 5 / 4 + l, homebase * 3 / 4 + w * 2 - margin + h);
        context.lineTo(homebase * 5 / 4 + w + l, homebase * 3 / 4 + w - margin + h);
        context.closePath();
        context.fill();
        context.stroke();

        //console.log(daseki);
        let X = Number(tmpNowDaseki['touched_coordinate'].split('_')[0]);
        let Y = Number(tmpNowDaseki['touched_coordinate'].split('_')[1]);

        // let X = 1;
        // let Y = 1;
        // console.log(dasekiData[nowDaseki['at_bat_id'] - 2])
        // console.log(typeof (X));
        // console.log(Y);
        // console.log(context);
        // console.log(dasekiData[nowDaseki['at_bat_id'] - 2]['ball_kind']);
        // console.log(dasekiData[nowDaseki['at_bat_id'] - 2]['base'])

        battedBall(context, X, Y, Number(tmpNowDaseki['ball_kind']));
      }

    }
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

      setFlag(dasekiData[nowDaseki['at_bat_id'] - 2]['ball_kind'])
      console.log(dasekiData[nowDaseki['at_bat_id'] - 2]['ball_kind'])

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
      setNowOutCountState(dasekiData[beforeBat]['outcount']);

      //console.log("ここから追加");
      //console.log(daseki);
      //ここから追加しました
      const canvasSize = 2000;

      const homebase = 520;
      const h = 70;
      const l = -110;
      const w = 0.03 * homebase;  //ベースの幅
      const margin = 10;    //ベース位置調整用

      const canvas = document.getElementById("canvas")
      const canvasContext = canvas.getContext("2d")
      var context = canvasContext
      if (context !== null) {
        Ground(context);
      }

      if (context !== null) {

        //削除
        context.clearRect(0, 0, canvasSize, canvasSize);

        Ground(context);

        //dasekiData[nowDaseki['at_bat_id'] - 2]

        //console.log(daseki[0]['base']);
        //ベースの色
        let baseColor2 = new Array(3).fill("white");
        let runnerCountState = [];
        console.log(dasekiData[nowDaseki['at_bat_id'] - 2]['base']);
        let base = dasekiData[nowDaseki['at_bat_id'] - 2]['base'].split('');
        console.log(base);
        if (base[0] === '1') {
          baseColor2[2] = "blue";
        }
        if (base[1] === '1') {
          baseColor2[1] = "blue";
        }
        if (base[2] === '1') {
          baseColor2[0] = "blue";
        }
        // for (let i = 0; i < 3; i++) {
        //   runnerCountState[i] = Number(dasekiData[nowDaseki['at_bat_id'] - 2]['base']) / (10 ** i) % 10;
        //   console.log(runnerCountState[i]);
        //   if (runnerCountState[i] === 1) {
        //     baseColor2[i] = "blue";
        //   }
        //   else {
        //     baseColor2[i] = "white";
        //   }
        // }
        console.log(baseColor2)


        context.strokeStyle = "black";

        //３塁ベース
        context.fillStyle = baseColor2[2];
        context.beginPath();
        context.moveTo(homebase * 3 / 4 + l, homebase * 3 / 4 - margin + h);
        context.lineTo(homebase * 3 / 4 - w + l, homebase * 3 / 4 + w - margin + h);
        context.lineTo(homebase * 3 / 4 + l, homebase * 3 / 4 + w * 2 - margin + h);
        context.lineTo(homebase * 3 / 4 + w + l, homebase * 3 / 4 + w - margin + h);
        context.closePath();
        context.fill();
        context.lineWidth = 1;
        context.stroke();

        //2塁ベース
        context.fillStyle = baseColor2[1];
        context.beginPath();
        context.moveTo(homebase + l, homebase / 2 - margin + h);
        context.lineTo(homebase - w + l, homebase / 2 + w - margin + h);
        context.lineTo(homebase + l, homebase / 2 + w * 2 - margin + h);
        context.lineTo(homebase + w + l, homebase / 2 + w - margin + h);
        context.closePath();
        context.fill();
        context.stroke();

        //1塁ベース
        context.fillStyle = baseColor2[0];
        context.beginPath();
        context.moveTo(homebase * 5 / 4 + l, homebase * 3 / 4 - margin + h);
        context.lineTo(homebase * 5 / 4 - w + l, homebase * 3 / 4 + w - margin + h);
        context.lineTo(homebase * 5 / 4 + l, homebase * 3 / 4 + w * 2 - margin + h);
        context.lineTo(homebase * 5 / 4 + w + l, homebase * 3 / 4 + w - margin + h);
        context.closePath();
        context.fill();
        context.stroke();

        //console.log(daseki);
        let X = Number(dasekiData[nowDaseki['at_bat_id'] - 2]['touched_coordinate'].split('_')[0]);
        let Y = Number(dasekiData[nowDaseki['at_bat_id'] - 2]['touched_coordinate'].split('_')[1]);

        // let X = 1;
        // let Y = 1;
        // console.log(dasekiData[nowDaseki['at_bat_id'] - 2])
        // console.log(typeof (X));
        // console.log(Y);
        // console.log(context);
        // console.log(dasekiData[nowDaseki['at_bat_id'] - 2]['ball_kind']);
        // console.log(dasekiData[nowDaseki['at_bat_id'] - 2]['base'])

        battedBall(context, X, Y, Number(dasekiData[nowDaseki['at_bat_id'] - 2]['ball_kind']));
      }
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
      setNowOutCountState(dasekiData[nextBat]['outcount']);

      //console.log("ここから追加");
      //console.log(daseki);
      //ここから追加しました
      const canvasSize = 2000;

      const homebase = 520;
      const h = 70;
      const l = -110;
      const w = 0.03 * homebase;  //ベースの幅
      const margin = 10;    //ベース位置調整用

      const canvas = document.getElementById("canvas")
      const canvasContext = canvas.getContext("2d")
      var context = canvasContext
      if (context !== null) {
        Ground(context);
      }

      if (context !== null) {

        //削除
        context.clearRect(0, 0, canvasSize, canvasSize);

        Ground(context);

        //dasekiData[nowDaseki['at_bat_id'] - 2]

        //console.log(daseki[0]['base']);
        //ベースの色
        // let baseColor2 = [];
        // let runnerCountState = [];
        // for (let i = 0; i < 3; i++) {
        //   runnerCountState[i] = Number(dasekiData[nowDaseki['at_bat_id']]['base']) / (10 ** i) % 10;
        //   console.log(runnerCountState[i]);
        //   if (runnerCountState[i] === 1) {
        //     baseColor2[i] = "blue";
        //   }
        //   else {
        //     baseColor2[i] = "white";
        //   }
        // }
        let baseColor2 = new Array(3).fill("white");
        let runnerCountState = [];
        console.log(dasekiData[nowDaseki['at_bat_id']]['base']);
        let base = dasekiData[nowDaseki['at_bat_id']]['base'].split('');
        console.log(base);
        if (base[0] === '1') {
          baseColor2[2] = "blue";
        }
        if (base[1] === '1') {
          baseColor2[1] = "blue";
        }
        if (base[2] === '1') {
          baseColor2[0] = "blue";
        }
        console.log(baseColor2)

        context.strokeStyle = "black";

        //３塁ベース
        context.fillStyle = baseColor2[2];
        context.beginPath();
        context.moveTo(homebase * 3 / 4 + l, homebase * 3 / 4 - margin + h);
        context.lineTo(homebase * 3 / 4 - w + l, homebase * 3 / 4 + w - margin + h);
        context.lineTo(homebase * 3 / 4 + l, homebase * 3 / 4 + w * 2 - margin + h);
        context.lineTo(homebase * 3 / 4 + w + l, homebase * 3 / 4 + w - margin + h);
        context.closePath();
        context.fill();
        context.lineWidth = 1;
        context.stroke();

        //2塁ベース
        context.fillStyle = baseColor2[1];
        context.beginPath();
        context.moveTo(homebase + l, homebase / 2 - margin + h);
        context.lineTo(homebase - w + l, homebase / 2 + w - margin + h);
        context.lineTo(homebase + l, homebase / 2 + w * 2 - margin + h);
        context.lineTo(homebase + w + l, homebase / 2 + w - margin + h);
        context.closePath();
        context.fill();
        context.stroke();

        //1塁ベース
        context.fillStyle = baseColor2[0];
        context.beginPath();
        context.moveTo(homebase * 5 / 4 + l, homebase * 3 / 4 - margin + h);
        context.lineTo(homebase * 5 / 4 - w + l, homebase * 3 / 4 + w - margin + h);
        context.lineTo(homebase * 5 / 4 + l, homebase * 3 / 4 + w * 2 - margin + h);
        context.lineTo(homebase * 5 / 4 + w + l, homebase * 3 / 4 + w - margin + h);
        context.closePath();
        context.fill();
        context.stroke();

        //console.log(daseki);
        let X = Number(dasekiData[nowDaseki['at_bat_id']]['touched_coordinate'].split('_')[0]);
        let Y = Number(dasekiData[nowDaseki['at_bat_id']]['touched_coordinate'].split('_')[1]);

        // let X = 1;
        // let Y = 1;
        console.log(X);

        battedBall(context, X, Y, Number(dasekiData[nowDaseki['at_bat_id']]['ball_kind']));
      }
    }
  }

  const logStyleUpdate = {
    width: "50%",
    height: "4vw",
    fontSize: "3vw"
  }

  const logStyleManual = {
    width: "50%",
    height: "4vw",
    fontSize: "3vw"
  }

  const logStyle = {
    width: "50%",
    height: "4vw",
    fontSize: "3vw"
  }



  //const tournamentName = gameData[0]['tournament_name'];
  //const venueName = gameData[0]['venue_name'];

  // const beforebatter = () => {};

  const canvasborder = { border: "solid 2px #000" }

  return (
    <div className="main">
      <div>

        {/* タイトル */}
        <div className="titleName">{tournamentName}</div>
        {/* <div className="day">{gameMonth}月{gameDay}日</div> */}
        <div className="gamePlace">{matchNum}　{venueName}　{gameYear}年{gameMonth}月{gameDay}日</div>
      </div>

      {/* <div style={group}>
        <textarea style={resultStyle} readOnly defaultValue={nowState} />
        <div>{nowDaseki['text_inf']}</div>
      </div><br></br> */}

      <table className="scoreBoardTable" border={1}>
        <tbody>
          <tr className="scoreBoardTr">
            <th className="scoreBoardSchoolNameTh"></th>
            {scoreState1.map((score, ind) => {
              if (ind < 9) { return (<th className="scoreBoardTh">{ind + 1}</th>) }
              else if (score !== null) { return (<th className="scoreBoardTh">{ind + 1}</th>) }
            })}
            <th className="scoreBoardTh">計</th>
          </tr>
          <tr className="scoreBoardTr2">
            <td className="scoreBoardSchoolName">{schoolName1}</td>
            {scoreState1.map((score, ind) => {
              if (ind < 9) {
                if (nowState.split("回")[0] === (ind + 1).toString() && nowState.split("回")[1] === "表") {
                  return (
                    <td className="scoreBoardTdRed" onClick={skipDaseki.bind(this, ((ind + 1) * 10 + 1))}>{score}</td>
                  )
                }
                else {
                  return (
                    <td className="scoreBoardTd" onClick={skipDaseki.bind(this, ((ind + 1) * 10 + 1))}>{score}</td>
                  )
                }
              }
              else if (score !== null) {
                if (nowState.split("回")[0] === (ind + 1).toString() && nowState.split("回")[1] === "表") {
                  return (
                    <td className="scoreBoardTdRed" onClick={skipDaseki.bind(this, ((ind + 1) * 10 + 1))}>{score}</td>
                  )
                }
                else {
                  return (
                    <td className="scoreBoardTd" onClick={skipDaseki.bind(this, ((ind + 1) * 10 + 1))}>{score}</td>
                  )
                }

              }
            })}
            <td className="scoreBoardTd">{totalScoreState1}</td>
          </tr>
          <tr className="scoreBoardTr2">
            <td className="scoreBoardSchoolName">{schoolName2}</td>
            {scoreState2.map((score, ind) => {
              if (ind < 9) {
                if (nowState.split("回")[0] === (ind + 1).toString() && nowState.split("回")[1] === "裏") {
                  return (
                    <td className="scoreBoardTdRed" onClick={skipDaseki.bind(this, ((ind + 1) * 10 + 2))}>{score}</td>
                  )
                }
                else {
                  return (
                    <td className="scoreBoardTd" onClick={skipDaseki.bind(this, ((ind + 1) * 10 + 2))}>{score}</td>
                  )
                }
              }
              else if (score !== null) {
                if (nowState.split("回")[0] === (ind + 1).toString() && nowState.split("回")[1] === "裏") {
                  return (
                    <td className="scoreBoardTdRed" onClick={skipDaseki.bind(this, ((ind + 1) * 10 + 2))}>{score}</td>
                  )
                }
                else {
                  return (
                    <td className="scoreBoardTd" onClick={skipDaseki.bind(this, ((ind + 1) * 10 + 2))}>{score}</td>
                  )
                }
              }
              <td className="scoreBoardTd" onClick={skipDaseki.bind(this, ((ind + 1) * 10 + 2))}>{score}</td>
            })}
            <td className="scoreBoardTd">{totalScoreState2}</td>

          </tr>
        </tbody>
      </table>

      {/* <div className="Round">
        <div className="gameRound">
          {nowState}
        </div>
      </div> */}

      {resultScore1 !== 'default' && resultScore2 !== 'default' && <div className="gameSet"><p>試合終了</p></div>}

      <div className="Round">
        <p>{nowState}</p>
      </div>
      <span>
        {outCount(nowOutCountState, setNowOutCountState)}
      </span>


      <div className="info">
        <div className="textinfo">
          {nowDaseki['text_inf']}
        </div>
      </div>

      <div className="gameDetail">
        <div className="offense">
          <div className="offenseTeam">{nowSchoolName1}</div>
          <table className="batterArea">
            <tr>
              <td rowSpan={2} className="offenseTitle">打者</td>
              <td className="batterNumber batter">{batterData['uniform_number']}番</td>
              <td className="batterName batter">{batterData['player_name_kanji']}</td>
              <td className="batterInfo batter">{batterData['grade']}年　{batterData['handed_hit']}</td>
            </tr>
            <tr>
              {pinchText === '' && <td colSpan={3} className="todayBatterRecord"></td>}
              {pinchText !== '' && <td colSpan={3} className="todayBatterRecord">{pinchText}</td>}
            </tr>
          </table>
          {/* <table className="nextBatter">
            <tr>
              <td className="nextBatterNumber">5番</td>
              <td className="nextBatterName">野村佑希</td>
              <td className="nextBatterInfo">1年　右</td>
            </tr>
            <tr>
              <td className="nextBatterNumber">6番</td>
              <td className="nextBatterName">清水優心</td>
              <td className="nextBatterInfo">2年　右</td>
            </tr>
          </table> */}
        </div>

        <div className="deffense">
          <div className="deffenseTeam">{nowSchoolName2}</div>
          <table className="pitcherArea">
            <tr>
              <td rowSpan={2} className="deffenseTitle">投手</td>
              <td className="pitcherName pitcher">{pitcherData['player_name_kanji']}</td>
              <td className="pitcherInfo pitcher">{pitcherData['grade']}年　{pitcherData['handed_throw']}</td>
            </tr>
            <tr>
            </tr>
          </table>
        </div>
      </div>

      {/* 成績情報 */}
      {/* <div style={group2}>
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
      </div> */}

      {/* 更新選択ボタン */}
      <div className="updateArea">
        {autoUpdateFlag === true && <div className="updateButton">
          <button class="off" onClick={() => { autoUpdateButton() }}>自動更新</button>
          <button class="on" onClick={() => { manualUpdateButton(); updateButton(); }}>手動更新</button>
        </div>}
        {autoUpdateFlag === false && <div className="updateButton">
          <button class="on" onClick={() => { autoUpdateButton() }}>自動更新</button>
          <button class="off" onClick={() => { manualUpdateButton(); updateButton(); }}>手動更新</button>
        </div>}
      </div>

      {/* キャンバスエリア */}
      {/* <div style={fieldStyle}><img src={pic} alt="field" style={imgsize} /></div><br></br> */}
      <div className="canvasArea">
        <canvas width="800" height="610" id="canvas" style={canvasborder} className='diamondPng'></canvas>
      </div>


      {/* 前の打席と次の打席のボタン */}
      <button className="beforeBatter" onClick={beforebatter} style={logStyle}>前の打席</button>
      <button className="nextBatter" onClick={nextbatter} style={logStyle}>次の打席</button><br></br>

      {/* テキストエリア */}
      <div className="textSokuhou">
        <span class="box-title">テキスト速報</span>
        {resultScore1 !== 'default' && resultScore2 !== 'default' && <br />}
        {resultScore1 !== 'default' && resultScore2 !== 'default' && <div className="textGameSet">試合終了　【{schoolName1}】{resultScore1} - {resultScore2}【{schoolName2}】</div>}
        {resultScore1 !== 'default' && resultScore2 !== 'default' && <br />}
        <DasekiHistoryList dasekiesInfo={[...dasekiData].reverse()} gameData={gameData} score={scoreState} />
      </div>
      <>
        <div className="startingMemberTag">先発メンバー</div>
        <div className="startingMember">
          <div className="schoolBox">
            <p>{schoolName1}</p>
          </div>
          <table border="1" className="startMembers">
            <tr>
              <td width="8%" height="15vh" rowspan="2" >打順</td>
              <td width="30%" height="10vh" >名前</td>
              <td width="10%" height="10vh" rowspan="2" >背番号</td>
              <td width="18%" height="10vh" rowspan="2">ポジション</td>
              <td width="16%" height="10vh" rowspan="2">打率</td>
            </tr>
          </table>
          <StartingMemberList startingMembers={startingMember1} />

          <div className="schoolBox">
            <p>{schoolName2}</p>
          </div>
          <table border="1" className="startMembers">
            <tr>
              <td width="8%" height="15vh" rowspan="2">打順</td>
              <td width="30%" height="10vh">名前</td>
              <td width="10%" height="10vh" rowspan="2">背番号</td>
              <td width="18%" height="10vh" rowspan="2">ポジション</td>
              <td width="16%" height="10vh" rowspan="2">打率</td>
            </tr>
          </table>
          <StartingMemberList startingMembers={startingMember2} />
        </div>
      </>
      <button id="page-top" class="page-top" onClick={() => {
        const pagetopBtn = document.querySelector('#page-top');
        pagetopBtn.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        });
      }}></button>
    </div>
  )
}
export default Bulletin;