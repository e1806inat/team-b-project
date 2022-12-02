//選手情報関連のAPIたち
const router = require("express").Router();
//const mysql = require("mysql2");
//const async = require('async');
//const config = require("../mysqlConnection/config");
const { beginTran, executeQuery } = require("../mysql_client.js");
const cron = require("node-cron");

//const pool = mysql.createPool(config.serverConf);

//選手情報登録
router.post("/member_register", async (req, res, next) => {
    try {
        //for文で選手登録
        for (const value of req.body) {
            await executeQuery('insert into t_player values (0, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [value.school_id, value.player_name_kanji, value.player_name_hira, value.grade, value.handed_hit, value.handed_throw, value.hit_num, value.bat_num, value.BA]);
        }
        res.end("OK");
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//大会毎の選手情報登録
router.post("/tournament_member_register", async (req, res, next) => {
    try {
        for (const value of req.body) {
            //upsertで大会毎に出場する選手を登録
            await executeQuery('insert into t_registered_player (player_id, tournament_id, school_id, player_name_kanji, player_name_hira, uniform_number, grade, handed_hit, handed_throw, BA) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on duplicate key update player_name_kanji = values(player_name_kanji), player_name_hira = values(player_name_hira), grade = values(grade), handed_hit = values(handed_hit), handed_throw = values(handed_throw), BA = values(BA)', [value.player_id, value.tournament_id, value.school_id, value.player_name_kanji, value.player_name_hira, value.uniform_number, value.grade, value.handed_hit, value.handed_throw, value.BA]);
        }
        res.end("OK");
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//スタメン登録(このままでは途中で終了した場合に途中までinsertされたやつが残る。そこでupsertにすればもう一回入れなおした時にいい感じになりそう)
router.post("/starting_member_register", async (req, res, next) => {
    try {
        for (const value of req.body) {
            //upsertでスタメンを登録
            await executeQuery('insert into t_starting_player (player_id, game_id, school_id, player_name_kanji, player_name_hira, position, uniform_number, grade, handed_hit, handed_throw, batting_order, BA) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on duplicate key update position = values(position), uniform_number = values(uniform_number), grade = values(grade), handed_hit = values(handed_hit), handed_throw = values(handed_throw), batting_order = values(batting_order), BA = values(BA)', [value.player_id, value.game_id, value.school_id, value.player_name_kanji, value.player_name_hira, value.position, value.uniform_number, value.grade, value.handed_hit, value.handed_throw, value.batting_order, value.BA]);
        }
        res.end("OK");
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});


//３年生以下の学校毎の選手呼び出し
router.post("/member_call", async (req, res, next) => {
    const { school_id } = req.body;

    try {
        //３年生以下の選手を呼び出す。
        //選手の学年は毎年４月１日に更新され、３年生は４年生にと設定されている（grade:4）。
        const rows = await executeQuery('select * from t_player where grade <= 3 and school_id = ?', [school_id]);
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});
/*
//３年生以下の学校毎の選手呼び出し。大会に出場する選手登録画面で使用。
router.post("/member_call", async (req, res, next) => {
    const { school_id } = req.body;

    try {
        rows = await executeQuery('select * from t_player where grade <= 3 and school_id = ?', [school_id]);
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});*/

//大会に登録されている選手の呼び出し。スタメン登録画面で使用
router.post("/tournament_member_call", async (req, res, next) => {
    const { tournament_id, school_id } = req.body;

    try {
        //大会毎に登録されている選手の呼び出し
        const rows = await executeQuery('select * from t_registered_player where tournament_id = ? and school_id = ?', [tournament_id, school_id]);
        //const rows = await executeQuery('select * from t__player where tournament_id = ? and school_id = ?', [tournament_id, school_id]);
        //const rows = await executeQuery(`select * from ${table_name} as bat join (select * from t_starting_player where game_id = ?) as s_player using(player_id) join t_school as school on s_player.school_id = school.school_id where at_bat_id = ? and inning = ?`, [game_id, at_bat_id, inning]);
        //const rows = await executeQuery('select * from t_registered_player where tournament_id = ? and school_id = ? join (select player_id, player_name_kanji, playername_hira, grade, handed_hit, handed_throw, BA from t_player where grade <= 3 and school_id = ?) using(plaer_id)', [tournament_id, school_id, school_id]);
        //const rows = await executeQuery('select * from t_player as a join (select player_id, player_name_kanji from t_registered_player where tournament_id = ? and school_id = ?) as b using(player_id) where grade <= 3', [tournament_id, school_id]);
        return res.json(rows);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//試合ごとのスタメン呼び出し。どこで使うかは分からない。
router.post("/starting_member_call", async (req, res, next) => {
    const { game_id, school_id } = req.body;

    try {
        //試合ごとのスタメンの呼び出し
        const rows = await executeQuery('select * from t_starting_player where game_id = ? and school_id = ?', [game_id, school_id]);
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

/*
//一時スタメン情報保持のためのテーブル作成
router.post("/tmp_starting_create", async (req, res) => {
    //create table のための名前作成
    const table_name = `test_pbl.` + req.body['table_name']

    console.log(table_name);

    try {
        //一時打席情報登録用テーブル作成
        await executeQuery(`create table ${table_name} (
            player_id int not null, 
            game_id int not null, 
            school_id int,
            player_name_kanji varchar(300) not null,
            position varchar(20), 
            uniform_number int, 
            grade int, 
            handed_hit char(1), 
            handed_throw char(1), 
            batting_order int, 
            BA double,
            primary key(player_id, game_id),
            foreign key(school_id) references t_school(school_id))`);
    }
    catch (err) {
        //next(err);
        console.log("hehehe")
    }
    res.end("OK");
});*/

/*
//一時スタメン情報保持のためのテーブル作成
router.post("/tmp_starting_register", async (req, res) => {
    //create table のための名前作成
    const table_name = `test_pbl.` + req.body['table_name']

    console.log(table_name);

    try {
        await executeQuery(`insert into ${table_name} select * from t_starting_player as a join t_player (school_id, player_name_kanji) as b on a.player_id = b.player_id`);
    }
    catch (err) {
        //next(err);
        console.log("hehe")
    }
    res.end("OK");
});*/

//選手情報編集、選手情報を消すこともできる
router.post("/member_edit", async (req, res, next) => {
    const { player_id, school_id, player_name_kanji, player_name_hira, grade, handed_hit, handed_throw, BA } = req.body;

    //const tran = await beginTran();

    try {
        //選手情報の編集
        await executeQuery('update t_player set player_name_kanji = ?, player_name_hira = ?, grade = ?, handed_hit = ?, handed_throw = ?, BA = ? where player_id = ? and school_id = ?', [player_name_kanji, player_name_hira, grade, handed_hit, handed_throw, BA, player_id, school_id]);
        res.end('OK');
    }
    catch (err) {
        next(err);
    }
});

//選手情報編集、選手情報を消すこともできる
router.post("/tournament_member_edit", async (req, res, next) => {
    const { player_id, tournamnet_id, uniform_number, grade, handed_hit, handed_throw, BA } = req.body;

    //const tran = await beginTran();

    try {
        //大会登録選手情報の編集
        await executeQuery('update t_registered_player set uniform_number = ?, grade = ?, handed_hit = ?, handed_throw = ?, BA = ? where player_id = ? and tournament_id = ?', [uniform_number, grade, handed_hit, handed_throw, BA, player_id, tournamnet_id]);
        res.end('OK');
    }
    catch (err) {
        next(err);
    }
});

//選手情報編集、選手情報を消すこともできる
router.post("/starting_member_edit", async (req, res, next) => {
    const { player_id, game_id, position, uniform_number, grade, handed_hit, handed_throw, batting_order, BA } = req.body;

    //const tran = await beginTran();

    try {
        //試合ごとのスタメン情報の編集
        await executeQuery('update t_starting_player set position = ?,uniform_number = ?, grade = ?, handed_hit = ?, handed_throw = ?, batting_order = ?, BA = ? where player_id = ? and game_id = ?', [position, uniform_number, grade, handed_hit, handed_throw, batting_order, BA, player_id, game_id]);
        res.end('OK');
    }
    catch (err) {
        next(err);
    }
});

//大会毎の選手情報削除
router.post("/tournament_member_delete", async (req, res, next) => {
    const { tournament_id, player_id } = req.body;
    try {
        //大会登録選手の削除    
        await executeQuery('delete from t_registered_player where tournament_id = ? and player_id = ?', [tournament_id, player_id]);   
        res.end("OK");
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//スタメンの選手情報削除
router.post("/starting_member_delete", async (req, res, next) => {
    const { game_id, player_id } = req.body;
    try {
        //試合ごとの選手情報の削除    
        await executeQuery('delete from t_starting_player where game_id = ? and player_id = ?', [game_id, player_id]);   
        res.end("OK");
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//打率計算＆更新
router.post("/cal_BA", async (req, res, next) => {
    //試合結果から打率を計算する。
    const { game_id } = req.body;
    count_hit = {};
    count_bat = {};
    const tran = await beginTran();

    try {
        //試合で選手が安打を打った打席のplayer_idとhitフラグを取得
        rows = await tran.query('select player_id, hit, foreball, deadball from t_at_bat where game_id = ?', [game_id]);

        //for文を使って各選手毎の打席数とヒット数を計算
        for await (var values of rows) {
            var key = values['player_id']
            if (values['hit'] == 1) {
                count_hit[key] = (count_hit[key] || 0) + 1;
            } else {
                count_hit[key] = (count_hit[key] || 0);
            }
            if (values['foreball']!=1 && values['deadball']!=1){
                count_bat[key] = (count_bat[key] || 0) + 1;
            } else {
                count_bat[key] = (count_bat[key] || 0);
            }
        }
        //console.log(count_hit);
        //console.log(count_bat);
        //打率の計算と選手テーブルへの打率挿入
        for (var key in count_bat) {
            //選手テーブルから過去の打席数、安打数を取得
            rows = await tran.query('select hit_num, bat_num from t_player where player_id = ?', [key]);
            //打率の計算(計算式は打率(BA)＝総安打数(tmp_hit)/{総打席数(tmp_bat)-四死球合計数(foreball&deadball)})
            var tmp_hit = await rows[0]['hit_num'] + count_hit[key];
            var tmp_bat = await rows[0]['bat_num'] + count_bat[key];
            //console.log(tmp_bat);
            var BA = await Number((tmp_hit / tmp_bat).toFixed(3));
            //選手テーブルに新たな安打数、打席数、打率を挿入
            await tran.query('update t_player set hit_num = ?, bat_num = ?, BA = ? where player_id = ?', [tmp_hit, tmp_bat, BA, key]);
        }
        tran.commit();
        res.end('OK');
    }
    catch (err) {
        console.log(err);
        tran.rollback();
        next(err);
    }
});

//大会選手の打率を更新
router.post("/tournament_member_BA_update", async (req, res, next) => {
    const { player_id, tournamnet_id, BA } = req.body;

    //const tran = await beginTran();

    try {
        //大会登録選手情報の更新
        await executeQuery('update t_registered_player set BA = ? where player_id = ? and tournament_id = ?', [BA, player_id, tournamnet_id]);
        res.end('OK');
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//学校ID、選手名、学年が同じ選手がいないか確認
router.post("/check_member", async (req, res, next) => {
    const { school_id, player_name_kanji, grade } = req.body;

    try {
        //同じ選手が登録されていないかを確認
        const rows = await executeQuery('select count(*) from t_player where school_id = ? and grade = ? and player_name_kanji = ?', [school_id, grade, player_name_kanji]);
        if (rows[0]['count(*)']>=1){
            res.end('すでに登録されています');
        } else {
            res.end('登録されていません');
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//一年に一度学年更新
cron.schedule('* * * 1 4 *',async () => {
    //4月1日に学年を更新
    const tran = await beginTran();
    try{
        await tran.query('update t_player set grade = replace(grade, 3, 4) where grade = 3');
        await tran.query('update t_player set grade = replace(grade, 2, 3) where grade = 2');
        await tran.query('update t_player set grade = replace(grade, 1, 2) where grade = 1');
        tran.commit();
    }
    catch(err){
        tran.rollback();
        console.log(err);
        next(err);
    }
});

module.exports = router;