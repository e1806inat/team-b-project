const router = require("express").Router();
//const mysql = require("mysql2");
const config = require("../mysqlConnection/config");
const { beginTran, executeQuery } = require("../mysql_client.js");

router.get("/", (req, res) => {
    res.send("Hello venuejs");
});

//会場情報登録
router.post("/venue_register", async (req, res, next) => {
    const {venue_name} = req.body;

    try{
        rows = await executeQuery("select count(*) from t_venue where venue_name = ?", [venue_name]);
        if (rows[0]['count(*)'] >= 1){
            return res.status(400).json([
                {
                    message: "すでに同じ名前の会場が登録されています。"
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

//登録されている会場を呼び出し
router.post("/venue_call", async (req, res, next) => {
    try{
        //会場呼び出し
        const rows = await executeQuery('select * from t_venue');
        return res.json(rows);
    }
    catch(err){
        console.log("会場情報を読みだせない");
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
});

//登録されている会場の編集
router.post("/venue_edit", async (req, res, next) => {
    //console.log(req.body);
    const { venue_id, venue_name } = req.body;

    try{
        rows = await executeQuery("select count(*) from t_venue where venue_name = ?", [venue_name]);
        if (rows[0]['count(*)'] >= 1){
            return res.status(400).json([
                {
                    message: "すでに同じ名前の会場が登録されています。"
                }
            ]);
        }
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
