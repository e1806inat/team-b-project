// export const baseballButton = () => {
//     return (
//         <div className="button">
//             <div className="addScore">
//                 <button>得点</button>
//                 <button>四球</button>
//                 <button>死球</button>
//                 <button>三振</button>
//                 <button>更新</button>
//             </div>
//         </div>
//     )
// }


import $ from "jquery";
import { useEffect } from "react";
import "./CSS/baseballButone.css";

export const BaseballButton = () => {
  const result = [
    ["弾道", "キャンセル", "エラー", "アウト", "ヒット"],
    ["センター", "キャンセル", "ゴロ", "ライナー", "フライ"],
    ["得点", "4", "3", "2", "1"],
  ];

  var direction = "";
  var position = "";





  useEffect (() => {
    aa()
    console.log("エフェクト");
  }, [])

  const aa = () => {
    //スワイプ/フリック
    document.getElementById("content1").addEventListener("touchmove", onTouchMove);
    //タッチ開始
    document.getElementById("content1").addEventListener("touchstart", onTouchStart);
    //タッチ終了
    document.getElementById("content1").addEventListener("touchend", onTouchEnd);

    //スワイプ/フリック
    document.getElementById("content2").addEventListener("touchmove", onTouchMove);
    //タッチ開始
    document.getElementById("content2").addEventListener("touchstart", onTouchStart);
    //タッチ終了
    document.getElementById("content2").addEventListener("touchend", onTouchEnd);

    //スワイプ/フリック
    document.getElementById("content3").addEventListener("touchmove", onTouchMove);
    //タッチ開始
    document.getElementById("content3").addEventListener("touchstart", onTouchStart);
    //タッチ終了
    document.getElementById("content3").addEventListener("touchend", onTouchEnd);
  }



  function onTouchStart(event) {
    position = event.touches[0];
    console.log("qq");
    direction = "c";

    var offset = $(event.currentTarget).offset();
    // console.log(offset);
    $(".key_u").offset({ top: offset.top - 40, left: offset.left });
    $(".key_d").offset({ top: offset.top + 40, left: offset.left });
    $(".key_l").offset({ top: offset.top, left: offset.left - 40 });
    $(".key_r").offset({ top: offset.top, left: offset.left + 40 });
    $(".key_u_back").offset({ top: offset.top - 40, left: offset.left });
    $(".key_d_back").offset({ top: offset.top + 40, left: offset.left });
    $(".key_l_back").offset({ top: offset.top, left: offset.left - 40 });
    $(".key_r_back").offset({ top: offset.top, left: offset.left + 40 });

    let l = result.find((x) => x.includes($(event.currentTarget).text()));
    $(".key_u").text(l[1]);
    $(".key_d").text(l[3]);
    $(".key_l").text(l[2]);
    $(".key_r").text(l[4]);
  }

  function onTouchMove(event) {
    direction = "c";
    $(".key_u").removeClass("transparent");
    $(".key_d").removeClass("transparent");
    $(".key_l").removeClass("transparent");
    $(".key_r").removeClass("transparent");
    $(".key_u_back").removeClass("transparent");
    $(".key_d_back").removeClass("transparent");
    $(".key_l_back").removeClass("transparent");
    $(".key_r_back").removeClass("transparent");

    var new_position = event.touches[0];

    var u = position.screenY - new_position.screenY;
    var d = new_position.screenY - position.screenY;
    var l = position.screenX - new_position.screenX;
    var r = new_position.screenX - position.screenX;

    var max = Math.max(u, d, r, l);
    if (max < 20) {
      $(".key_r_back").css("background-color", "rgba(255,255,255,0.3)");
      $(".key_u_back").css("background-color", "rgba(255,255,255,0.3)");
      $(".key_d_back").css("background-color", "rgba(255,255,255,0.3)");
      $(".key_l_back").css("background-color", "rgba(255,255,255,0.3)");
      return;
    }

    if (max === u) {
      direction = "u";
      $(".key_u_back").css("background-color", "rgba(255,255,255,0.8)");
      $(".key_d_back").css("background-color", "rgba(255,255,255,0.3)");
      $(".key_l_back").css("background-color", "rgba(255,255,255,0.3)");
      $(".key_r_back").css("background-color", "rgba(255,255,255,0.3)");
    } else if (max === d) {
      direction = "d";
      $(".key_d_back").css("background-color", "rgba(255,255,255,0.8)");
      $(".key_u_back").css("background-color", "rgba(255,255,255,0.3)");
      $(".key_l_back").css("background-color", "rgba(255,255,255,0.3)");
      $(".key_r_back").css("background-color", "rgba(255,255,255,0.3)");
    } else if (max === l) {
      direction = "l";
      $(".key_l_back").css("background-color", "rgba(255,255,255,0.8)");
      $(".key_u_back").css("background-color", "rgba(255,255,255,0.3)");
      $(".key_d_back").css("background-color", "rgba(255,255,255,0.3)");
      $(".key_r_back").css("background-color", "rgba(255,255,255,0.3)");
    } else if (max === r) {
      direction = "r";
      $(".key_r_back").css("background-color", "rgba(255,255,255,0.8)");
      $(".key_u_back").css("background-color", "rgba(255,255,255,0.3)");
      $(".key_d_back").css("background-color", "rgba(255,255,255,0.3)");
      $(".key_l_back").css("background-color", "rgba(255,255,255,0.3)");
    }
  }

  function onTouchEnd(event) {
    $(".key_u").addClass("transparent");
    $(".key_d").addClass("transparent");
    $(".key_l").addClass("transparent");
    $(".key_r").addClass("transparent");
    $(".key_u_back").addClass("transparent");
    $(".key_d_back").addClass("transparent");
    $(".key_l_back").addClass("transparent");
    $(".key_r_back").addClass("transparent");
    $(event.currentTarget).removeClass("transparent");

    var l = result.find((x) => x.includes($(event.currentTarget).text()));
    var index = 0;

    if (direction === "c") {
      index = 0;
    } else if (direction === "u") {
      index = 1;
    } else if (direction === "d") {
      index = 3;
    } else if (direction === "l") {
      index = 2;
    } else if (direction === "r") {
      index = 4;
    }

    // var text = $("#text").val();
    if (l[index] === "") {
      return;
    }
    $("#text").val(l[index]);
  }

  return (
    <div>
      {/* 必須 */}
      <input type="text" id="text" readOnly></input>
      <div className="key_shadow">
        <div className="key_u_back transparent"></div>
        <div className="key_u transparent"></div>
      </div>
      <div className="key_shadow">
        <div className="key_d_back transparent"></div>
        <div className="key_d  transparent"></div>
      </div>
      <div className="key_shadow">
        <div className="key_l_back transparent"></div>
        <div className="key_l  transparent"></div>
      </div>
      <div className="key_shadow">
        <div className="key_r_back transparent"></div>
        <div className="key_r transparent"></div>
      </div>

      <div align="center">
        <div id="content1">弾道</div>
        <br></br>
        <div id="content2">センター</div>
        <br></br>
        <div id="content3">得点</div>
        {/* <div className="box">回転</div> */}
      </div>
    </div>
  );
}
