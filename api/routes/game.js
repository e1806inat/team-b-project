const router = require("express").Router();
const { rejectSeries } = require("async");
const { text } = require("express");
const { beginTran, executeQuery } = require("../mysql_client.js");

//const pool = mysql.createPool(config.serverConf);

//試合情報登録
router.post("/game_register", async (req, res, next) => {
    const { tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, match_results } = req.body;

    const tran = await beginTran();

    try{
        //すでに試合が登録されていないかを確認
        rows = await tran.query("select count(*) from t_game where tournament_id = ? and school_id_1 = ? and school_id_2 = ? and game_ymd = ?", [tournament_id, school_id_1, school_id_2, game_ymd]);
        if (rows[0]['count(*)'] >= 1){
            return res.status(400).json([
                {
                    message: "すでにその試合は存在しています。"
                }
            ]);
        } else {
            //登録されていない場合、試合を作成
            try{
                await tran.query("insert into t_game values (0, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, match_results]);
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
        //試合情報の学校ID１に学校名をjoinする
        //const rows1 = await executeQuery('select * from t_game as a join t_venue as venue using(venue_id) join t_school as b on b.school_id = a.school_id_1 where tournament_id = ? order by match_num', [tournament_id]);
        //試合情報の学校ID２に学校名をjoinする
        //const rows2 = await executeQuery('select * from t_game as a join t_school as b on b.school_id = a.school_id_2 where tournament_id = ? order by match_num', [tournament_id]);
        
        //学校ID１の学校名抱けるいているテーブルに学校ID２の学校名を追加する
        //for(var key in rows1){
          //  rows1[key].school_name_2 = rows2[key]['school_name'];
        //}

        const rows1 = await executeQuery('select * from t_game as a join t_venue as venue using(venue_id) join (select school_id as school_id_1, school_name as school_name from t_school) as b using(school_id_1)  join (select school_id as school_id_2, school_name as school_name_2 from t_school) as c using(school_id_2) where tournament_id = ? order by match_num', [tournament_id]);
        //const rows1 = await executeQuery('select * from t_game as a join t_venue as venue using(venue_id) join t_school as b on b.school_id = a.school_id_1  where tournament_id = ? order by match_num', [tournament_id]);
        //const rows1 = await executeQuery('select * from t_game as a join t_venue as venue using(venue_id) where tournament_id = ? order by match_num', [tournament_id]);

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
    const {game_id, tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, match_results} = req.body;
    try{
        //試合情報の編集
        await executeQuery('update t_game set  school_id_1 = ?, school_id_2 = ?, venue_id = ?, match_num = ?, first_rear_1 = ?, first_rear_2 = ?, game_ymd = ?, match_results = ? where  game_id = ? and tournament_id = ?', [school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, match_results, game_id, tournament_id]);
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
        //試合情報の削除
        await executeQuery('delete from t_game where game_id = ? and tournament_id = ?', [game_id, tournament_id]);
        res.end('OK');
    }
    catch(err){
        console.log('OK');
        next(err);
    }
});

//試合終了時のAPI
router.post("/game_sets", async (req, res, next) => {
    //const { table_name, school_id_1, school_id_2, results_txt } = req.body;
    const { game_id, school_id_1, school_id_2 } = req.body;

    const tran = await beginTran();

    try{

        //試合情報の編集
        //const school_1_results = await executeQuery(`select total_score, inning from ${table_name} where school_id = ? order by at_bat_id desc limit 1`, [school_id_1]);
        //const school_2_results = await executeQuery(`select total_score, inning from ${table_name} where school_id = ? order by at_bat_id desc limit 1`, [school_id_2]);
        const school_1_results = await tran.query(`select school_id, school_name, total_score, inning from t_at_bat join t_school using(school_id) where school_id = ? order by at_bat_id desc limit 1`, [school_id_1]);
        const school_2_results = await tran.query(`select school_id, school_name, total_score, inning from t_at_bat join t_school using(school_id) where school_id = ? order by at_bat_id desc limit 1`, [school_id_2]);
        //await tran.commit();
        console.log(school_1_results);
        console.log(school_2_results);
        /*
        const score_difference = Math.abs(school_1_score[0]['total_score']-school_2_score[0]['total_score']);
        var inning_arr_1 = Array.from(school_1_score[0]['inning'].toString());
        var inning_arr_2 = Array.from(school_2_score[0]['inning'].toString());
        //console.log(inning_arr_1);
        const final_inning = Math.max(Number(inning_arr_1.slice(-1)[0]), Number(inning_arr_2.slice(-1)[0]));
        
        if(final_inning < 9){
            res.end('called game');
        }
        else{
            res.end('OK');
        }
        //res.end("OK");
        
        const rows = await tran.query();*/
        /*
        if(results_text == "NULL"){
            var text = school_1_results[0]['school_name'] + ':' + school_1_results[0]['total_score'] + '点' + '-' + school_2_results[0]['school_name'] + ':' + school_2_results[0]['total_score'] + '点';   
        }
        else{
            var text =  results_text + ' ' + school_1_results[0]['school_name'] + ':' + school_1_results[0]['total_score'] + '点' + '-' + school_2_results[0]['school_name'] + ':' + school_2_results[0]['total_score'] + '点'; 
        }
        console.log(text);*/
        var text =  school_1_results[0]['total_score'] + '-' + school_2_results[0]['total_score']

        console.log(text);

        await tran.query('update t_game set match_results = ? where  game_id = ?', [text, game_id]);
        
        tran.commit();
        res.end("OK");

    }
    catch(err){
        console.log(err);
        tran.rollback();
        //await tran.rollback();
        next(err);
    }
});

module.exports = router;
