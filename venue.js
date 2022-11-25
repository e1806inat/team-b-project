const router = require("express").Router();
const { beginTran, executeQuery } = require("../mysql_client.js");

//const pool = mysql.createPool(config.serverConf);

router.get("/", (req, res) => {
    res.send("Hello venue");
});



//会場情報登録
router.post("/venue_register", async (req, res) => {
    const {venue_name} = req.body;

    try{
        rows = await executeQuery("select * from kaizyou where venue_name = ? LIMIT 1", [venue_name]);
        if (rows[0]['count(*)'] >= 1){
            return res.status(400).json([
                {
                    message: "すでにその試合は存在しています。"
                }
            ]);
        } else{
            try{
                await executeQuery("insert into kaizyou values (0, ?)", [venue_name]);
                res.end("OK");
            }
            catch(err){
                console.log("会場情報を登録できない");
                console.log(err);
                next(err);
            }
        }
    }
    catch(err){
        console.log(err);
        //next(err);
    }
    /*
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        //select文とlimitで同じ名前の会場がすでに登録されていないかを判定
        connection.query("select * from t_venue where venue_name = ? LIMIT 1", [venue_name], (err, rows) => {
            //connection.release();
            //console.log(rows.length);
            if(rows.length != 0){
                connection.release();
                return res.status(400).json([
                    {
                        message: "すでにその会場は登録しています。"
                    }
                ]); 
            }else{
                connection.query("insert into t_venue values (0, ?)", [venue_name], (err, rows) => {
                    connection.release();
                    if (err) {
                        return res.status(400).json([
                            {
                                message: "会場情報を登録できませんでした"
                            }
                        ]); 
                    }
                });
            }
        });
    });*/
});

//登録されている会場を呼び出し
router.post("/venue_call", async (req, res) => {
    const {venue_id} = req.body;

    try{
        const rows = await executeQuery('select * from kaizyou', [venue_id]);
        return res.json(rows);
    }
    catch(err){
        console.log("会場情報を読みだせない");
        res.end("No good");
    }

    /*pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("MYSQLと接続中です");
        //登録されている全ての会場のテーブルを読み出し
        connection.query("select * from t_venue",(err, rows) => {
            connection.release();
            if(err){
                return res.status(400).json([
                    {
                        message: "会場情報を読みだせませんでした"
                    }
                ]); 
            }else{
                return res.json(rows);
            }
        });
    });*/
});

//登録されている会場の削除
router.post("/venue_delete", async (req, res) => {

    const { venue_id } = req.body;

    try{
        await executeQuery('delete from kaizyou where venue_id = ?', [venue_id]);
        res.end('OK');
    }
    catch(err){
        //next(err);
        console.log(err);
    }

    /*try{
        const rows = await executeQuery("delete from kaizyou where venue_id = ?", [venue_id]);
        console.log(rows);
        if(rows[0]['count(*)' >= 1]){
            await executeQuery(`drop table ${table_name}`);
            res.end("OK");
        }
        else{
            console.log('そんなテーブルないです');
        }
    }
    catch(err){
        console.log("会場情報を消去できませんでした");
        console.log(err);
    }*/
});

//登録されている会場の編集
router.post("/venue_edit", async (req, res) => {
    //console.log(req.body);
    const { venue_id, venue_name } = req.body;

    try{
        await executeQuery('update kaizyou set venue_name = ? where venue_id = ?', [venue_name, venue_id]);
        res.end("OK");
    }    
    catch{
        console.log('会場テーブルを編集できません');
        console.log(err);
    }    
});


module.exports = router;
