export const battedBall = (context, canvasX1, canvasY1, flag, deleteball, setDeleteBall) => {

    const homebase = 520;
    const h = 70;
    const l = -110;

    context.beginPath();
    context.moveTo(homebase + l, homebase + h);

    flag = parseInt(flag)
    //付け足しました
    // if (flag === 2) flag = 4


    //１が直線、２がフライ、3がゴロ、４がヒット
    if (canvasX1 === 0 && canvasY1 === 0) setDeleteBall(!deleteball)
    else if (flag === 1) {
        console.log("flag1")
        context.lineTo(canvasX1, canvasY1)
    }
    else if (flag === 2) {
        let cp1 = { x: homebase, y: homebase / 5 * 3 };
        let cp2 = { x: (homebase + l) * 11 / 10, y: canvasY1 + l };
        let cp3 = { x: (homebase + l) * 9 / 10, y: canvasY1 + l };
        if (canvasY1 > 0.7 * homebase) {
            console.log("uu")
            context.quadraticCurveTo(cp1.x + l, cp1.y + h, canvasX1, canvasY1);
        }
        else if (canvasX1 < homebase + l) {
            console.log("ii")
            console.log(cp2.x)
            console.log(cp2.y)
            console.log(canvasX1)
            console.log(canvasY1)
            context.quadraticCurveTo(cp2.x, cp2.y, canvasX1, canvasY1);
        }
        else {
            console.log("aa")
            context.quadraticCurveTo(cp3.x, cp3.y, canvasX1, canvasY1);
        }
        console.log("flag2")

    }
    else if (flag === 3) {
        console.log("flag3")
        drawWaveLine(homebase + l, homebase + h, canvasX1, canvasY1, 20, 20, "red", context);
    }
    else if (flag === 4) {
        console.log("flag4")
        //第一着地点Y座標計算用
        let a = (homebase + h - canvasY1) / (homebase + l - canvasX1)
        let b = homebase * (1 - a) + h - l * a
        //第一着地点X座標
        let q1 = canvasX1 + (homebase + l - canvasX1) / 4
        let q2 = canvasX1 - (canvasX1 - homebase - l) / 4
        //第一着地点カーブ計算用
        let cp1 = { x: homebase * 11 / 10 + l, y: a * q1 + b };
        let cp2 = { x: homebase * 9 / 10 + l, y: a * q2 + b };
        //第二着地点カーブ計算用
        let cp3 = { x: canvasX1 * 22 / 20, y: canvasY1 };
        let cp4 = { x: canvasX1 * 19 / 20, y: canvasY1 };
        if (canvasX1 < homebase + l) {
            context.quadraticCurveTo(cp1.x, cp1.y, q1, a * q1 + b)
            context.quadraticCurveTo(cp3.x, cp3.y, canvasX1, canvasY1)
        }
        else {
            context.quadraticCurveTo(cp2.x, cp2.y, q2, a * q2 + b)
            context.quadraticCurveTo(cp4.x, cp4.y, canvasX1, canvasY1)
        }

    }
    else {
        console.log("Flag = " + flag)
        drawWaveLine(homebase + l, homebase + h, canvasX1, canvasY1, 20, 20, "red", context);
    }


    context.strokeStyle = "red";
    context.lineWidth = 5;
    context.stroke();



    // 波線描画
    // 0度状態でキャンバス中心〜マウス座標までの距離分の波線を描画して、マウス座標との角度分、回転する

    function drawWaveLine(x, y, mx, my, amplitude, waveLen, color, ctx) {
        const BEGIN = 0, CTRL = 1, END = 2;
        const x1 = 0, y1 = 1;
        console.log("関数内")
        var distance = calcDistance(x, y, mx, my);
        var cycle = Math.floor(distance / waveLen);
        var ps = [[x, y], [0, 0], [x, y]];

        ctx.save();
        ctx.strokeStyle = color;
        ctx.beginPath();

        ctx.moveTo(ps[BEGIN][x1], ps[BEGIN][y1]);

        var rad = calcRadian(x, y, mx, my);
        if (0 !== rad) {
            ctx.translate(x, y);
            ctx.rotate(rad);
            ctx.translate(-x, -y);
        }

        for (var i = 0; i < cycle; i++) {
            ps[END][x1] += waveLen;
            ps[CTRL][x1] = ps[BEGIN][x1] + ((ps[END][x1] - ps[BEGIN][x1]) * 0.5);
            ps[CTRL][y1] = ps[BEGIN][y1] + ((i % 2 !== 0) ? -amplitude : amplitude);

            ctx.quadraticCurveTo(ps[CTRL][x1], ps[CTRL][y1], ps[END][x1], ps[END][y1]);

            ps[BEGIN][x1] = ps[END][x1];
            ps[BEGIN][y1] = ps[END][y1];
        }

        ps[END][x1] += distance - calcDistance(x, y, ps[END][x1], ps[END][y1]);
        ps[CTRL][x1] = ps[BEGIN][x1] + ((ps[END][x1] - ps[BEGIN][x1]) * 0.5);
        ps[CTRL][y1] = ps[BEGIN][y1] + (((cycle) % 2 !== 0) ? -amplitude : amplitude);

        ctx.quadraticCurveTo(ps[CTRL][x1], ps[CTRL][y1], ps[END][x1], ps[END][y1]);

        ctx.stroke();
        ctx.restore();
    }

    // 2点間座標からラジアン算出
    function calcRadian(x, y, mx, my) {
        return Math.atan2(my - y, mx - x);
    }

    // 2点間座標の距離算出
    function calcDistance(x, y, mx, my) {
        return Math.hypot(my - y, mx - x);
    }
}