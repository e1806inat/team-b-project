import pic from "./field2.png"

const borderStyle = {
  display:"inline-block",
  border: "solid 2px black",
}

const infoStyle ={
textAlign:"center",
}

const group ={
display:"flex"
}

const inningStyle = {
  fontSize: '60px'
}

const resultStyle= {
  color: 'red',
  fontSize: '30px',
  textAlign:'center',
  width:'40%',
  height:'60px',
  resize: 'none',
  margin: 'auto'

}

const tableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse',
  textAlign: 'center',
  margin: 'auto',
  width: '70%'
}

const tdStyle = {
  border: '2px solid black',
  background: 'white',
  padding: '5px'
};

const thStyle = {
  border: '2px solid black',
  background: '#3498DB',
  color: 'white',
  padding: '2px'
};

const team1Style ={
  border: '2px solid black',
  background: 'white',
  color: 'gold',
  padding: '5px'
}

const team2Style ={
  border: '2px solid black',
  background: 'white',
  color: 'black',
  padding: '5px'
}

const batterStyle ={
  background: 'red',
  color: 'white',
  fontSize: '20px',
  padding: '5px'
}

const pitcherStyle ={
  background: 'blue',
  color: 'white',
  fontSize: '20px',
  padding: '5px'
}

const group2 ={
  display:"flex",
  justifyContent: 'space-around'
}

const playertableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse',
  textAlign: 'center',
  margin: 'auto',
  width: '20%'
}

const schoolStyle = {
  border: '2px solid black',
  background: 'white',
  fontSize: '20px',
  padding: '5px',
};

const playerStyle ={
  border: '2px solid black',
  background: 'white',
  fontSize: '15px',
  padding: '2px'
}

const fieldStyle ={
  textAlign: 'center',
}

export const OutPutGame = () => {
   

  return (
    <div>
      <div style ={infoStyle}>
        <div style ={borderStyle}>開催日時 大会名　開催球場名</div>
      </div>
      <div style ={group}>
      <div style ={inningStyle}>1回表</div>
      <textarea style={resultStyle} />
      </div>
      

      <table style ={tableStyle}>
        <tbody>
        <tr>
          <th style ={thStyle}></th>
          <th style ={thStyle}>1</th>
          <th style ={thStyle}>2</th>
          <th style ={thStyle}>3</th>
          <th style ={thStyle}>4</th>
          <th style ={thStyle}>5</th>
          <th style ={thStyle}>6</th>
          <th style ={thStyle}>7</th>
          <th style ={thStyle}>8</th>
          <th style ={thStyle}>9</th>
          <th style ={thStyle}>計</th>
        </tr>
        <tr>
          <td style ={team1Style}>高校1</td>
          <td style ={tdStyle}>1</td>
          <td style ={tdStyle}>2</td>
          <td style ={tdStyle}>3</td>
          <td style ={tdStyle}>4</td>
          <td style ={tdStyle}>5</td>
          <td style ={tdStyle}>6</td>
          <td style ={tdStyle}>7</td>
          <td style ={tdStyle}>8</td>
          <td style ={tdStyle}>9</td>
          <td style ={tdStyle}>計</td>
        </tr>
        <tr>
          <td style ={team2Style}>高校2</td>
          <td style ={tdStyle}>1</td>
          <td style ={tdStyle}>2</td>
          <td style ={tdStyle}>3</td>
          <td style ={tdStyle}>4</td>
          <td style ={tdStyle}>5</td>
          <td style ={tdStyle}>6</td>
          <td style ={tdStyle}>7</td>
          <td style ={tdStyle}>8</td>
          <td style ={tdStyle}>9</td>
          <td style ={tdStyle}>計</td>
        </tr>
        </tbody>
       
      </table><br></br>
      <div style = {group2}>
        <div style = {batterStyle}>打者</div>
        <table style = {playertableStyle}>
          <tbody>
            <tr><th style = {schoolStyle}>高校1</th></tr>
            <tr><th style = {playerStyle}>打者名</th></tr>
            <tr><th style = {playerStyle}>打者の情報</th></tr>
          </tbody>
        </table>
        <div style = {pitcherStyle}>投手</div>
        <table style = {playertableStyle}>
          <tbody>
            <tr><th style = {schoolStyle}>高校2</th></tr>
            <tr><th style = {playerStyle}>投手名</th></tr>
            <tr><th style = {playerStyle}>投手の情報</th></tr>
          </tbody>
        </table>
      </div><br></br><br></br>
      <div style ={group2}>
        <table style = {playertableStyle}>
          <tbody>
            <tr><th style = {playerStyle}>代打または現在の打者の今日の成績</th></tr>
          </tbody>
       </table>
       <table style = {playertableStyle}>
          <tbody>
            <tr><th style = {playerStyle}>投手交代または現在の投手の今日の成績</th></tr>
          </tbody>
      </table>
      </div><br></br><br></br>

      <div style ={fieldStyle}><img src={pic} alt = "field" /></div>

    </div>
  )
}
export default OutPutGame;