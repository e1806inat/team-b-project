const router = require("express").Router();
const mysql = require("mysql2");
//const async = require('async');
const config = require("../mysqlConnection/config");

const pool = mysql.createPool(config.serverConf);

//学校情報登録
router.post("/school_register", (req, res) => {
    const { school_name } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");

        //学校名のかぶりがあるか判定
        connection.query("select * from t_school where school_name = ? LIMIT 1", [school_name], (err, rows) => {
            //connection.release();

            if (rows.length != 0) {
                connection.release();
                return res.status(400).json([
                    {
                        message: "すでにその学校は存在しています。"
                    }
                ]);
            } else {
                connection.query("insert into t_school values (0, ?)", [school_name], (err, rows) => {
                    connection.release();

                    console.log(rows);
                    if (err) {
                        return res.status(400).json([
                            {
                                message: "学校情報の登録に失敗しました"
                            }
                        ]);
                    } else {
                        return res.json([
                            {
                                message: "成功しました"
                            }
                        ]);
                    }
                });
            }
        });
    });
});


//学校情報編集
router.post("/school_edit", (req, res) => {
    const { school_id, school_name } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log(req.body)
        console.log("MYSQLと接続中です");

        connection.query('update t_school set school_name = ? where school_id = ?', [school_name, school_id], (err, rows) => {
            connection.release();
            console.log(rows);
            if (err) {
                return res.status(400).json([
                    {
                        message: "学校情報を更新できません"
                    }
                ]);
            } else {
                console.log(rows);
            }
        });
    });
});

/*
//大会ごとの参加校を登録
router.post("/participants_register", (req, res) => {
    //const { tournament_id, school_name } = req.body;
    console.log(req.body);
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");

        req.body.forEach(function (value) {
            //次はデータ取得から
            connection.query('insert into t_participants values (?, ?)', [value.tournament_id, value.school_id], (err, rows) => {
                //connection.release();
                //console.log(err);
                if (err) {
                    console.log('読み取り失敗');
                }
            });
        });
        connection.release();
    });
});*/

//対象の大会の学校情報呼び出し
router.post("/school_call", (req, res) => {
    const { tournament_id } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");

        //大会名と開会日から求めた大会IDから大会参加校のデータを取得
        connection.query("select * from t_school where school_id in (select school_id from t_participants where tournament_id = ?)", [tournament_id], (err, rows) => {
            connection.release();

            if (err) {
                return res.status(400).json([
                    {
                        message: "学校情報の読み出しに失敗しました"
                    }
                ]);
            } else {
                return res.json(rows);
            }

        });
    });
});

/*
//参加学校情報を消すことができる
router.post("/participants_delete", (req, res) => {
    const { tournament_id, school_id } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log(req.body)
        console.log("MYSQLと接続中です");

        connection.query('delete from participants where tournament_id = ? and school_id = ?', [tournament_id, school_id], (err, rows) => {
            connection.release();
            console.log(rows);
            if (err) {
                return res.status(400).json([
                    {
                        message: "参加校情報を消去できません"
                    }
                ]);
            } else {
                console.log(rows);
                //return;
            }
        });
    });
});*/

module.exports = router;
