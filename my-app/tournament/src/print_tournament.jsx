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
      context.clearRect(0, 0, 1000, 1000);
      console.log(props.list1);
      setLoaded(true);
    }
  }, [context]);

  useEffect(() => {
    if (loaded) {
      var width = 50;
      var list1 = props.list1;
      var list2 = new Array();
      // var list3 = new Array();
      var dep = Math.log2(list1.length);
      var flag2 = 0;
      console.log(dep);
      context.fillStyle = "rgb(0,255,0)";
      context.fillRect(0, 0, 1280, 1280);
      // console.log(list1[0]);
      // console.log(list1.length);
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
        flag2 = 0;
      }
      function print_line(x1, y1, x2, y2) {
        var x3,
          x4 = 0;
        if(x1 != 0){
          x3 = print_horizon(x1, y1);
          x4 = print_horizon(x2, y2);
        }
        else{
          x3 = print_horizon(x2,y2);
          list2[flag2][0] = x3;
          list2[flag2][1] = y2;
          flag2 += 1;
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
        list2[flag2][0] = tem_x;
        list2[flag2][1] = tem_y;
        flag2 += 1;
      }
    }
  }, [loaded]);

  return (
    <>
      <canvas width="1280" height="1280" id="canvas"></canvas>
    </>
  );
};

export default PrintTournament;
