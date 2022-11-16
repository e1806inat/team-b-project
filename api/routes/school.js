const router = require("express").Router();
//const mysql = require("mysql2");
//const async = require('async');
//const config = require("../mysqlConnection/config");
const { beginTran, executeQuery } = require("../mysql_client.js");

    

//const pool = mysql.createPool(config.serverConf);

/*
//学校情報登録
router.post("/school_register", async (req, res, next) => {
    const { beginTran } = require("../mysql_client.js");
    const tran = await beginTran();
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
});*/


//学校情報登録
router.post("/school_register", async (req, res, next) => {
    const { beginTran } = require("../mysql_client.js");
    const tran = await beginTran();
    const { school_name } = req.body;
    
    try{
        rows = await tran.query("select * from t_school2 where school_name = ? LIMIT 1", [school_name]);
        //await tran.commit();
        //res.end("Ok");
        if (rows.length != 0){
            return res.status(400).json([
                {
                    message: "すでにその学校は存在しています。"
                }
            ]);
        } else {
            console.log("bakamorimori");
            await tran.query("insert into t_school2 values (0, ?)", [school_name]);
            await tran.commit();
            console.log("bakasyouta");
            res.end("Ok");
        }
    } catch (err) {
        await tran.rollback();
        next(err);
    }
    /*
    console.log(rows);
    console.log("bakamoriguchi");
    if (rows.length != 0){
        return res.status(400).json([
            {
                message: "すでにその学校は存在しています。"
            }
        ]);
    } else {
        try{
            console.log("bakamorimori");
            await tran.query("insert into t_school2 values (0, ?)", [school_name]);
            await tran.commit();
            console.log("bakasyouta");
            res.end("Ok");
        } catch (err) {
            next(err);
        }
    }*/
});

//学校情報編集
router.post("/school_edit", async (req, res, next) => {
    //const tran = await beginTran();
    const { school_id, school_name } = req.body;
    try{
        await executeQuery('update t_school2 set school_name = ? where school_id = ?', [school_name, school_id]);
        //console.log(err);
        res.end("OK");
    } catch (err) {
        next(err);
    }
    /*
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
    });*/
});


//大会ごとの参加校を登録
router.post("/participants_register", async (req, res, next) => {
    const { tournament_id, school_id } = req.body;
    console.log(req.body);

    try{
        await executeQuery('insert into t_participants values (?, ?)', [tournament_id, school_id]);
        res.end('OK');
    }
    catch(err){
        console.log('失敗');
        next(err)
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        
        /*
        req.body.forEach(function (value) {
            //次はデータ取得から
            connection.query('insert into t_participants values (?, ?)', [tournament_id, school_id], (err, rows) => {
                //connection.release();
                //console.log(err);
                if (err) {
                    console.log('読み取り失敗');
                }
            });
        });
        connection.query('insert into t_participants values (?, ?)', [tournament_id, school_id], (err, rows) => {
            connection.release();
            console.log(err);
            if (err) {
                console.log('読み取り失敗');
            }
        });
    //connection.release();
    });*/
});

//対象の大会の学校情報呼び出し
router.post("/school_call_p", async (req, res, next) => {
    const { tournament_id } = req.body;

    try{
        await executeQuery("select * from t_school where school_id in (select school_id from t_participants where tournament_id = ?)", [tournament_id]);
        res.end('OK');
    }
    catch(err){
        console.log('sippai');
        next(err);
    }
    /*
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
    });*/
});

//学校情報呼び出し
router.post("/school_call", async (req, res, next) => {
    //const { tournament_id } = req.body;

    try{
        rows = await executeQuery("select * from t_school");
        return res.json(rows);
    }
    catch(err){
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");

        //大会名と開会日から求めた大会IDから大会参加校のデータを取得
        connection.query("select * from t_school", (err, rows) => {
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
    });*/
});

//参加学校情報を消すことができる
router.post("/participants_delete", async (req, res, next) => {
    const { tournament_id, school_id } = req.body;

    try{
        await executeQuery('delete from t_participants where tournament_id = ? and school_id = ?', [tournament_id, school_id]);
        res.end('OK');
    }
    catch(err){
        next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log(req.body)
        console.log("MYSQLと接続中です");

        connection.query('delete from t_participants where tournament_id = ? and school_id = ?', [tournament_id, school_id], (err, rows) => {
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
    });*/
});

module.exports = router;
