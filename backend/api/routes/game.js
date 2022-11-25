const router = require("express").Router();
const { beginTran, executeQuery } = require("../mysql_client.js");

//const pool = mysql.createPool(config.serverConf);

//試合情報登録
router.post("/game_register", async (req, res, next) => {
    const { tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd } = req.body;

    const tran = await beginTran();

    try{
        rows = await tran.query("select count(*) from t_game where tournament_id = ? and school_id_1 = ? and school_id_2 = ? and game_ymd = ?", [tournament_id, school_id_1, school_id_2, game_ymd]);
        if (rows[0]['count(*)'] >= 1){
            return res.status(400).json([
                {
                    message: "すでにその試合は存在しています。"
                }
            ]);
        } else {
            //登録されていない場合、試合テーブルを作成
            try{
                await tran.query("insert into t_game values (0, ?, ?, ?, ?, ?, ?, ?, ?)", [tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd]);
                await tran.commit();
                res.end("OK");
            }
            catch(err){
                console.log("試合情報を登録できない");
                console.log(err);
                await tran.rollback();
                next(err);
            }
        }
    }
    catch(err){
        console.log(err);
        await tran.rollback();
    }
});

//試合情報編集・削除・参照のための読み出し
router.post("/game_call", async (req, res, next) => {
    const {tournament_id} = req.body;

    try{
        const rows1 = await executeQuery('select * from t_game as a join t_school as b on b.school_id = a.school_id_1 where tournament_id = ? order by match_num', [tournament_id]);
        const rows2 = await executeQuery('select * from t_game as a join t_school as b on b.school_id = a.school_id_2 where tournament_id = ? order by match_num', [tournament_id]);
        
        for(var key in rows1){
            rows1[key].school_name_2 = rows2[key]['school_name'];
        }

        return res.json(rows1);
        //res.end('OK');
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

//試合情報の編集
router.post("/game_edit", async(req, res, next) => {
    const {game_id, tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd} = req.body;
    try{
        await executeQuery('update t_game set  school_id_1 = ?, school_id_2 = ?, venue_id = ?, match_num = ?, first_rear_1 = ?, first_rear_2 = ?, game_ymd = ? where  game_id = ? and tournament_id = ?', [school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, game_id, tournament_id]);
        res.end('OK');
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

//試合情報の削除
router.post("/game_delete", async (req, res, next) => {
    const {game_id, tournament_id} = req.body;
    
    try{
        await executeQuery('delete from t_game where game_id = ? and tournament_id = ?', [game_id, tournament_id]);
        res.end('OK');
    }
    catch(err){
        console.log('OK');
        next(err);
    }
});

module.exports = router;
