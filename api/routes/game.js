const router = require("express").Router();
const mysql = require("mysql2");
const async = require('async');
const config = require("../mysqlConnection/config");

const pool = mysql.createPool(config.serverConf);

//試合情報登録
router.post("/game_register", (req, res) => {
    const { tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        //select文とlimitで同じ大会で同じ日に同じ学校同士の試合がすでに登録されていないかを判定
        connection.query("select * from t_game where tournament_id = ? and school_id_1 = ? and school_id_2 = ? and game_ymd = ? LIMIT 1", [tournament_id, school_id_1, school_id_2, game_ymd], (err, rows) => {
            connection.release();
            //console.log(rows.length);
            if (rows.length != 0){
                return res.status(400).json([
                    {
                        message: "すでにその試合は存在しています。"
                    }
                ]);
            } else {
                //登録されていない場合、試合テーブルを作成
                connection.query("insert into t_game values (0, ?, ?, ?, ?, ?, ?, ?, ?)", [tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd], (err, rows) => {
                    connection.release();
                    if (err) {
                        return res.status(400).json([
                            {
                                message: "試合情報を登録できません"
                            }
                        ]);
                    } else {
                        //作成した試合テーブルの試合ID(game_id)をクライアントに送信
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

//選手情報編集、選手情報を消すこともできる
router.post("/game_edit", (req, res) => {
    const {player_id, tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log(req.body)
        console.log("MYSQLと接続中です");

        connection.query('update t_player set  school_id_1 = ?, school_id_2 = ?, venue_id = ?, match_num = ?, first_rear_1 = ?, first_rear_2 = ?, game_ymd = ? where player_id = ? and tournament_id = ?', [school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, player_id, tournament_id], (err, rows) => {
            connection.release();
            console.log(rows);
            if(err){
                return res.status(400).json([
                    {
                        message: "選手情報を更新できません"
                    }
                ]); 
            }else{
                console.log(rows);
            }
        });
    });
});

module.exports = router;
