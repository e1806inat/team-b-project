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
        connection.query(`select count(*) from login where user_name = "${email}"`, async (err, rows) => {
            connection.release();
            if (err) {
                console.log('matigatteiru');
            }
            if (rows[0]['count(*)'] >= 1) {
                return res.status(400).json([
                    {
                        message: "すでにそのユーザは存在しています。"
                    }
                ]);
            } else { 

                //パスワードのハッシュ化とソルト
                let hashedPassword = await bcrypt.hash(password, 10)
        
                //ユーザの登録
                connection.query(`insert into login values ("0", "${email}", "${hashedPassword}")`, (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log('登録失敗');
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
        connection.query(`select * from login where user_name = "${email}"`, async (err, rows) => {
            connection.release();
            if (err) {
                console.log('matigatteiru');
            }

            //ユーザの存在確認
            if (!rows[0]['user_name']) {
                return res.status(400).json([
                    {
                        message: "そのユーザは存在しません"
                    }
                ]);
            } else { 

                //ハッシュ値の解読
                const isMatch = await bcrypt.compare(password, rows[0]['passward']);
                if (!isMatch) {
                    return res.status(400).json([
                        {
                            message: "パスワードが異なります"
                        }
                    ]);
                } else {
                    return true;
                }
            }
        });
    });
});

module.exports = router;