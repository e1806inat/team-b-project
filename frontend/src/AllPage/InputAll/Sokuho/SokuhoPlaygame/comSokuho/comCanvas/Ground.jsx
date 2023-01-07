export const Ground = (context) => {
    
    const homebase=520;
    const h=70;
    const l=-110;
    const w=0.03*homebase;  //ベースの幅
    const margin=10;    //ベース位置調整用
    
    //外野
    context.beginPath();
    context.fillStyle = "limegreen";
    context.moveTo(homebase+l, homebase + h);
    context.arc(homebase+l, homebase + h, homebase + margin * 7, -Math.PI / 4, 5 * Math.PI / 4, true);
    context.closePath();
    context.fill();

    //青
    context.beginPath();
    context.fillStyle = "blue";
    context.moveTo(homebase+l, homebase + h);
    context.arc(homebase+l, homebase + h, homebase + margin, -Math.PI / 4, 5 * Math.PI / 4, true);
    context.closePath();
    context.fill();

    //ポール
    context.beginPath();
    context.moveTo(homebase - homebase / Math.sqrt(2)+l, homebase + h - homebase / Math.sqrt(2));
    context.lineTo(homebase - homebase / Math.sqrt(2)+l, homebase + h - homebase / Math.sqrt(2) - 150)
    context.strokeStyle = "yellow"
    context.lineWidth = 5;
    context.stroke();
    context.beginPath();
    context.moveTo(homebase + homebase / Math.sqrt(2)+l, homebase + h - homebase / Math.sqrt(2));
    context.lineTo(homebase + homebase / Math.sqrt(2)+l, homebase + h - homebase / Math.sqrt(2) - 150)
    context.strokeStyle = "yellow"
    context.lineWidth = 5;
    context.stroke();

    //緑グラウンド
    context.beginPath();
    context.fillStyle = "yellowgreen";
    context.moveTo(homebase+l, homebase + h);
    context.arc(homebase+l, homebase + h, homebase, -Math.PI / 4, 5 * Math.PI / 4, true);
    context.closePath();
    context.fill();

    //茶グラウンド
    context.beginPath();
    context.fillStyle = "sienna";
    context.moveTo(homebase+l, homebase + h);
    context.arc(homebase+l, homebase + h, 3.5 * homebase / 5, -Math.PI / 4, 5 * Math.PI / 4, true);
    context.closePath();
    context.fill();

    //マウンド1
    context.beginPath();
    context.fillStyle = "#E19661";
    context.arc(homebase+l, homebase * 3 / 4 + w - margin + h, 20, 0, 2 * Math.PI, false);
    context.fill();

    //マウンド2
    context.beginPath();
    context.rect(homebase - 10+l, homebase * 3 / 4 + w - margin + h, 20, 5);
    context.fillStyle = "white";
    context.fill();

    //白線
    context.beginPath();
    context.moveTo(homebase+l, homebase + h);
    context.lineTo(homebase * 5 / 4+l, homebase * 3 / 4 + h);
    context.lineTo(homebase+l, homebase / 2 + h);
    context.lineTo(homebase * 3 / 4+l, homebase * 3 / 4 + h);
    context.strokeStyle = "white";
    context.lineWidth = 2;
    context.closePath();
    context.stroke();


    context.strokeStyle = "black";
    context.fillStyle = "white";

    //３塁ベース
    context.beginPath();
    context.moveTo(homebase * 3 / 4+l, homebase * 3 / 4 - margin + h);
    context.lineTo(homebase * 3 / 4 - w+l, homebase * 3 / 4 + w - margin + h);
    context.lineTo(homebase * 3 / 4+l, homebase * 3 / 4 + w * 2 - margin + h);
    context.lineTo(homebase * 3 / 4 + w+l, homebase * 3 / 4 + w - margin + h);
    context.closePath();
    context.fill();
    context.lineWidth = 1;
    context.stroke();

    //2塁ベース
    context.beginPath();
    context.moveTo(homebase+l, homebase / 2 - margin + h);
    context.lineTo(homebase - w+l, homebase / 2 + w - margin + h);
    context.lineTo(homebase+l, homebase / 2 + w * 2 - margin + h);
    context.lineTo(homebase + w+l, homebase / 2 + w - margin + h);
    context.closePath();
    context.fill();
    context.stroke();

    //1塁ベース
    context.beginPath();
    context.moveTo(homebase * 5 / 4+l, homebase * 3 / 4 - margin + h);
    context.lineTo(homebase * 5 / 4 - w+l, homebase * 3 / 4 + w - margin + h);
    context.lineTo(homebase * 5 / 4+l, homebase * 3 / 4 + w * 2 - margin + h);
    context.lineTo(homebase * 5 / 4 + w+l, homebase * 3 / 4 + w - margin + h);
    context.closePath();
    context.fill();
    context.stroke();


    //ホームベース
    context.beginPath();
    context.moveTo(homebase + w * 2 / 3+l, homebase - w * 2 / 3 + h);
    context.lineTo(homebase - w * 2 / 3+l, homebase - w * 2 / 3 + h);
    context.lineTo(homebase - w * 2 / 3+l, homebase + w / 3 + h);
    context.lineTo(homebase+l, homebase + w + h);
    context.lineTo(homebase + w * 2 / 3+l, homebase + w / 3 + h);
    context.closePath();
    context.fill();
    context.stroke();
            
}