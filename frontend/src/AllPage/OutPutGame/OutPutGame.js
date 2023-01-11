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
  background: '#202090',
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
  const urlTableName = "8";
  const urlGameId = "8";
  // const urlSchoolId1 = searchParams.get("urlSchoolId1");
  // const urlSchoolId2 = searchParams.get("urlSchoolId2");
  const [dasekiData, setDasekiData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [tournamentMember1, setTournamentMember1] = useState([]);
  const [tournamentMember2, setTournamentMember2] = useState([]);
  const [tournamentMember, setTournamentMember] = useState([]);
  const [startingMember1, setStartingMember1] = useState([]);
  const [startingMember2, setStartingMember2] = useState([]);
  const [nowState, setNowState] = useState('');
  const [gameYear, setGameYear] = useState('');
  const [gameMonth, setGameMonth] = useState('');
  const [gameDay, setGameDay] = useState('');
  const [tournamentName, setTournamentName] = useState('');
  const [venueName, setVenueName] = useState('');
  const [schoolName1, setSchoolName1] = useState('');
  const [schoolName2, setSchoolName2] = useState('');
  // const [batterName, setBatterName] = useState('');
  // const [pitcherName, setPitcherName] = useState('');
  const [batterData, setBatterData] = useState('');
  const [pitcherData, setPitcherData] = useState('');
  const [battersData, setBattersData] = useState([]);


  // const readDasekiData = async (setDasekiData, urlTableName) => {
  //   // fetch(backendUrl + "/tournament/tournament_call", {
  //   await fetch("http://localhost:5000/daseki/tmp_daseki_call", {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ table_name: urlTableName })
  //   })
  // .then((response) => response.json())
  // .then((data) => {
  //   console.log(data)
  //   setDasekiData(data)
  //   console.log(data[0])
  //   console.log(tournamentMember)
  //   var stateArray = data[0]['inning'].toString().split("");
  //   if (stateArray[Array.length - 1] === 1) {
  //     setNowState(stateArray[0] + '回表');
  //   } else {
  //     setNowState(stateArray[0] + '回裏');
  //   }
  //   // let batter = dasekiData[0].find(function(element, ind){
  //   //   console.log(element)
  //   //   if(element['player_id'] === tournamentMember[0]['player_id']){
  //   //     return tournamentMember[ind]['player_name_kanji']
  //   //   }
  //   // });
  //   // let pitcher = dasekiData[0].find(function(element, ind){
  //   //   if(element['pitcher_id'] === tournamentMember[0]['player_id']){
  //   //     return element[ind]['player_name_kanji']
  //   //   }
  //   // });
  //   let batter = 'aa'
  //   let pitcher = 'aa'
  //   setBatterName(batter);
  //   setPitcherName(pitcher);
  // })
  // }

  // const readGameData = async (setGameData, urlGameId) => {
  //   // fetch(backendUrl + "/tournament/tournament_call", {
  //   await fetch("http://localhost:5000/game/a_game_call", {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ game_id: urlGameId })
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //       setGameData(data)
  //       readTournamentMember1(setTournamentMember1, data[0]['tournament_id'], data[0]['school_id_1']);
  //       readTournamentMember2(setTournamentMember2, data[0]['tournament_id'], data[0]['school_id_2']);
  //       tournamentMemberConcat(setTournamentMember, tournamentMember1, tournamentMember2);
  //       setGameYear(data[0]['game_ymd'].split('-')[0]);
  //       setGameMonth(data[0]['game_ymd'].split('-')[1]);
  //       setGameDay(data[0]['game_ymd'].split('-')[2]);
  //       setTournamentName(data[0]['tournament_name']);
  //       setVenueName(data[0]['venue_name']);
  //       setSchoolName1(data[0]['school_name_1']);
  //       setSchoolName2(data[0]['school_name_2']);
  //     })
  // }

  // const readTournamentMember1 = async (setTournamentMember1, tournamentId, schoolId1) => {
  //   // fetch(backendUrl + "/tournament/tournament_call", {
  //   await fetch("http://localhost:5000/member/tournament_member_call", {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ tournament_id: tournamentId, school_id: schoolId1 })
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //       setTournamentMember1(data)
  //     })
  // }

  // const readTournamentMember2 = async (setTournamentMember2, tournamentId, schoolId2) => {
  //   // fetch(backendUrl + "/tournament/tournament_call", {
  //   await fetch("http://localhost:5000/member/tournament_member_call", {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ tournament_id: tournamentId, school_id: schoolId2 })
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //       setTournamentMember2(data)
  //     })
  // }

  // const tournamentMemberConcat = async (setTournamentMember, tournamentMember1, tournamentMember2) => {
  //   // fetch(backendUrl + "/tournament/tournament_call", {
  //   console.log(tournamentMember1);
  //   await setTournamentMember(tournamentMember1.concat(tournamentMember2));
  //   console.log(tournamentMember);
  //   await readDasekiData(setDasekiData, urlTableName);
  // }

  useEffect(() => {
    //readGameData(setGameData, urlGameId);
    const gameStart = async () => {
      const ResGameData = await fetch("http://localhost:5000/game/a_game_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId })
      })
      const gameData = await ResGameData.json();

      console.log(gameData)

      setGameData(gameData)
      setGameYear(gameData[0]['game_ymd'].split('-')[0]);
      setGameMonth(gameData[0]['game_ymd'].split('-')[1]);
      setGameDay(gameData[0]['game_ymd'].split('-')[2]);
      setTournamentName(gameData[0]['tournament_name']);
      setVenueName(gameData[0]['venue_name']);
      setSchoolName1(gameData[0]['school_name_1']);
      setSchoolName2(gameData[0]['school_name_2']);

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
      console.log(member)
      console.log('aasdfasdfasdfasdfasfsdfasd')

      const ResStartingMember1 = await fetch("http://localhost:5000/member/starting_member_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId, school_id: gameData[0]['school_id_1'] })
      })
      const startMember1 = await ResStartingMember1.json();

      console.log(startMember1)
      console.log('aasdfasdfasdfasdfasfsdfasd')

      setStartingMember1(startMember1);

      const ResStartingMember2 = await fetch("http://localhost:5000/member/starting_member_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: urlGameId, school_id: gameData[0]['school_id_2'] })
      })
      const startMember2 = await ResStartingMember2.json();

      console.log(startMember2)
    
      setStartingMember2(startMember2);

      const startMember = await startMember1.concat(startMember2);

      setBattersData(startMember);

      const ResDasekiData = await fetch("http://localhost:5000/daseki/tmp_daseki_call", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ table_name: urlTableName })
      })

      const daseki = await ResDasekiData.json();
      setDasekiData(daseki);
      console.log(daseki)
      
      // if(daseki[0]['pinch'] !== null){
      //   for(var pich of batterData){

      //   }
      // }

      var stateArray = daseki[0]['inning'].toString().split("");
      if (stateArray[Array.length - 1] === 1) {
        setNowState(stateArray[0] + '回表');
      } else {
        setNowState(stateArray[0] + '回裏');
      }

      //打者IDと一致する名前の検索
      for(var batter of member){
        if(batter['player_id'] === daseki[0]['player_id']){
          setBatterData(batter);
          break
        }
      }

      //投手IDと一致する名前の検索
      for(var pitcher of member){
        if(pitcher['player_id'] === daseki[0]['pitcher_id']){   
          setPitcherData(pitcher);
          break
        }
      }
      
    }
    gameStart();
  }, []);

  // useEffect(() => {
  //   //readGameData(setGameData, urlGameId);
  //   const duringGame = async () => {

  //     const ResDasekiData = await fetch("http://localhost:5000/daseki/tmp_daseki_call", {
  //       method: "POST",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ table_name: urlTableName })
  //     })

  //     const daseki = await ResDasekiData.json();
      
  //     var tmpBattersData = battersData;


  //     //交代情報を反映するための処理
  //     // if(daseki[0]['pinch'] !== null){
  //     //   const pinchInfoArray = daseki[0]['pinch'].split(',');
  //     //   //var ind = 0;
  //     //   for(var pinchInfo of pinchInfoArray){
  //     //     var ind = 0;
  //     //     let pinch = pinchInfo.split('→');
  //     //     for(var memberDel of tmpBattersData){
  //     //       if(pinch[0] === memberDel['player_id']){
  //     //         tmpBattersData.splice(ind, 1);
  //     //         break
  //     //       }
  //     //       ind++;
  //     //     }
  //     //     var ind = 0;
  //     //     for(var memberAdd of tournamentMember){
  //     //       if(pinch[1] === memberAdd['player_id']){
  //     //         tmpBattersData.push(tournamentMember[ind]);
  //     //         break
  //     //       }
  //     //       ind++;
  //     //     }
  //     //     setBattersData(tmpBattersData);
  //     //   }
  //     // }

  //     if(daseki[0]['pinch'] !== null){
  //       var pinchText = '打者交代　';
  //       const pinchInfoArray = daseki[0]['pinch'].split(',');
  //       //var ind = 0;
  //       for(var pinchInfo of pinchInfoArray){
  //         //var ind = 0;
  //         let pinch = pinchInfo.split('→');
  //         for(var memberDel of tmpBattersData){
  //           if(pinch[0] === memberDel['player_id']){
  //             //tmpBattersData.splice(ind, 1);
  //             pinchText = pinchText + memberDel['player_name_kanji'] + '→';
  //             break
  //           }
  //           //ind++;
  //         }
  //         //var ind = 0;
  //         for(var memberAdd of tournamentMember){
  //           if(pinch[1] === memberAdd['player_id']){
  //             pinchText = pinchText + memberAdd['player_name_kanji'] + '　';
  //             //tmpBattersData.push(tournamentMember[ind]);
  //             break
  //           }
  //           //ind++;
  //         }
  //         //setBattersData(tmpBattersData);
  //       }
  //     }

  //     var stateArray = daseki[0]['inning'].toString().split("");
  //     if (stateArray[Array.length - 1] === 1) {
  //       setNowState(stateArray[0] + '回表');
  //     } else {
  //       setNowState(stateArray[0] + '回裏');
  //     }

  //     //打者IDと一致する名前の検索
  //     for(var batter of tournamentMember){
  //       if(batter['player_id'] === daseki[0]['player_id']){
  //         setBatterData(batter);
  //         break
  //       }
  //     }

  //     //投手IDと一致する名前の検索
  //     for(var pitcher of tournamentMember){
  //       if(pitcher['player_id'] === daseki[0]['pitcher_id']){   
  //         setPitcherData(pitcher);
  //         break
  //       }
  //     }

  //   }
  //   duringGame();
  // }, []);

  // useEffect(() => {
   
  // }, []);

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

  //console.log(gameData)

  //const tournamentName = gameData[0]['tournament_name'];
  //const venueName = gameData[0]['venue_name'];


  return (
    <div style={pageStyle}>
      <div style={infoStyle}>
        <div style={borderStyle}>{gameYear}年{gameMonth}月{gameDay}日 {tournamentName} {venueName}</div>
      </div>
      <div style={group}>
        <textarea style={resultStyle} readOnly defaultValue={nowState} />
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
            <td style={tdStyle}>1</td>
            <td style={tdStyle}>2</td>
            <td style={tdStyle}>3</td>
            <td style={tdStyle}>4</td>
            <td style={tdStyle}>5</td>
            <td style={tdStyle}>6</td>
            <td style={tdStyle}>7</td>
            <td style={tdStyle}>8</td>
            <td style={tdStyle}>9</td>
            <td style={tdStyle}>計</td>
          </tr>
          <tr>
            <td style={team2Style}>{schoolName2}</td>
            <td style={tdStyle}>1</td>
            <td style={tdStyle}>2</td>
            <td style={tdStyle}>3</td>
            <td style={tdStyle}>4</td>
            <td style={tdStyle}>5</td>
            <td style={tdStyle}>6</td>
            <td style={tdStyle}>7</td>
            <td style={tdStyle}>8</td>
            <td style={tdStyle}>9</td>
            <td style={tdStyle}>計</td>
          </tr>
        </tbody>

      </table><br></br>
      <div style={group2}>

        <table style={playertableStyle}>
          <tbody>
            <tr><th style={schoolStyle} colSpan="2">{schoolName1}</th></tr>
            <tr><th style={batterStyle}>打者</th><th style={playerStyle}>{batterData['player_name_kanji']}</th></tr>
            <tr><th style={playerStyle} colSpan="2">打者の情報</th></tr>
          </tbody>
        </table>

        <table style={playertableStyle}>
          <tbody>
            <tr><th style={schoolStyle} colSpan="2">{schoolName2}</th></tr>
            <tr><th style={pitcherStyle}>投手</th><th style={playerStyle}>{pitcherData['player_name_kanji']}</th></tr>
            <tr><th style={playerStyle} colSpan="2">投手の情報</th></tr>
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
      <DasekiHistoryList dasekiesInfo={dasekiData}/>
      <div>
        <div>先発メンバー</div>
        <div>{schoolName1}</div>
        <table border="2" className="members1">
          <tr>
            <td width="50" rowspan="2" bgcolor="#228b22">打順</td>
            <td width="300" bgcolor="#228b22">名前</td>
            <td width="75" rowspan="2" bgcolor="#228b22">背番号</td>
            <td width="150" rowspan="2" bgcolor="#228b22">ポジション</td>
            <td width="75" rowspan="2" bgcolor="#228b22">打率</td>
          </tr>
        </table>
        <StartingMemberList startingMembers={startingMember1}/>

        <div>{schoolName2}</div>
        <table border="2" className="members2">
          <tr>
            <td width="50" rowspan="2" bgcolor="#228b22">打順</td>
            <td width="300" bgcolor="#228b22">名前</td>
            <td width="75" rowspan="2" bgcolor="#228b22">背番号</td>
            <td width="150" rowspan="2" bgcolor="#228b22">ポジション</td>
            <td width="75" rowspan="2" bgcolor="#228b22">打率</td>
          </tr>
        </table>
        <StartingMemberList startingMembers={startingMember2}/>
      </div>
    </div>
  )
}
export default OutPutGame;