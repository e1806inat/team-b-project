const router = require("express").Router();
const mysql = require("mysql2");
const config = require("../mysqlConnection/config");

//const pool = mysql.createPool(config.serverConf);

//会場情報登録
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
                });
            }
        });
    });
});

//登録されている会場を呼び出し
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
});

//登録されている会場の削除
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
});


module.exports = router;
