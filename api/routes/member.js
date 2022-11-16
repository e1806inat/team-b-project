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
        /*
        connection.query('insert into t_player values (0, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)', [value.tournament_id, value.school_id, value.player_name_kanji, value.player_name_hira, value.position, value.uniform_number, value.grade, value.handed_hit, value.handed_throw], (err, rows) => {
            connection.release();
            console.log(rows);
            if (err) {
                console.log('読み取り失敗');
            }
        });*/
        res.end("OK");
    } catch (err) {
        next(err);
    }
});

//大会毎の選手情報登録
router.post("/tournament_member_register", async (req, res, next) => {
    try {
        for (const value of req.body) {
            await executeQuery('insert into t_registered_player values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [value.player_id, value.tournament_id, value.uniform_number, value.grade, value.handed_hit, value.handed_throw, value.BA]);
        }
        /*
        connection.query('insert into t_player values (0, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)', [value.tournament_id, value.school_id, value.player_name_kanji, value.player_name_hira, value.position, value.uniform_number, value.grade, value.handed_hit, value.handed_throw], (err, rows) => {
            connection.release();
            console.log(rows);
            if (err) {
                console.log('読み取り失敗');
            }
        });*/
        res.end("OK");
    } catch (err) {
        next(err);
    }
});
/*
pool.getConnection((err, connection) => {
    if (err) throw err;

    console.log(req.body)
    console.log("MYSQLと接続中です");
    //選手情報をforeachで処理。ただし、途中で読み込みに失敗したら処理をなかったことにするエラー処理が必要な気がする。
    /*
    const sql = 'insert into t_player2 ("", game_id, school_id, player_name_kanji, player_name_hira, position, uniform_number, grade, handed_hit, handed_throw, batting_order, s_member) values (?)';
    const values = req.body;

    connection.query(sql, values, function(err){
        if (err) throw err;
        connection.release();
    });
    
    req.body.forEach( function(value) {
        //次はデータ取得から
        connection.query('insert into t_player values (0, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)', [value.game_id, value.school_id, value.player_name_kanji, value.player_name_hira, value.position, value.uniform_number, value.grade, value.handed_hit, value.handed_throw], (err, rows) => {
            connection.release();
            console.log(rows);
            if (err) {
                console.log('読み取り失敗');
            }
        });
    });
    //return; 
});*/


//スタメン登録(このままでは途中で終了した場合に途中までinsertされたやつが残る。そこでupsertにすればもう一回入れなおした時にいい感じになりそう)
router.post("/starting_member_register", async (req, res, next) => {
    try {
        for (const value of req.body) {
            await executeQuery('insert into t_starting_player values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [value.player_id, value.game_id, value.position, value.uniform_number, value.grade, value.handed_hit, value.handed_throw, value.batting_order, value.BA]);
        }
        res.end("OK");
    }
    catch (err) {
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log(req.body)
        console.log("MYSQLと接続中です");

        req.body.forEach(function (value) {
            //次はデータ取得から
            connection.query('update t_player set  batting_order = ?, s_member = ? where player_id = ?', [value.batting_order, value.s_member, value.player_id], (err, rows) => {
                //connection.release();
                if (err) {
                    console.log('読み取り失敗');
                }
            });
        });

        connection.query("select * from t_player where s_member is not null", (err, rows) => {
            connection.release();
            if (err) {
                console.log('読み取り失敗');
                //return;
            } else {
                return res.json(rows);
            }
        });
    });*/
});


//３年生以下の学校毎の選手呼び出し
router.post("/member_call", async (req, res, next) => {
    const { school_id } = req.body;

    try {
        rows = await executeQuery('select * from t_player where grade <= 3 and school_id = ?', [school_id]);
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log(req.body)
        console.log("MYSQLと接続中です");

        connection.query('select * from t_player where game_id = ? and school_id = ?', [game_id, school_id], (err, rows) => {
            connection.release();
            if (err) {
                return res.status(400).json([
                    {
                        message: "選手情報を読みだせません"
                    }
                ]);
            } else {
                return res.json(rows);
            }
        });
    });*/
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
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log(req.body)
        console.log("MYSQLと接続中です");

        connection.query('update t_player set  player_name_kanji = ?, player_name_hira = ?, position = ?, uniform_number = ?, grade = ?, handed_hit = ?, handed_throw = ? where player_id = ? and game_id = ? and school_id = ?', [player_name_kanji, player_name_hira, position, uniform_number, grade, handed_hit, handed_throw, player_id, game_id, school_id], (err, rows) => {
            connection.release();
            console.log(rows);
            if (err) {
                return res.status(400).json([
                    {
                        message: "選手情報を更新できません"
                    }
                ]);
            } else {
                console.log(rows);
                //return;
            }
        });
    });*/
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