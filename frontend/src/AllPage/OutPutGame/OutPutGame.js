import pic from "./field2.png"
import "./App.css";

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
    <div style={pageStyle}>
      <div style={infoStyle}>
        <div style={borderStyle}>開催日時 大会名　開催球場名</div>
      </div>
      <div style={group}>
        <textarea style={resultStyle} readOnly defaultValue="一回表" />
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
            <td style={team1Style}>高校1</td>
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
            <td style={team2Style}>高校2</td>
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
            <tr><th style={schoolStyle} colSpan="2">高校1</th></tr>
            <tr><th style={batterStyle}>打者</th><th style={playerStyle}>打者名</th></tr>
            <tr><th style={playerStyle} colSpan="2">打者の情報</th></tr>
          </tbody>
        </table>

        <table style={playertableStyle}>
          <tbody>
            <tr><th style={schoolStyle} colSpan="2">高校2</th></tr>
            <tr><th style={pitcherStyle}>投手</th><th style={playerStyle}>投手名</th></tr>
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
      <button onClick={beforebatter} style={logStyle}>前の打者</button>
      <button onClick={nextbatter} style={logStyle}>次の打者</button><br></br>
    </div>
  )
}
export default OutPutGame;