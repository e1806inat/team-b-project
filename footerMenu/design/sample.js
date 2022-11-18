$(function() {
    $.ajax({
      url: 'game.html', 
      dataType: 'html', 
      // 読み込み成功時の処理
      success: function (data) {
        $('p').prepend(data);
      },
      // 読み込み失敗時の処理
      error: function () {
        alert('header error!');
      },
    });
  });