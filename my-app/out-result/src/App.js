import "./App.css";

function App() {
  var cnt = 0;
  function change_out_count(){
    cnt +=1;

    if(cnt === 1){
      console.log(1);
      console.log(document.getElementById("red1").backgroundColor);
      document.getElementById("red1").style.backgroundColor = "red";
    }
    else if(cnt === 2){
      console.log(2);
      document.getElementById("red2").style.backgroundColor = "red";
    }
    else{
      console.log(3);
      document.getElementById("red3").style.backgroundColor = "red";
      cnt = 0;
    }
  }

  return (
    <div>
      <div align="center" className="out-result">
        <div id="red1"></div>
        <div id="red2"></div>
        <div id="red3"></div>
      </div>
      <button onClick={change_out_count}>色の変更</button>  
    </div>
  );
}

export default App;
