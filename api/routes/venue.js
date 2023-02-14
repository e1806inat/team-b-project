const router = require("express").Router();
const config = require("../mysqlConnection/config");
const { beginTran, executeQuery } = require("../mysql_client.js");

router.get("/", (req, res) => {
    res.send("Hello venuejs");
});

router.post("/venue_register", async (req, res, next) => {
    const {venue_name} = req.body;

    try{
        rows = await executeQuery("select count(*) from t_venue where venue_name = ?", [venue_name]);
        if (rows[0]['count(*)'] >= 1){
            return res.status(400).json([
                {
                    message: "すでに同じ名前の会場が登録されています。"
                }
            ]);
        } else{
            try{
                await executeQuery("insert into t_venue values (0, ?)", [venue_name]);
                res.end("OK");
            }
            catch(err){
                next(err);
            }
        }
    }
    catch(err){
        next(err);
    }
});


router.post("/venue_call", async (req, res, next) => {
    try{
        const rows = await executeQuery('select * from t_venue');
        return res.json(rows);
    }
    catch(err){
        next(err);
    }
});

router.post("/venue_delete", async (req, res, next) => {
    const { venue_id } = req.body;

    try{
        await executeQuery('delete from t_tournament where venue_id = ?', [venue_id]);
        res.end('OK');
    }
    catch(err){
        next(err);
    }
});

router.post("/venue_edit", async (req, res, next) => {
    const { venue_id, venue_name } = req.body;

    try{
        rows = await executeQuery("select count(*) from t_venue where venue_name = ?", [venue_name]);
        if (rows[0]['count(*)'] >= 1){
            return res.status(400).json([
                {
                    message: "すでに同じ名前の会場が登録されています。"
                }
            ]);
        }
        await executeQuery('update t_venue set venue_name = ? where venue_id = ?', [venue_name, venue_id]);
        res.end("OK");
    }    
    catch{
        next(err);
    }    
});

module.exports = router;
