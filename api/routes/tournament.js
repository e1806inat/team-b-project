const router = require("express").Router();
const { beginTran, executeQuery } = require("../mysql_client.js");

router.post("/tournament_register", async(req, res, next) => {
    const { tournament_name, opening} = req.body;
    try{
        const rows = await executeQuery('select count(*) from t_tournament where tournament_name = ? and opening = ?',[tournament_name, opening]);
        if (rows[0]['count(*)']>=1){
            return res.status(400).json([
                {
                    message: "すでにその大会は存在しています。"
                }
            ]); 
        } else {
            await executeQuery('insert into t_tournament values (0, ?, ?)', [tournament_name, opening]);
            res.end('OK');
        }
    }
    catch(err){
        next(err);
    }
});

router.post("/tournament_call", async (req, res, next) => {
    try{
        const rows = await executeQuery('select * from t_tournament where tournament_name is not null order by opening desc');
        return res.json(rows);
    }
    catch(err){
        next(err);
    }
});

router.post("/tournament_edit", async (req, res, next) => {
    const { tournament_id, tournament_name, opening} = req.body;
    try{
        await executeQuery('update t_tournament set tournament_name = ?, opening = ? where tournament_id = ?', [tournament_name, opening, tournament_id]);
        res.end('OK');
    }
    catch(err){
        next(err);
    }
});

router.post("/tournament_delete", async (req, res, next) => {
    const { tournament_id} = req.body;
    try{
        await executeQuery('delete from t_tournament where tournament_id = ?', [tournament_id]);
        res.end('OK');
    }
    catch(err){
        next(err);
    }
});

router.post("/tournament_table_register", async (req, res, next) => {
    const { tournament_id } = req.body;

    try{
        await executeQuery('insert into t_tournament_table values ("0", ?)', [tournament_id]);
        res.end("OK");
    }
    catch(err){
        next(err);
    }
});

router.post("/tournament_table_call", async (req, res, next) => {
    try{
        const rows = await executeQuery('select * from t_tournament_table join t_tournament using(tournament_id)');
        return res.json(rows);
    }
    catch(err){
        next(err);
    }
});

router.post("/tournament_table_inf_call", async (req, res, next) => {
    const { tournament_id } = req.body;
    try{
        const rows = await executeQuery('select * from t_participants as parti join (select * from t_tournament where tournament_id = ?)  as tour using(tournament_id) join t_school as school using(school_id) order by school_order',[tournament_id]);
        return res.json(rows);
    }
    catch(err){
        next(err);
    }
});

module.exports = router;