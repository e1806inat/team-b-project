const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const { beginTran, executeQuery } = require("../mysql_client.js");

router.get("/", (req, res) => {
    res.send("Hello Authjs");
});

router.post("/user_register", body("password").isLength({ min: 8 }).not()
.isLowercase()
.not()
.isUppercase()
.not()
.isNumeric()
.not()
.isAlpha(), async (req, res, next) => {
    const user_name = req.body.user_name;
    const password = req.body.password;

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
            return res.status(400).json([
                {
                    message: "すでにそのユーザは存在しています。"
                }
            ]);
        } else {
            let hashedPassword = await bcrypt.hash(password, 10)

            try {
                await tran.query(`insert into t_login values ("0", ?, ?, NULL)`, [user_name, hashedPassword]);
                await tran.commit();
                return res.json({ok:"ok"});
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
            try {
                await tran.query(`delete from t_login where user_name = ?`, [user_name]);
                await tran.commit();
                return res.json({ok:"ok"});
            }
            catch (err) {
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

router.post("/login", async (req, res, next) => {
    const { user_name, password } = req.body;
    try {
        const rows = await executeQuery(`select * from t_login where user_name = ?`, [user_name]);
        if (rows == 0 && rows == false) {
            return res.status(400).json([
                {
                    message: "そのユーザは存在しません"
                }
            ]);
        } else {
            const isMatch = await bcrypt.compare(password, rows[0]['password']);
            if (!isMatch) {
                return res.status(400).json([
                    {
                        message: "パスワードが異なります"
                    }
                ]);
            } else {
                req.session.user = rows;
                res.cookie('sessionID', req.sessionID);
                res.json({
                   'session_id': req.sessionID
                });
                return res.end('Ok');
            }
        }
    } catch (err) {
        next(err);
    }
});

router.post("/logout",  async (req, res, err) => {

    const { sessionID } = req.body;
    
    try{
        if(!req.session.user){
            console.log('naidesu');
        }
        res.clearCookie('sessionID');

        await executeQuery('delete from sessions where session_id = ?', [sessionID]);

        return res.json({ok:"ok"});
    }
    catch(err){
        next(err);
    }
});

router.post("/check_sess", async (req, res, next) => {

    const { sessionID } = req.body;

    try {
        const rows = await executeQuery('select count(*) from sessions where session_id = ?', [sessionID]);
        if (rows[0]['count(*)'] >= 1){
            return res.end('login');
        }
        else{
            return res.end('logout');
        }
    }
    catch (err) {
        next(err);
    }
});
router.post("/check_auth", async (req, res, next) => {

    const { sessionID } = req.body;

    try {
        const rows = await executeQuery('select * from sessions where session_id = ?', [sessionID]);
        if(!rows[0]['data'].includes('admin')){
            res.end("Ok");
        }else{
            res.end("No");
        }
    }
    catch (err) {
        next(err);
    }
});

router.post("/user_update", body("password").isLength({ min: 8 }).not()
.isLowercase()
.not()
.isUppercase()
.not()
.isNumeric()
.not()
.isAlpha(), async (req, res, next) => {
    const user_name = req.body.user_name;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const tran = await beginTran();

    try {
        const rows = await tran.query(`select count(*) from t_login where user_name = ?`, [user_name]);
        if (rows[0]['count(*)'] < 1) {
            return res.status(400).json([
                {
                    message: "そのユーザは存在していません。"
                }
            ]);
        } else {
            try {
                let hashedPassword = await bcrypt.hash(password, 10)
                await tran.query(`update t_login set password = ? where user_name = ?`, [hashedPassword, user_name]);
                await tran.commit();
                return res.json({ok:"ok"});
            }
            catch (err) {
                await tran.rollback();
                next(err);
            }
        }
    }catch (err) {
        await tran.rollback();
        next(err);
    }
});


module.exports = router;