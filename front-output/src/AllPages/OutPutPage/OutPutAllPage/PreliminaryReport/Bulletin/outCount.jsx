
import "./outCount.css"

const outZero = (setOutCountState) => {
    return (
        <>
            <i className="fa-solid fa-circle outCountOff" ></i>
            <i className="fa-solid fa-circle outCountOff" ></i>
            <i className="fa-solid fa-circle outCountOff" ></i>
        </>

    )
}

const outOne = (setOutCountState) => {
    return (
        <>
            <i className="fa-solid fa-circle outCountOn"></i>
            <i className="fa-solid fa-circle outCountOff"></i>
            <i className="fa-solid fa-circle outCountOff"></i>
        </>

    )
}

const outTwo = (setOutCountState) => {
    return (
        <>
            <i className="fa-solid fa-circle outCountOn"></i>
            <i className="fa-solid fa-circle outCountOn"></i>
            <i className="fa-solid fa-circle outCountOff"></i>
        </>

    )
}

const outThree = (setOutCountState) => {
    return (
        <>
            <i className="fa-solid fa-circle outCountOn"></i>
            <i className="fa-solid fa-circle outCountOn"></i>
            <i className="fa-solid fa-circle outCountOn"></i>
        </>

    )
}


export const outCount = (outCountState, setOutCountState) => {

    return (
        <div className="outCount">
            {outCountState === 0 && outZero(setOutCountState)}
            {outCountState === 1 && outOne(setOutCountState)}
            {outCountState === 2 && outTwo(setOutCountState)}
            {outCountState === 3 && outThree(setOutCountState)}
        </div>
    )

}

// import "./CSS/outCount.css"
// export const outCount = (nowOutCountState, setNowOutCountState) => {
// var cnt = 0;
// function change_out_count(){
//   nowOutCountState += 1
//   setNowOutCountState(nowOutCountState)

//   if(nowOutCountState === 0){
//     console.log(0);
//     console.log(document.getElementById("red1").backgroundColor);
//     document.getElementById("red1").style.backgroundColor = "black";
//     document.getElementById("red2").style.backgroundColor = "black";
//     document.getElementById("red3").style.backgroundColor = "black";
//   }
//   else if(nowOutCountState === 1){
//     console.log(1);
//     console.log(document.getElementById("red1").backgroundColor);
//     document.getElementById("red1").style.backgroundColor = "red";
//   }
//   else if(nowOutCountState === 2){
//     console.log(2);
//     document.getElementById("red2").style.backgroundColor = "red";
//   }
//   else {
//     console.log(3);
//     document.getElementById("red3").style.backgroundColor = "red";
//     setNowOutCountState(0)
//   }
// }

// return (
//   <div>
//     <div align="center" className="out-result">
//       <div id="red1"></div>
//       <div id="red2"></div>
//       <div id="red3"></div>
//     </div>
//     <button onClick={change_out_count}>色の変更</button>  
//   </div>
// );
// }