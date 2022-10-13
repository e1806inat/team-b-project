//選手情報関連のAPIたち
const router = require("express").Router();
const mysql = require("mysql2");
const async = require('async');
const config = require("../mysqlConnection/config");

const pool = mysql.createPool(config.serverConf);

//選手情報登録
router.post("/member_register", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log(req.body)
        console.log("MYSQLと接続中です");
        
        req.body.forEach( function(value) {
            //次はデータ取得から
            connection.query('insert into t_player values (0, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)', [value.tournament_id, value.school_id, value.player_name_kanji, value.player_name_hira, value.position, value.uniform_number, value.grade, value.handed_hit, value.handed_throw], (err, rows) => {
                connection.release();
                console.log(rows);
                if (err) {
                    console.log('読み取り失敗');
                }
            });
        }); 
    });
});

//スタメン選択
router.post("/starting_member_register", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log(req.body)
        console.log("MYSQLと接続中です");
        
        req.body.forEach( function(value) {
            //次はデータ取得から
            connection.query('update t_player set  batting_order = ?, s_member = ? where player_id = ?', [value.batting_order, value.s_member, value.player_id], (err, rows) => {
                connection.release();
                if (err) {
                    console.log('読み取り失敗');
                } 
            });
        }); 

        connection.query("select * from t_player where s_member is not null", (err, rows) => {
            if (err) {
                console.log('読み取り失敗');
            }else{
                return res.json(rows);
            }  
        });
    });
});

//選手情報編集のための呼び出し
router.post("/member_change_call", (req, res) => {
    const { tournament_id, school_id } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log(req.body)
        console.log("MYSQLと接続中です");

        connection.query('select * from t_player where tournament_id = ? and school_id = ?', [tournament_id, school_id], (err, rows) => {
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
        });
    });
});

//選手情報編集、選手情報を消すこともできる
router.post("/member_edit", (req, res) => {
    const {player_id, tournament_id, school_id, player_name_kanji, player_name_hira, position, uniform_number, grade, handed_hit, handed_throw} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log(req.body)
        console.log("MYSQLと接続中です");

        connection.query('update t_player set  player_name_kanji = ?, player_name_hira = ?, position = ?, uniform_number = ?, grade = ?, handed_hit = ?, handed_throw = ? where player_id = ? and tournament_id = ? and school_id = ?', [player_name_kanji, player_name_hira, position, uniform_number, grade, handed_hit, handed_throw, player_id, tournament_id, school_id], (err, rows) => {
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