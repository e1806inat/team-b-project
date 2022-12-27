//ログイン画面のAPIたち
const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
//トランザクション処理ありのSQLと通常のSQL処理を関数化
const { beginTran, executeQuery } = require("../mysql_client.js");

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

//ユーザの登録のAPI（運用者用webアプリ）
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
        //入力されたユーザがすでに登録されていないか確認
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
                //ユーザ登録
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
        }
    }
    catch (err) {
        console.log("6");
        console.log(err);
        await tran.rollback();
        next(err);
    }
});

//ユーザの削除API（運用者用webアプリ）
router.post("/user_delete", async (req, res, next) => {
    const { user_name } = req.body;

    const tran = await beginTran();

    try {
        //ユーザの存在確認
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
                //ユーザ削除
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
});

//ログイン用のAPI（運用者用webアプリ）
router.post("/login", async (req, res, next) => {
    const { user_name, password } = req.body;
    try {
        //ユーザ存在確認
        const rows = await executeQuery(`select * from t_login where user_name = ?`, [user_name]);
        //console.log(rows);
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
                //console.log('私の名前は森口翔太です。好きなものはせんとくんです。');
                //console.log(rows);
                //ユーザ情報をセッションに登録
                console.log(req.session.user);
                req.session.user = rows;
                console.log(req.session.user);
                //console.log(req.cookies);

                //res.cookie('session_id', 'value1', req);
                // res.cookie('sessionID', req.sessionID, {
                //     maxAge:60000,
                //     httpOnly:false,
                // })

                res.cookie('sessionID', req.sessionID);

                //res.setHeader('Set-Cookie', [`sessionID=${req.sessionID}`]);

                //console.log(res.cookie(req.sessionID))
                //res.json({
                  //  'session_id': req.sessionID
                //});
                res.end('OK');
            }
        }
    } catch (err) {
        console.log('matigatteiru');
        console.log(err);
        next(err);
    }
});

//ログアウト（運用者用webアプリ）
router.get("/logout", (req, res, err) => {
    
    try{
        console.log("asdf");
        //console.log(req.session.user);
        //delete req.session.user;
        //req.session.destroy
        if(!req.session.user){
            console.log('naidesu');
        }
        res.clearCookie('sessionID');
        //sessionStore.close();
        //req.session.destroy();
        //console.log('test');
        // if(req.session.user){
        //     console.log('arimasu');
        // }
        //console.log(req.cookies);
        //res.redirect("/auth");
        res.end("OK");
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

//セッションのチェック（運用者用webアプリ）
router.get("/check_sess", async (req, res, next) => {
    try {
        console.log(req.cookies);
        console.log(req.cookies.sessionID);
        if (req.cookies.sessionID != undefined){
            return res.end('login');
        }
        else{
            return res.end('logout');
        }
        // for (const value of Object.keys(req.cookies)) {
        //     const rows = await executeQuery('select count(*) from sessions where session_id = ?', [value]);
        //     if (rows[0]['count(*)'] >= 1){
        //         console.log('a');
        //          return res.end('login');
        //     }
        // }
        
        // console.log(req.session.user);
        // console.log(req.sessionID);
        // const rows = await executeQuery(`select count(*) from sessions where session_id = ?`, [req.sessionID]);
        // if (rows[0]['count(*)'] >= 1){
        //     res.end("Login");
        // } else {
        //     res.end("logout");
        // }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//ユーザ編集(パスワード編集)のAPI（運用者用webアプリ）
router.post("/user_update", body("password").isLength({ min: 6 }), async (req, res, next) => {
    const user_name = req.body.user_name;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const tran = await beginTran();

    try {
        //ユーザの存在確認
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
                //ユーザ編集
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
});


module.exports = router;