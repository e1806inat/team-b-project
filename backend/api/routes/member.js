//選手情報関連のAPIたち
const router = require("express").Router();
const mysql = require("mysql2");
const async = require('async');
const config = require("../mysqlConnection/config");
const { beginTran, executeQuery } = require("../mysql_client.js");

//const pool = mysql.createPool(config.serverConf);

//選手情報登録
router.post("/member_register", async (req, res, next) => {
    try {
        for (const value of req.body) {
            await executeQuery('insert into t_player values (0, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [value.school_id, value.player_name_kanji, value.player_name_hira, value.grade, value.handed_hit, value.handed_throw, value.hit_num, value.bat_num, value.BA]);
        }
        console.log("Check1")
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
            await executeQuery('insert into t_registered_player values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [value.player_id, value.tournament_id, value.school_id, value.player_name_kanji, value.uniform_number, value.grade, value.handed_hit, value.handed_throw, value.BA]);
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
            await executeQuery('insert into t_starting_player values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [value.player_id, value.game_id, value.school_id, value.player_name_kanji, value.position, value.uniform_number, value.grade, value.handed_hit, value.handed_throw, value.batting_order, value.BA]);
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
        rows = await executeQuery('select * from t_player where grade <= 3 and school_id = ?', [school_id]);
        console.log("Check2")
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

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
});

//大会に登録されている選手の呼び出し。スタメン登録画面で使用
router.post("/tournament_member_call", async (req, res, next) => {
    const { tournament_id, school_id } = req.body;

    try {
        rows = await executeQuery('select * from t_player where tournament_id = ? and school_id = ?', [tournament_id, school_id]);
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

//試合ごとのスタメン呼び出し。どこで使うかは分からない。
router.post("/starting_member_call", async (req, res, next) => {
    const { game_id, school_id } = req.body;

    try {
        rows = await executeQuery('select * from t_player where game_id = ? and school_id = ?', [game_id, school_id]);
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
        await executeQuery('update t_starting_player set position = ?,uniform_number = ?, grade = ?, handed_hit = ?, handed_throw = ?, batting_order = ?, BA = ? where player_id = ? and game_id = ?', [position, uniform_number, grade, handed_hit, handed_throw, batting_order, BA, player_id, game_id]);
        res.end('OK');
    }
    catch (err) {
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
        rows = await tran.query('select player_id, hit from t_at_bat where game_id = ?', [game_id]);

        //for文を使って各選手毎の打席数とヒット数を計算
        for await (var values of rows) {
            var key = values['player_id']
            if (values['hit'] == 1) {
                count_hit[key] = (count_hit[key] || 0) + 1;
            } else {
                count_hit[key] = (count_hit[key] || 0);
            }
            count_bat[key] = (count_bat[key] || 0) + 1;
        }

        //打率の計算と選手テーブルへの打率挿入
        for (var key in count_bat) {
            //選手テーブルから過去の打席数、安打数を取得
            rows = await tran.query('select hit_num, bat_num from t_player where player_id = ?', [key]);
            //打率の計算(計算式は打率(BA)＝総安打数(tmp_hit)/総打席数(tmp_bat))
            var tmp_hit = await rows[0]['hit_num'] + count_hit[key];
            var tmp_bat = await rows[0]['bat_num'] + count_bat[key];
            console.log(tmp_bat);
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

module.exports = router;