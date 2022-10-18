import $ from 'jquery';
import "./App.css";

function App() {
  const result = [
    ["弾道", "キャンセル", "エラー", "アウト", "ヒット"],
    ["センター", "キャンセル", "ゴロ", "ライナー", "フライ"],
    ["得点", "4", "3", "2", "1"],
  ];

  var direction = "";
  var position = "";
  window.addEventListener("load", function () {
    //スワイプ/フリック
    document
      .getElementById("content1")
      .addEventListener("touchmove", onTouchMove);
    //タッチ開始
    document
      .getElementById("content1")
      .addEventListener("touchstart", onTouchStart);
    //タッチ終了
    document
      .getElementById("content1")
      .addEventListener("touchend", onTouchEnd);

    //スワイプ/フリック
    document
      .getElementById("content2")
      .addEventListener("touchmove", onTouchMove);
    //タッチ開始
    document
      .getElementById("content2")
      .addEventListener("touchstart", onTouchStart);
    //タッチ終了
    document
      .getElementById("content2")
      .addEventListener("touchend", onTouchEnd);

    //スワイプ/フリック
    document
      .getElementById("content3")
      .addEventListener("touchmove", onTouchMove);
    //タッチ開始
    document
      .getElementById("content3")
      .addEventListener("touchstart", onTouchStart);
    //タッチ終了
    document
      .getElementById("content3")
      .addEventListener("touchend", onTouchEnd);
  });

  function onTouchStart(event) {
    $(event.currentTarget).addClass("gray_for_touch");
    position = event.touches[0];
    direction = "c";

    var offset = $(event.currentTarget).offset();
    $(".key_u").offset({ top: offset.top - 48, left: offset.left });
    $(".key_d").offset({ top: offset.top + 48, left: offset.left });
    $(".key_l").offset({ top: offset.top, left: offset.left - 48 });
    $(".key_r").offset({ top: offset.top, left: offset.left + 48 });

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
    //addClassで要素に指定したclass属性を付与できる removeは逆

    var new_position = event.touches[0];

    var u = position.screenY - new_position.screenY;
    var d = new_position.screenY - position.screenY;
    var l = position.screenX - new_position.screenX;
    var r = new_position.screenX - position.screenX;

    var max = Math.max(u, d, r, l);
    if (max < 20) {
      return;
    }

    // var input_key = $(event.currentTarget).text();

    if (max === u) {
      direction = "u";
      $(".key_u").css('background-color','rgba(255,255,255,0.8)');
      $(".key_d").css('background-color','rgba(255,255,255,0.3)');
      $(".key_l").css('background-color','rgba(255,255,255,0.3)');
      $(".key_r").css('background-color','rgba(255,255,255,0.3)');
    } else if (max === d) {
      direction = "d";
      $(".key_d").css('background-color','rgba(255,255,255,0.8)');
      $(".key_u").css('background-color','rgba(255,255,255,0.3)');
      $(".key_l").css('background-color','rgba(255,255,255,0.3)');
      $(".key_r").css('background-color','rgba(255,255,255,0.3)');
    } else if (max === l) {
      direction = "l";
      $(".key_l").css('background-color','rgba(255,255,255,0.8)');
      $(".key_u").css('background-color','rgba(255,255,255,0.3)');
      $(".key_d").css('background-color','rgba(255,255,255,0.3)');
      $(".key_r").css('background-color','rgba(255,255,255,0.3)');
    } else if (max === r) {
      direction = "r";
      $(".key_r").css('background-color','rgba(255,255,255,0.8)');
      $(".key_u").css('background-color','rgba(255,255,255,0.3)');
      $(".key_d").css('background-color','rgba(255,255,255,0.3)');
      $(".key_l").css('background-color','rgba(255,255,255,0.3)');
    }
  }

  function onTouchEnd(event) {
    $(".key_u").addClass("transparent");
    $(".key_d").addClass("transparent");
    $(".key_l").addClass("transparent");
    $(".key_r").addClass("transparent");
    $(event.currentTarget).removeClass("transparent");

    // var input_key = "";
    // var key = $(event.currentTarget).text();

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

    var text = $("#text").val();
    if (l[index] === "") {
      return;
    }
    console.log(l[index]);
    $("#text").val(l[index]);
  }

  return (
    <div>
      <input type="text" id="text" readOnly></input>
      <div className="key_shadow">
        <div className="key_u key_flick transparent"></div>
      </div>
      <div className="key_shadow">
        <div className="key_d key_flick transparent"></div>
      </div>
      <div className="key_shadow">
        <div className="key_l key_flick transparent"></div>
      </div>
      <div className="key_shadow">
        <div className="key_r key_flick transparent"></div>
      </div>
      <div align="center">
        <div id="content1">弾道</div>
        <div id="content2">センター</div>
        <div id="content3">得点</div>
      </div>
    </div>
  );
}

export default App;
