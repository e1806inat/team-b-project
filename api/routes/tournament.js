const router = require("express").Router();
const mysql = require("mysql2");
//const async = require('async');
const config = require("../mysqlConnection/config");

//const pool = mysql.createPool(config.serverConf);

//大会情報登録
router.post("/tournament_register", (req, res) => {
    const { tournament_name, opening} = req.body;
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
    });
});

//登録されている大会のテーブルを最新のものかつnotnullな１０件呼び出してクライアント側に渡す
router.post("/tournament_call", (req, res) => {
    //const { tournament_name, opening} = req.body;
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
    });
});

//大会テーブルの編集
router.post("/tournament_edit", (req, res) => {
    const { tournament_id, tournament_name, opening} = req.body;
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
    });
});

//大会テーブルの編集
router.post("/tournament_delete", (req, res) => {
    const { tournament_id} = req.body;
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
    });
});

module.exports = router;