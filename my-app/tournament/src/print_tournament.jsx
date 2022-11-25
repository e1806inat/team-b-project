import { useState, useEffect } from "react";

const PrintTournament = (props) => {
  const [context, setContext] = useState(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const canvasContext = canvas.getContext("2d");
    setContext(canvasContext);
  }, [context]);

  useEffect(() => {
    if (context !== null) {
      context.clearRect(0, 0, 2000, 2000);
      console.log(props.list1);
      setLoaded(true);
    }
    
  }, [context]);

  useEffect(() => {
    if (loaded) {
      var width = 50;
      var list1 = props.list1;
      var list2 = new Array();
      var list3 = new Array();
      var list4 = new Array();
      var dep = Math.log2(list1.length);
      var tem_length = 0;
      var count = 0;
      context.fillStyle = "rgb(0,255,0)";
      context.fillRect(0, 0, 1280, 1280);
      for (let i = 0; i < list1.length; i++) {
        context.lineWidth = 2;
        context.font = "20px cursive";
        context.fillStyle = "black";
        list2[i] = new Array(2);
        if (list1[i] !== 0) {
          list2[i][0] = 2 * width;
          list2[i][1] = width + width * i;
          context.fillText(list1[i], 0, width + width * i);
        } else {
          list2[i][0] = 0;
          list2[i][1] = 0;
        }
      }
      for (let i = 0; i <= dep; i++) {
        for (let j = 0; j < list2.length; j += 2) {
            print_line(
              list2[j][0],
              list2[j][1],
              list2[j + 1][0],
              list2[j + 1][1]
            );          
        }
        tem_length = 0;
      }
      function print_line(x1, y1, x2, y2) {
        var x3,
          x4 = 0;
        if(x1 !== 0){
          x3 = print_horizon(x1, y1);
          x4 = print_horizon(x2, y2);
        }
        else{
          x3 = print_horizon(x2,y2);
          list2[tem_length][0] = x3;
          list2[tem_length][1] = y2;
          tem_length += 1;
        }
        if (x1 === x2) {
          print_vertical(x3, y1, x4, y2);
        }
      }
      function print_horizon(x1, y1) {
        
        context.moveTo(x1, y1);
        context.lineTo(x1 + width, y1);
        context.strokeStyle = "black";
        // 線の太さ
        context.lineWidth = 3;
        // 線を描画する
        context.stroke();
        return x1 + width;
      }
      function print_vertical(x3, y3, x4, y4) {
        var tem_x,
          tem_y = 0;
        context.moveTo(x3, y3);
        context.lineTo(x4, y4);
        context.strokeStyle = "black";
        // 線の太さ
        context.lineWidth = 3;
        // 線を描画する
        context.stroke();
        tem_x = (x3 + x4) / 2;
        tem_y = (y3 + y4) / 2;
        list2[tem_length][0] = tem_x;
        list2[tem_length][1] = tem_y;
        tem_length += 1;
        list3[count] = new Array(2);
        list3[count][0] = tem_x;
        list3[count][1] = tem_y;
        count +=1;
      }
      
      list4[0] = new Array(2);
      list4[0][0] = list3[0][0];
      list4[0][1] = list3[0][1];

      var count2 = 1;
      for(var i=1; i < list3.length; i++){
        for(var j=0; j < list4.length; j++){
          if(list3[i][0] != list4[j][0] && list3[i][1] != list4[j][1]){
            list4[count2] = new Array(2);
            list4[count2][0] = list3[i][0];
            list4[count2][1] = list3[i][1];
            count2++;
          }
        }
      }


      for(var i=0; i < list4.length; i++){
        let add = document.createElement("a");
        add.textContent = "2-0";
        let url = 'http~';
        add.setAttribute('href', url);
        add.style.position = 'absolute';
        add.style.left = list4[i][0] + 'px';
        add.style.top = list4[i][1] + 'px'; 
       // 基準となる要素を指定します。
        let sample = document.getElementById("content");
       // 基準となる要素の前に用意した要素を追加します。
        sample.appendChild(add);
      }
    }
  }, [loaded]);

  return (
    <div> 
      <canvas width="1280" height="1280" id="canvas"></canvas>
      <div id='content'></div>
    </div>
  );
};

export default PrintTournament;
