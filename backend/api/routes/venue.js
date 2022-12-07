const router = require("express").Router();
//const mysql = require("mysql2");
const config = require("../mysqlConnection/config");
const { beginTran, executeQuery } = require("../mysql_client.js");
//const pool = mysql.createPool(config.serverConf);

//会場情報登録
router.post("/venue_register", async (req, res, next) => {
    const {venue_name} = req.body;

    try{
        rows = await executeQuery("select * from t_venue where venue_name = ? LIMIT 1", [venue_name]);
        if (rows[0]['count(*)'] >= 1){
            return res.status(400).json([
                {
                    message: "すでにその試合は存在しています。"
                }
            ]);
        } else{
            try{
                await executeQuery("insert into t_venue values (0, ?)", [venue_name]);
                res.end("OK");
            }
            catch(err){
                console.log("会場情報を登録できない");
                console.log(err);
                next(err);
            }
        }
    }
    catch(err){
        console.log(err);
        next(err);
    }
});
/*
router.post("/venue_register", (req, res) => {
    const {venue_name} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        //select文とlimitで同じ名前の会場がすでに登録されていないかを判定
        connection.query("select * from t_venue where venue_name = ? LIMIT 1", [venue_name], (err, rows) => {
            //connection.release();
            //console.log(rows.length);
            if(rows.length != 0){
                connection.release();
                return res.status(400).json([
                    {
                        message: "すでにその会場は登録しています。"
                    }
                ]); 
            }else{
                connection.query("insert into t_venue values (0, ?)", [venue_name], (err, rows) => {
                    connection.release();
                    if (err) {
                        return res.status(400).json([
                            {
                                message: "会場情報を登録できませんでした"
                            }
                        ]); 
                    }
                    res.end('OK');
                });
            }
        });
    });
});*/

//登録されている会場を呼び出し
router.post("/venue_call", async (req, res, next) => {
    try{
        //会場呼び出し
        const rows = await executeQuery('select * from t_venue');
        return res.json(rows);
    }
    catch(err){
        console.log(err);
        //res.end("No good");
        next(err);
    }
});
/*
router.post("/venue_call", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("MYSQLと接続中です");
        //登録されている全ての会場のテーブルを読み出し
        connection.query("select * from t_venue",(err, rows) => {
            connection.release();
            if(err){
                return res.status(400).json([
                    {
                        message: "会場情報を読みだせませんでした"
                    }
                ]); 
            }else{
                return res.json(rows);
            }
        });
    });
});*/

//登録されている会場の削除
router.post("/venue_delete", async (req, res, next) => {
    const { venue_id } = req.body;

    try{
        await executeQuery('delete from t_tournament where venue_id = ?', [venue_id]);
        res.end('OK');
    }
    catch(err){
        //next(err);
        console.log(err);
        next(err);
    }

    /*try{
        const rows = await executeQuery("delete from kaizyou where venue_id = ?", [venue_id]);
        console.log(rows);
        if(rows[0]['count(*)' >= 1]){
            await executeQuery(`drop table ${table_name}`);
            res.end("OK");
        }
        else{
            console.log('そんなテーブルないです');
        }
    }
    catch(err){
        console.log("会場情報を消去できませんでした");
        console.log(err);
    }*/
});
/*
router.post("/venue_delete", (req, res) => {
    const { venue_id } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        //登録されている全ての会場のテーブルを読み出し
        connection.query("delete from t_venue where venue_id = ?", [venue_id], (err, rows) => {
            connection.release();
            if(err){
                return res.status(400).json([
                    {
                        message: "会場情報を消去できませんでした"
                    }
                ]); 
            }
        });
    });
});*/

//登録されている会場の編集
router.post("/venue_edit", async (req, res, next) => {
    //console.log(req.body);
    const { venue_id, venue_name } = req.body;

    try{
        await executeQuery('update t_venue set venue_name = ? where venue_id = ?', [venue_name, venue_id]);
        res.end("OK");
    }    
    catch{
        console.log('会場テーブルを編集できません');
        console.log(err);
        next(err);
    }    
});

module.exports = router;
