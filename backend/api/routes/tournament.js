const router = require("express").Router();
//const mysql = require("mysql2");
//const async = require('async');
//const config = require("../mysqlConnection/config");
const { beginTran, executeQuery } = require("../mysql_client.js");

//const pool = mysql.createPool(config.serverConf);

//大会情報登録
router.post("/tournament_register", async(req, res, next) => {
    const { tournament_name, opening} = req.body;
    try{
        const rows = await executeQuery('select count(*) from t_tournament where tournament_name = ? and opening = ?',[tournament_name, opening]);
        if (rows[0]['count(*)']>=1){
            return res.status(400).json([
                {
                    message: "すでにその大会は存在しています。"
                }
            ]); 
        } else {
            await executeQuery('insert into t_tournament values (0, ?, ?)', [tournament_name, opening]);
            res.end('OK');
        }
        //await executeQuery('select * from t_tournament values (0, ?, ?)',[tournament_name, opening]);
    }
    catch(err){
        console.log(err);
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        //select文とlimitで同じ大会名と開会日の大会がすでに登録されていないかを判定
        connection.query("select * from t_tournament where tournament_name = ? and opening = ? LIMIT 1", [tournament_name, opening], (err, rows) => {
            //connection.release();
            //console.log(rows.length);
            if(rows.length != 0){
                connection.release();
                return res.status(400).json([
                    {
                        message: "すでにその大会は存在しています。"
                    }
                ]); 
            }else{
                connection.query("insert into t_tournament values (0, ?, ?)", [tournament_name, opening], (err, rows) => {
                    //connection.release();
                    if (err) {
                        connection.release();
                        return res.status(400).json([
                            {
                                message: "大会情報を登録できません"
                            }
                        ]); 
                    } else {
                        //大会IDを取得している.なくてもいいかも
                        connection.query("select last_insert_id()", (err, rows) => {
                            connection.release();
                            if (err){
                                return res.status(400).json([
                                    {
                                        message: "IDを取得できませんでした"
                                    }
                                ]);
                            } else {
                                return res.json(rows);
                            }
                        });
                    }
                });
            }
        });
    });*/
});

//登録されている大会のテーブルを最新のものかつnotnullな１０件呼び出してクライアント側に渡す
router.post("/tournament_call", async (req, res, next) => {
    //const { tournament_name, opening} = req.body;
    try{
        const rows = await executeQuery('select * from t_tournament order by opening desc limit 10');
        return res.json(rows);
    }
    catch(err){
        console.log(err);
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        //select文とlimitで同じ大会名と開会日の大会がすでに登録されていないかを判定
        connection.query("select * from t_tournament order by opening desc limit 10",(err, rows) => {
            connection.release();
          
            if(err){
                return res.status(400).json([
                    {
                        message: "大会情報を読みだせませんでした"
                    }
                ]); 
            }else{
                return res.json(rows);
            }
        })
    });*/
});

//大会テーブルの編集
router.post("/tournament_edit", async (req, res, next) => {
    const { tournament_id, tournament_name, opening} = req.body;
    try{
        await executeQuery('update t_tournament set tournament_name = ?, opening = ? where tournament_id = ?', [tournament_name, opening, tournament_id]);
        res.end('OK');
    }
    catch(err){
        console.log(err);
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        //select文とlimitで同じ大会名と開会日の大会がすでに登録されていないかを判定
        connection.query('update t_tournament set tournament_name = ?, opening = ? where tournament_id = ?', [tournament_id, opening, tournament_name], (err, rows) => {
            connection.release();
          
            if(err){
                return res.status(400).json([
                    {
                        message: "大会情報を編集できませんでした"
                    }
                ]); 
            }else{
                return res.json(rows);
            }
        })
    });*/
});

//大会テーブルの削除
router.post("/tournament_delete", async (req, res, next) => {
    const { tournament_id} = req.body;
    try{
        await executeQuery('delete from t_tournament where tournament_id = ?', [tournament_id]);
        res.end('OK');
    }
    catch(err){
        console.log(err);
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        //大会情報の削除
        connection.query('delete from t_tournament where tournament_id = ?', [tournament_id], (err, rows) => {
            connection.release();
          
            if(err){
                return res.status(400).json([
                    {
                        message: "大会情報を削除できませんでした"
                    }
                ]); 
            }else{
                return res.json(rows);
            }
        })
    });*/
});

//トーナメント表作成した場合の登録
router.post("/tournament_table_register", async (req, res, next) => {
    const { tournament_id } = req.body;

    try{
        await executeQuery('insert into t_tournament_table values ("0", ?)', [tournament_id]);
        res.end("OK");
    }
    catch(err){
        console.log('sippai');
        console.log(err);
        next(err);
    }
});

//トーナメント表一覧呼び出し
router.post("/tournament_table_call", async (req, res, next) => {
    try{
        //const rows = await executeQuery('select * from t_participants as a join t_school as b using(school_id) where tournament_id = ?', [tournament_id]);
        const rows = await executeQuery('select * from t_tournament_table join t_tournament using(tournament_id)');
        return res.json(rows);
    }
    catch(err){
        console.log('sippai');
        console.log(err);
        next(err);
    }
});

//トーナメント表情報呼び出し
router.post("/tournament_table_inf_call", async (req, res, next) => {
    const { tournament_id } = req.body;
    try{
        //トーナメント表情報
        //const rows = await executeQuery(`select * from t_at_bat as bat join (select * from t_starting_player where game_id = ?) as s_player using(player_id) join t_school as school on s_player.school_id = school.school_id where at_bat_id = ?`, [game_id, at_bat_id]);
        const rows = await executeQuery('select * from t_participants as parti join (select * from t_tournament where tournament_id = ?)  as tour using(tournament_id) join t_school as school using(school_id) order by school_order',[tournament_id]);
        return res.json(rows);
    }
    catch(err){
        console.log('sippai');
        console.log(err);
        next(err);
    }
});

/*
router.post("/tournament_table_inf_call", async (req, res, next) => {
    const { tournament_id } = req.body;
    try{
        //const rows = await executeQuery(`select * from t_at_bat as bat join (select * from t_starting_player where game_id = ?) as s_player using(player_id) join t_school as school on s_player.school_id = school.school_id where at_bat_id = ?`, [game_id, at_bat_id]);
        const rows = await executeQuery('select game_id, tournament_id, school_id_1, school_id_2 from t_game where torurnament_id = ? as a join (select * from t_at_bat where game_id = ? order by desc) as b a.school_id_1=b.school_id limit order by join t_school as school using(school_id) order by school_order',[tournament_id]);
        return res.json(rows);
    }
    catch(err){
        console.log('sippai');
        console.log(err);
        next(err);
    }
});*/


module.exports = router;