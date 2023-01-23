import pic from "./field2.png"
import "./OutPutGame.css"

// const pageStyle = {
//   background: 'white'
// }

// const borderStyle = {
//   display: "inline-block",
//   border: "solid 2px #707070",
//   background: '#202090',
//   color: 'white',
//   fontSize: "4vw"
// }

// const infoStyle = {
//   textAlign: "center",
// }

// const group = {
//   display: "flex",
// }

// const resultStyle = {
//   background: '#e3e3e3',
//   color: 'red',
//   fontSize: '5vw',
//   textAlign: 'center',
//   width: '70%',
//   resize: 'none',
//   margin: 'auto'
// }



// const team1Style = {
//   border: '2px solid #707070',
//   background: '#e3e3e3',
//   color: 'red',
//   padding: '2px',
//   fontSize: '3vw'
// }

// const team2Style = {
//   border: '2px solid #707070',
//   background: '#e3e3e3',
//   color: 'black',
//   padding: '2px',
//   fontSize: '3vw'
// }

// const batterStyle = {
//   background: 'red',
//   color: 'white',
//   fontSize: '2vw',
//   padding: '1px',
//   width: "15%"
// }

// const pitcherStyle = {
//   background: 'blue',
//   color: 'white',
//   fontSize: '2vw',
//   padding: '1px',
//   width: "15%"
// }

// const group2 = {
//   display: "flex",
//   justifyContent: 'space-around',
// }

// const playertableStyle = {
//   border: '2px solid #707070',
//   borderCollapse: 'collapse',
//   textAlign: 'center',
//   margin: 'auto',
//   width: '48%'
// }

// const schoolStyle = {
//   border: '2px solid #707070',
//   background: '#e3e3e3',
//   fontSize: '3vw',
//   padding: '1px',
// };

// const playerStyle = {
//   border: '2px solid #707070',
//   background: '#e3e3e3',
//   fontSize: '2vw',
//   padding: '2px'
// }

// const playerresultStyle = {
//   border: '2px solid #707070',
//   background: '#e3e3e3',
//   fontSize: '2vw',
//   padding: '1px',
//   width: '15%'
// }

// const fieldStyle = {
//   textAlign: 'center',
// }

// const imgsize = {
//   width: '80%',
//   height: 'auto'
// }

// const countStyle = {
//   fontSize: '6vw',
//   margin: 'auto'
// }

export const OutPutGame = () => {

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

  return (
<div>
      <div>
      <div className="titleName">春季中国地区高等学校野球島根県大会　東部地区</div>
        <div className="day">11月26日</div>
        <div className="gamePlace">坊っちゃんスタジアム</div>
      </div>

      <table className="scoreBoardTable" border={1}>
        <tbody>
          <tr className="scoreBoardTr">
            <th className="scoreBoardTh"></th>
            <th className="scoreBoardTh">1</th>
            <th className="scoreBoardTh">2</th>
            <th className="scoreBoardTh">3</th>
            <th className="scoreBoardTh">4</th>
            <th className="scoreBoardTh">5</th>
            <th className="scoreBoardTh">6</th>
            <th className="scoreBoardTh">7</th>
            <th className="scoreBoardTh">8</th>
            <th className="scoreBoardTh">9</th>
            <th className="scoreBoardTh">計</th>
          </tr>
          <tr className="scoreBoardTr2">
            <td className="scoreBoardSchoolName">出雲</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>計</td>
          </tr>
          <tr className="scoreBoardTr2">
            <td className="scoreBoardSchoolName">松江商</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>計</td>
          </tr>
        </tbody>

        

      </table>

      <div className="count">
          <p className="b">
            <em>B</em>
            <b></b>
            ●●●●
          </p>
          <p className="b">
            <em>S</em>
            <b></b>
            ●●
          </p>
          <p className="b">
            <em>O</em>
            <b></b>
            ●●
          </p>
        </div>

      <div className="gameRound">1回表</div>
  
        <div className="gameDetail">
          <div className="offense">
            <div className="offenseTeam">出雲</div>
            <table className="batterArea">
              <tr>
                <td  rowSpan={2} className="offenseTitle">打者</td>
                <td className="batterNumber batter">4番</td>
                <td className="batterName batter">松本剛</td>
                <td className="batterInfo batter">3年　右</td>
              </tr>
              <tr>
                <td colSpan={3} className="todayBatterRecord">三ゴロ、空三振、遊ゴロ、右安</td>
              </tr>
            </table>
            <table className="nextBatter">
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
            </table>
          </div>

          <div className="deffense">
            <div className="deffenseTeam">松江商</div>
            <table className="pitcherArea">
              <tr>
                <td  rowSpan={2} className="deffenseTitle">投手</td>
                <td className="pitcherName pitcher">上沢直之</td>
                <td className="pitcherInfo pitcher">3年　右</td>
              </tr>
              <tr>
                <td  colSpan={2} className="todayPitcherRecord">投球数：8</td>
              </tr>
            </table>
          </div>
        </div>

        {/* <table>
          <tbody>
            <tr><th colSpan="2">高校1</th></tr>
            <tr><th>打者</th><th>打者名</th></tr>
            <tr><th colSpan="2">打者の情報</th></tr>
          </tbody>
        </table>

        <table>
          <tbody>
            <tr><th colSpan="2">高校2</th></tr>
            <tr><th>投手</th><th>投手名</th></tr>
            <tr><th colSpan="2">投手の情報</th></tr>
          </tbody>
        </table> */}

      <div>
        {/* <table>
          <tbody>
            <tr><th>打者成績</th><th>代打または現在の打者の今日の成績</th></tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr><th>投手成績</th><th>投手交代または現在の投手の今日の成績</th></tr>
          </tbody>
        </table> */}
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

      <div className="freeWrite">
        <textarea></textarea> 
      </div>  
      <div className="imageArea"><img src={pic} alt="field" className="pic" /></div><br></br>
      {/* <button onClick={beforebatter}>前の打者</button>
      <button onClick={nextbatter}>次の打者</button><br></br> */}
    </div>
  )
}
export default OutPutGame;