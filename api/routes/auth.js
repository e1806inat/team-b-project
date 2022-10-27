//ログイン画面のAPIたち
const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const config = require("../mysqlConnection/config");
const { application } = require("express");

const pool = mysql.createPool(config.serverConf);

router.get("/", (req, res) => {
    res.send("Hello Authjs");
});

//ユーザの登録のAPI
router.post("/user_register", body("email").isEmail(), body("password").isLength({ min: 6 }), async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //メールアドレスとパスワードのバリデーションチェック
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    pool.getConnection(async (err, connection) => {
        if (err) throw err;
        console.log("MySQLと接続中です");

        //DBにユーザが存在しているか確認
        connection.query(`select count(*) from t_login where email = ?`, [email], async (err, rows) => {
            //connection.release();
            if (err) {
                console.log('matigatteiru');
            }
            console.log(err);
            if (rows[0]['count(*)'] >= 1) {
                connection.release();
                return res.status(400).json([
                    {
                        message: "すでにそのユーザは存在しています。"
                    }
                ]);
            } else { 

                //パスワードのハッシュ化とソルト
                let hashedPassword = await bcrypt.hash(password, 10)
        
                //ユーザの登録
                connection.query(`insert into t_login values ("0", "${email}", "${hashedPassword}")`, (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log('登録失敗');
                        //return;
                    }
                });
            }
        });
    });
});

//ユーザの削除API
router.post("/user_delete", async (req, res) => {
    const {email} = req.body;
   
    pool.getConnection(async (err, connection) => {
        if (err) throw err;
        console.log("MySQLと接続中です");

        //DBにユーザが存在しているか確認
        connection.query(`select count(*) from t_login where email = ?`, [email], (err, rows) => {
            //connection.release();
            if (err) {
                console.log('matigatteiru');
            }
            console.log(rows);
            if (rows[0]['count(*)'] < 1) {
                connection.release();
                return res.status(400).json([
                    {
                        message: "そのユーザは存在していません。"
                    }
                ]);
            } else { 
                //ユーザの削除
                connection.query(`delete from t_login where email = ?`, [email], (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log('削除失敗');
                        //return;
                    }
                });
            }
        });
    });
});

//ログイン用のAPI
router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    pool.getConnection(async (err, connection) => {
        connection.query(`select * from t_login where email = ?`, [email], async (err, rows) => {
            connection.release();
            //console.log(rows);            
            if (err) {
                console.log('matigatteiru');
            }
            //ユーザの存在確認
            if ( rows == 0 && rows == false ) {
                return res.status(400).json([
                    {
                        message: "そのユーザは存在しません"
                    }
                ]);
            } else {

                //ハッシュ値の解読
                const isMatch = await bcrypt.compare(password, rows[0]['password']);
                if (!isMatch) {
                    return res.status(400).json([
                        {
                            message: "パスワードが異なります"
                        }
                    ]);
                } else {
                    return res.json({
                        id:"OK"
                    });
                }
            }
        });
    });
});

//ユーザ編集(パスワード編集)のAPI
router.post("/user_update",  body("email").isEmail(), body("password").isLength({ min: 6 }), (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
   
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("MySQLと接続中です");

        //DBにユーザが存在しているか確認
        connection.query(`select count(*) from t_login where email = ?`, [email], async(err, rows) => {
            //connection.release();
            if (err) {
                console.log('matigatteiru');
            }
            console.log(rows);
            if (rows[0]['count(*)'] < 1) {
                connection.release();
                return res.status(400).json([
                    {
                        message: "そのユーザは存在していません。"
                    }
                ]);
            } else { 
                let hashedPassword = await bcrypt.hash(password, 10)
                //ユーザの削除
                connection.query(`update t_login set password = ? where email = ?`, [hashedPassword, email], (err, rows) => {
                    connection.release();
                    console.log(err);
                    if (err) {
                        console.log('パスワード更新失敗');
                        //return;
                    }
                });
            }
        });
    });
});


module.exports = router;