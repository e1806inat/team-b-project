const router = require("express").Router();
const { beginTran, executeQuery } = require("../mysql_client.js");

//const pool = mysql.createPool(config.serverConf);

//大会情報登録（運用者用webアプリ）
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
        console.log(err);
        next(err);
    }
});

//登録されている大会のテーブルを最新のものかつnotnullな１０件呼び出してクライアント側に渡す（運用者用webアプリ）
router.post("/tournament_call", async (req, res, next) => {
    try{
        const rows = await executeQuery('select * from t_tournament order by opening desc');
        return res.json(rows);
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

//大会テーブルの編集（運用者用webアプリ）
router.post("/tournament_edit", async (req, res, next) => {
    const { tournament_id, tournament_name, opening} = req.body;
    try{
        await executeQuery('update t_tournament set tournament_name = ?, opening = ? where tournament_id = ?', [tournament_name, opening, tournament_id]);
        res.end('OK');
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

//大会テーブルの削除（運用者用webアプリ）
router.post("/tournament_delete", async (req, res, next) => {
    const { tournament_id} = req.body;
    try{
        await executeQuery('delete from t_tournament where tournament_id = ?', [tournament_id]);
        res.end('OK');
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

//トーナメント表作成した場合の登録（運用者用webアプリ）
router.post("/tournament_table_register", async (req, res, next) => {
    const { tournament_id } = req.body;

    try{
        await executeQuery('insert into t_tournament_table values ("0", ?)', [tournament_id]);
        res.end("OK");
    }
    catch(err){
        console.log('sippai');
        console.log(err);
        next(err);
    }
});

//トーナメント表一覧呼び出し
router.post("/tournament_table_call", async (req, res, next) => {
    try{
        //const rows = await executeQuery('select * from t_participants as a join t_school as b using(school_id) where tournament_id = ?', [tournament_id]);
        const rows = await executeQuery('select * from t_tournament_table join t_tournament using(tournament_id)');
        return res.json(rows);
    }
    catch(err){
        console.log('sippai');
        console.log(err);
        next(err);
    }
});

//トーナメント表情報呼び出し
router.post("/tournament_table_inf_call", async (req, res, next) => {
    const { tournament_id } = req.body;
    try{
        //トーナメント表情報
        const rows = await executeQuery('select * from t_participants as parti join (select * from t_tournament where tournament_id = ?)  as tour using(tournament_id) join t_school as school using(school_id) order by school_order',[tournament_id]);
        return res.json(rows);
    }
    catch(err){
        console.log('sippai');
        console.log(err);
        next(err);
    }
});

module.exports = router;