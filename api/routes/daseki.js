//一打席速報入力画面のAPIたち
const router = require("express").Router();
//const { nextTick } = require("async");
//const mysql = require("mysql2");
//const config = require("../mysqlConnection/config");
const { beginTran, executeQuery } = require("../mysql_client.js");
/*
const pool = mysql.createPool({
    host: "133.71.101.108",
    user: "test_user",
    password: "v2V!%Nwc",
    database: "test_pbl",
});*/

//const pool = mysql.createPool(config.serverConf);

router.get("/", (req, res) => {
    res.send("Hello daseki");
});

//一時打席情報登録用のテーブルに打席情報登録（UPSERTを使うかも）
router.post("/daseki_register", async (req, res) => {
    const { table_name, at_bat_id, inning, game_id, school_id, player_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind } = req.body;

    try {
        await executeQuery(`insert into ${table_name} values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [at_bat_id, inning, game_id, school_id, player_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind]);
        res.end("OK");
    }
    catch (err) {
        //next(err);
        console.log(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");

        //次はデータ取得から
        connection.query(`insert into ${table_name} values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [at_bat_id, inning, game_id, school_id, player_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind], (err, rows) => {
            connection.release();

            if (err) {
                console.log('試合情報を登録できません');
            }
        });
    });*/
});

//一時打席情報登録用のテーブル作成
router.post("/tmp_table_create", async (req, res) => {
    //create table のための名前作成
    const table_name = `test_pbl.` + req.body['table_name']

    console.log(table_name);

    try {
        await executeQuery(`create table ${table_name} (at_bat_id int not null, inning varchar(5), game_id int not null,  school_id int not null, player_id int not null, score int, total_score int, outcount int, base char(3), text_inf varchar(300), pass bool, touched_coordinate varchar(100), ball_kind varchar(10), primary key(at_bat_id, inning, game_id))`);
    }
    catch (err) {
        //next(err);
        console.log("hehehe")
    }
    res.end("OK");

    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        
        //一時的にデータを保存するためのテーブル作成
        connection.query(`create table ${table_name}(at_bat_id int not null, inning varchar(5), game_id int not null,  school_id int not null, player_id int not null, score int, total_score int, outcount int, base char(3), text_inf varchar(300), pass bool, touched_coordinate varchar(100), ball_kind varchar(10), primary key(at_bat_id, inning, game_id))`,(err, rows) => {
            connection.release();

            console.log(err);
            if (err) {
                console.log('試合テーブルを作成できません');
            }
    
        });
    });*/
});

//一時打席情報登録用のテーブル削除
router.post("/tmp_table_delete", async (req, res) => {

    const { table_name, game_id } = req.body;

    const tran = await beginTran();

    try {
        //rows = await tran.query(`select exists(select * from t_at_bat where game_id = ?)`, [game_id]);
        const rows = await tran.query(`select count(*) from t_at_bat where game_id = ?`, [game_id]);
        console.log(rows);
        if (rows[0]['count(*)'] >= 1) {
            try {
                await tran.query(`drop table ${table_name}`);
                await tran.commit();
                res.end("OK");
            }
            catch (err) {
                console.log("sakujodekinai")
                await tran.rollback();
            }
            /*
            connection.query(`drop table ${table_name}`,(err, rows) => {
                connection.release();
    
                console.log(err);
                if (err) {
                    console.log('試合テーブルを削除できません');
                }
            });*/
        }
        else {
            //保存されていないときの処理
            console.log('そんなテーブルないです');
            //console.log(err);
            await tran.rollback();
            next(err);
        }
    }
    catch (err) {
        console.log('試合テーブルを削除できません');
        console.log(err);
        await tran.rollback();
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        
        //蓄積テーブルに試合データが保存されていることを確認
        connection.query(`select exists(select * from t_at_bat where game_id = ?)`, [game_id], (err, rows) => {

            console.log(rows);
            
            if (err) {
                console.log('試合テーブルを削除できません');
            }
            //保存されていれば一時テーブルを削除
            if (rows>=0){
                connection.query(`drop table ${table_name}`,(err, rows) => {
                    connection.release();
        
                    console.log(err);
                    if (err) {
                        console.log('試合テーブルを削除できません');
                    }
                });
            }
            else{
                //保存されていないときの処理
                connection.release();
                console.log('試合が保存されてません');
            }
        });
    });*/
});

//一時打席情報登録テーブルの情報を打席情報蓄積テーブルへ送信
router.post("/data_register", async (req, res) => {
    //一時テーブルの名前受け取り
    const { tmp_table_name } = req.body;

    const tran = await beginTran();

    try {
        await tran.query(`insert into t_at_bat select * from ${tmp_table_name}`);
        await tran.commit();
        res.end("OK");
    }
    catch (err) {
        console.log('試合テーブルを削除できません');
        await tran.rollback();
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        
        //一時的にデータを保存するためのテーブル作成
        connection.query(`insert into t_at_bat select * from ${tmp_table_name}`,(err, rows) => {
            connection.release();

            console.log(err);
            if (err) {
                console.log('試合テーブルを削除できません');
            }
    
        });
    });*/
});

