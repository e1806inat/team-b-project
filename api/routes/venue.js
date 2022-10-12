const router = require("express").Router();
const mysql = require("mysql2");
const config = require("../mysqlConnection/config");

const pool = mysql.createPool(config.serverConf);

//会場情報登録
router.post("/venue_register", (req, res) => {
    const {venue_name} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        //const date = new Date().toLocaleString('sv').replace(/\D/g, '');
        //console.log(date);
        //select文とlimitで同じ大会名と開会日の大会がすでに登録されていないかを判定
        connection.query("select * from t_venue where venue_name = ? LIMIT 1", [venue_name], (err, rows) => {
            connection.release();
            //console.log(rows.length);
            if(rows.length != 0){
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
                                message: "会場情報を登録できません"
                            }
                        ]); 
                    }
                });
            }
        });
    });
});

//登録されている大会を呼び出し
router.post("/venue_call", (req, res) => {
    const { tournament_name, opening, closing } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        //const date = new Date().toLocaleString('sv').replace(/\D/g, '');
        //console.log(date);
        //select文とlimitで同じ大会名と開会日の大会がすでに登録されていないかを判定
        connection.query("select * from t_venue",(err, rows) => {
            connection.release();
            if(err){
                return res.status(400).json([
                    {
                        message: "会場情報を読みだせません"
                    }
                ]); 
            }else{
                return res.json(rows);
            }
        })
    });
});

module.exports = router;
