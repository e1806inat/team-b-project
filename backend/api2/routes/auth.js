//ログイン画面のAPIたち
const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
//const mysql = require("mysql2");
//const config = require("../mysqlConnection/config");
//const { application } = require("express");
//トランザクション処理ありのSQLと通常のSQL処理を関数化
const { beginTran, executeQuery } = require("../mysql_client.js");
//const { nextTick } = require("async");
//const { errorHandler } = require("../error");
//const pool = mysql.createPool(config.serverConf);
/*
const pool = mysql.createPool({
    host: "133.71.101.108",
    user: "test_user",
    password: "v2V!%Nwc",
    database: "test_pbl",
});*/

router.get("/", (req, res) => {
    res.send("Hello Authjs");
});

//ユーザの登録のAPI
router.post("/user_register", body("password").isLength({ min: 6 }), async (req, res, next) => {
    const user_name = req.body.user_name;
    const password = req.body.password;

    //メールアドレスとパスワードのバリデーションチェック
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("1");
    const tran = await beginTran();

    try {
        rows = await tran.query(`select count(*) from t_login where user_name = ?`, [user_name]);
        if (rows[0]['count(*)'] >= 1) {
            console.log("2");
            //connection.release();
            return res.status(400).json([
                {
                    message: "すでにそのユーザは存在しています。"
                }
            ]);
        } else {
            console.log("3");
            //パスワードのハッシュ化とソルト
            let hashedPassword = await bcrypt.hash(password, 10)

            try {
                console.log("4");
                await tran.query(`insert into t_login values ("0", ?, ?)`, [user_name, hashedPassword]);
                await tran.commit();
                res.end("OK");
                console.log("5")
            }
            catch (err) {
                console.log('登録失敗');
                await tran.rollback();
                next(err);
            }
            //ユーザの登録
            /*
            connection.query(`insert into t_login values ("0", "${user_name}", "${hashedPassword}")`, (err, rows) => {
                connection.release();
                if (err) {
                    console.log('登録失敗');
                    //return;
                }
            });*/
        }
    }
    catch (err) {
        console.log("6");
        console.log(err);
        await tran.rollback();
        next(err);
    }
    /*
    pool.getConnection(async (err, connection) => {
        if (err) throw err;
        console.log("MySQLと接続中です");

        //DBにユーザが存在しているか確認
        connection.query(`select count(*) from t_login where user_name = ?`, [user_name], async (err, rows) => {
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
                connection.query(`insert into t_login values ("0", "${user_name}", "${hashedPassword}")`, (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log('登録失敗');
                        //return;
                    }
                });
            }
        });
    });*/
});

//ユーザの削除API
router.post("/user_delete", async (req, res, next) => {
    const { user_name } = req.body;

    const tran = await beginTran();

    try {
        const rows = await tran.query(`select count(*) from t_login where user_name = ?`, [user_name]);
        if (rows[0]['count(*)'] < 1) {
            console.log("2");
            return res.status(400).json([
                {
                    message: "そのユーザは存在していません。"
                }
            ]);
        } else {
            console.log("3");
            try {
                console.log("4");
                await tran.query(`delete from t_login where user_name = ?`, [user_name]);
                await tran.commit();
                res.end("OK");
                console.log("5")
            }
            catch (err) {
                console.log('削除失敗');
                await tran.rollback();
                next(err);
            }
        }
    }catch (err) {
        console.log("6");
        console.log('matigatteiru');
        await tran.rollback();
        next(err);
    }
    /*
    pool.getConnection(async (err, connection) => {
        if (err) throw err;
        console.log("MySQLと接続中です");

        //DBにユーザが存在しているか確認
        connection.query(`select count(*) from t_login where user_name = ?`, [user_name], (err, rows) => {
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
                connection.query(`delete from t_login where user_name = ?`, [user_name], (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log('削除失敗');
                        //return;
                    }
                });
            }
        });
    });*/
});

//ログイン用のAPI
router.post("/login", async (req, res, next) => {
    const { user_name, password } = req.body;
    try {
        const rows = await executeQuery(`select * from t_login where user_name = ?`, [user_name]);
        console.log(rows);
        if (rows == 0 && rows == false) {
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
                console.log(rows);
                req.session.user = rows;
                console.log(req.session.user);
                return res.json({
                    id: "OK"
                });
            }
        }
    } catch (err) {
        console.log('matigatteiru');
        console.log(err);
        next(err);
    }
    /*
    pool.getConnection(async (err, connection) => {
        connection.query(`select * from t_login where user_name = ?`, [user_name], async (err, rows) => {
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
                    req.session.user = rows;
                    return res.json({
                        id:"OK"
                    });
                }
            }
        });
    });*/
});

//ログアウト
router.get("/logout", (req, res) => {
    //console.log("asdf");
    console.log(req.session.user);
    req.session.destroy();
    //res.redirect("/auth");
    res.end("OK");
});

//セッションのチェック
router.get("/check_sess", (req, res, next) => {
    try {
        console.log(req.session.user);
        if (req.session.user){
            res.end("Login");
        } else {
            res.end("logout");
        }
    }
    catch (err) {
        next(err);
    }
});

//ユーザ編集(パスワード編集)のAPI
router.post("/user_update", body("password").isLength({ min: 6 }), async (req, res, next) => {
    const user_name = req.body.user_name;
    const password = req.body.password;

    const errors = validationResult(req);s

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const tran = await beginTran();

    try {
        const rows = await tran.query(`select count(*) from t_login where user_name = ?`, [user_name]);
        if (rows[0]['count(*)'] < 1) {
            console.log("2");
            return res.status(400).json([
                {
                    message: "そのユーザは存在していません。"
                }
            ]);
        } else {
            console.log("3");
            try {
                console.log("4");
                let hashedPassword = await bcrypt.hash(password, 10)
                await tran.query(`update t_login set password = ? where user_name = ?`, [hashedPassword, user_name]);
                await tran.commit();
                res.end("OK");
                console.log("5")
            }
            catch (err) {
                console.log('パスワード更新失敗');
                await tran.rollback();
                next(err);
            }
        }
    }catch (err) {
        console.log("6");
        console.log('matigatteiru');
        await tran.rollback();
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("MySQLと接続中です");

        //DBにユーザが存在しているか確認
        connection.query(`select count(*) from t_login where user_name = ?`, [user_name], async (err, rows) => {
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
                connection.query(`update t_login set password = ? where user_name = ?`, [hashedPassword, user_name], (err, rows) => {
                    connection.release();
                    console.log(err);
                    if (err) {
                        console.log('パスワード更新失敗');
                        //return;
                    }
                });
            }
        });
    });*/
});


module.exports = router;