//試合情報送信
router.post("/daseki_transmission", async (req, res) => {
    const { table_name, at_bat_id, inning, game_id } = req.body;

    try {
        const rows = await executeQuery(`select * from ${table_name} where at_bat_id = ? and inning = ? and game_id = ?`, [at_bat_id, inning, game_id]);
        return res.json(
            {
                at_bat_id: rows[0]['at_bat_id'],
                inning: rows[0]['inning'],
                game_id: rows[0]['game_id'],
                school_id: rows[0]['school_id'],
                player_id: rows[0]['player_id'],
                score: rows[0]['score'],
                total_score: [0]['total_score'],
                outcount: rows[0]['outcount'],
                base: rows[0]['base'],
                text_inf: rows[0]['text_inf'],
                pass: rows[0]['pass'],
                touched_coordinate: rows[0]['touched_coordinate'],
                ball_kind: rows[0]['ball_kind']
            }
        );
    }
    catch (err) { 
        console.log('試合情報を読み込めません');
        await tran.rollback();
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        console.log(at_bat_id);
        console.log(inning);
        console.log(game_id);
        
        //一時打席情報テーブルから情報をデータ取得
        connection.query(`select * from ${table_name} where at_bat_id = ? and inning = ? and game_id = ?`, [at_bat_id, inning, game_id], (err, rows) => {
            connection.release();

            console.log(rows);

            if (err) {
                console.log('試合情報を読み込めません');
            } else {
                //データをJSON形式で送信
                return res.json(
                    {
                        at_bat_id: rows[0]['at_bat_id'],
                        inning: rows[0]['inning'],
                        game_id: rows[0]['game_id'],
                        school_id: rows[0]['school_id'],
                        player_id:rows[0]['player_id'],
                        score:rows[0]['score'],
                        total_score:[0]['total_score'],
                        outcount: rows[0]['outcount'],
                        base: rows[0]['base'],
                        text_inf: rows[0]['text_inf'],
                        pass: rows[0]['pass'],
                        touched_coordinate: rows[0]['touched_coordinate'],
                        ball_kind: rows[0]['ball_kind']
                    }
                );
            }
        });
    });*/
});

//試合中選手情報更新
router.post("/player_data_change", async (req, res) => {
    //const { player_id, game_id, school_id, player_name_kanji, player_name_hira, position, uniform_number, grade, handed_hit, handed_throw, batting_order } = req.body;
    const { player_id, game_id, school_id, position, batting_order } = req.body;

    const tran = await beginTran();

    try{
        await tran.query('update t_player set  position = ?, batting_order = ? where player_id = ? and game_id = ? and school_id = ?', [position, batting_order, player_id, game_id, school_id]);
        await tran.commit();
        res.end("OK");
    }
    catch(err){
        console.log(err);
        await tran.rollback();
        next(err);
    }
    /*
    pool.getConnection(async (err, connection) => {
        connection.query('update t_starting set  position = ?, batting_order = ? where player_id = ? and game_id = ? and school_id = ?', [position, batting_order, player_id, game_id, school_id], async (err, rows) => {
            connection.release();

            if (err) {
                console.log('スタメンでエラー起きてる');
            }
            console.log(rows);
        });
    });*/
});

//試合情報更新（編集）
router.post("/daseki_update", async (req, res) => {
    const { table_name, at_bat_id, game_id, school_id, player_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind } = req.body;

    const tran = await beginTran();

    try{
        await tran.query(`update ${table_name} set school_id = ?, player_id = ?, score = ?, total_score = ?, outcount = ?, base = ?, text_inf = ?, pass = ?, touched_coordinate = ?, ball_kind = ? where at_bat_id = ? and game_id = ?`, [school_id, player_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, at_bat_id, game_id]);
        await tran.commit();
        res.end("OK");
    }
    catch(err){
        console.log('試合情報を登録できません');
        await tran.rollback();
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");

        //試合情報の更新
        connection.query(`update ${table_name} set school_id = ?, player_id = ?, score = ?, total_score = ?, outcount = ?, base = ?, text_inf = ?, pass = ?, touched_coordinate = ?, ball_kind = ? where at_bat_id = ? and game_id = ?`, [school_id, player_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, at_bat_id, game_id], (err, rows) => {
            connection.release();

            console.log(rows);
            if (err) {
                console.log('試合情報を登録できません');
            }
        });
    });*/
});

module.exports = router;