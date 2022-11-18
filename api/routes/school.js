const router = require("express").Router();
//const mysql = require("mysql2");
//const async = require('async');
//const config = require("../mysqlConnection/config");
const { beginTran, executeQuery } = require("../mysql_client.js");

    

//const pool = mysql.createPool(config.serverConf);

//テスト用一括学校情報登録
router.post("/school_register_to_test", async (req, res, next) => {
    //const { beginTran } = require("../mysql_client.js");
    //const tran = await beginTran();
    //const { school_name } = req.body;
    
    try{
        for(var values of req.body){
            await executeQuery("insert into t_school values (0, ?)", [values.school_name]);
        }
        res.end('OK');
    } catch (err) {
        //await tran.rollback();
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

    try{
        //on duplicate key update文で組み合わせがなければ挿入あればアップデート
        for(var values of req.body){
            await executeQuery('insert into t_participants (tournament_id, school_id, seed) values (?, ?, ?) on duplicate key update tournament_id = values(tournament_id), school_id = values(school_id), seed = values(seed)', [values.tournament_id, values.school_id, values.seed]);
        }
        res.end('OK');
    }
    catch(err){
        console.log('失敗');
        next(err)
    }
});

//対象の大会の学校情報呼び出し
router.post("/school_call_p", async (req, res, next) => {
    const { tournament_id } = req.body;

    try{
        //await executeQuery("select * from t_school where school_id in (select school_id from t_participants where tournament_id = ?)", [tournament_id]);
        const rows = await executeQuery('select * from t_participants as a join t_school as b on b.school_id = a.school_id where tournament_id = ?', [tournament_id]);
        return res.json(rows);
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
