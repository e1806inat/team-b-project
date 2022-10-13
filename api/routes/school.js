const router = require("express").Router();
const mysql = require("mysql2");
const async = require('async');
const config = require("../mysqlConnection/config");

const pool = mysql.createPool(config.serverConf);

//学校情報登録
router.post("/school_register", (req, res) => {
    const { tournament_id, school_name } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");

        //次はデータ取得から
        connection.query("insert into t_school values (0, ?, ?)", [ tournament_id, school_name], (err, rows) => {
            connection.release();

            console.log(rows);
            if (err) {
                return res.status(400).json([
                    {
                        message: "学校情報の登録に失敗しました"
                    }
                ]); 
            } 
        });
    });
});

//対象の大会の学校情報呼び出し
router.post("/school_call", (req, res) => {
    const { tournament_name, opening} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");

        //大会名と開会日から求めた大会IDから大会参加校のデータを取得
        connection.query("select school_id, school_name from t_school where tournament_id in (select tournament_id from t_tournament where tournament_name = ? and opening = ?)", [ tournament_name, opening], (err, rows) => {
            connection.release();

            console.log(rows);
            //console.log(err);

            if (err) {
                return res.status(400).json([
                    {
                        message: "学校情報の登録に失敗しました"
                    }
                ]); 
            }else{
                return res.json(rows);
            } 
            
        });
    });
});

module.exports = router;
