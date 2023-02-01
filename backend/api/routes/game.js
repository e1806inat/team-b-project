const router = require("express").Router();
const { rejectSeries } = require("async");
const { text } = require("express");
const { beginTran, executeQuery } = require("../mysql_client.js");

//試合情報登録（運用者用webアプリ）
router.post("/game_register", async (req, res, next) => {
    const { tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, match_results } = req.body;

    const tran = await beginTran();

    try {
        //すでに試合が登録されていないかを確認
        rows = await tran.query("select count(*) from t_game where tournament_id = ? and school_id_1 = ? and school_id_2 = ? and game_ymd = ?", [tournament_id, school_id_1, school_id_2, game_ymd]);
        // if (rows[0]['count(*)'] >= 1){
        //     return res.status(400).json([
        //         {
        //             message: "すでにその試合は存在しています。"
        //         }
        //     ]);
        // } else {
        //登録されていない場合、試合を作成
        try {
            await tran.query("insert into t_game values (0, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, match_results]);
            await tran.commit();
            res.end("OK");
        }
        catch (err) {
            console.log("試合情報を登録できない");
            console.log(err);
            await tran.rollback();
            next(err);
        }
        // }
    }
    catch (err) {
        console.log(err);
        await tran.rollback();
    }
});

//試合情報編集・削除・参照のための読み出し（運用者用webアプリ）
router.post("/game_call", async (req, res, next) => {
    const { tournament_id } = req.body;

    try {
        //試合IDに会場名、学校ID1と学校ID2の学校名、をjoinし回戦順に並び替え
        const rows = await executeQuery('select * from t_game as a join t_venue as venue using(venue_id) join (select school_id as school_id_1, school_name as school_name_1 from t_school) as b using(school_id_1)  join (select school_id as school_id_2, school_name as school_name_2 from t_school) as c using(school_id_2) where tournament_id = ? order by match_num', [tournament_id]);

        return res.json(rows);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//試合情報参照のための読み出し（顧客用webアプリ）
router.post("/a_game_call", async (req, res, next) => {
    const { game_id } = req.body;

    try {
        //試合IDに会場名、学校ID1と学校ID2の学校名、をjoinし回戦順に並び替え
        const rows = await executeQuery('select * from t_game as a join t_venue as venue using(venue_id) join (select school_id as school_id_1, school_name as school_name_1 from t_school) as b using(school_id_1) join (select school_id as school_id_2, school_name as school_name_2 from t_school) as c using(school_id_2)  join t_tournament as tournament using(tournament_id) where game_id = ?', [game_id]);

        return res.json(rows);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//試合情報の編集（運用者用webアプリ）
router.post("/game_edit", async (req, res, next) => {
    const { game_id, tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, match_results } = req.body;
    try {
        //試合情報の編集
        await executeQuery('update t_game set school_id_1 = ?, school_id_2 = ?, venue_id = ?, match_num = ?, first_rear_1 = ?, first_rear_2 = ?, game_ymd = ?, match_results = ? where  game_id = ? and tournament_id = ?', [school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, match_results, game_id, tournament_id]);
        res.end('OK');
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//試合情報の削除（運用者用webアプリ）
router.post("/game_delete", async (req, res, next) => {
    const { game_id, tournament_id } = req.body;

    try {
        //試合情報の削除
        await executeQuery('delete from t_game where game_id = ? and tournament_id = ?', [game_id, tournament_id]);
        res.end('OK');
    }
    catch (err) {
        console.log('OK');
        next(err);
    }
});

//試合終了時のAPI試合結果を試合テーブルに登録する（運用者用webアプリ）
router.post("/game_sets", async (req, res, next) => {
    const { game_id, school_id_1, school_id_2 } = req.body;

    const tran = await beginTran();

    try {

        //学校ID１の試合結果を打席情報記録テーブルからjoin
        const school_1_results = await tran.query(`select school_id, school_name, total_score, inning from t_at_bat join t_school using(school_id) where school_id = ? order by at_bat_id desc limit 1`, [school_id_1]);
        //学校ID２の試合結果を打席情報記録テーブルからjoin
        const school_2_results = await tran.query(`select school_id, school_name, total_score, inning from t_at_bat join t_school using(school_id) where school_id = ? order by at_bat_id desc limit 1`, [school_id_2]);

        console.log(school_1_results);
        console.log(school_2_results);

        //学校ID１と学校ID２の試合結果をテキスト化
        var text = school_1_results[0]['total_score'] + '-' + school_2_results[0]['total_score']

        console.log(text);

        //試合結果を試合テーブルに挿入（update）
        await tran.query('update t_game set match_results = ? where  game_id = ?', [text, game_id]);

        tran.commit();
        res.end("OK");

    }
    catch (err) {
        console.log(err);
        tran.rollback();
        //await tran.rollback();
        next(err);
    }
});

//試合中の試合の情報を登録するAPI（運用者用webアプリ）
//これを使うことで試合中かどうかの判定が可能
router.post("/during_game_register", async (req, res, next) => {
    const { game_id, tmp_table_name } = req.body;

    try {
        await executeQuery("insert into t_during_game values (?, ?)", [game_id, tmp_table_name]);
        res.end("OK");
    }
    catch (err) {
        console.log(err);
        //await tran.rollback();
        next(err);
    }
});

//試合中の試合の情報を削除するAPI（運用者用webアプリ）
router.post("/during_game_delete", async (req, res, next) => {
    const { game_id } = req.body;

    try {
        await executeQuery("delete from t_during_game where game_id = ?", [game_id]);
        res.end("OK");
    }
    catch (err) {
        console.log(err);
        //await tran.rollback();
        next(err);
    }
});

//試合中の試合の情報を参照するAPI（運用者用webアプリ）
router.post("/ref_during_game", async (req, res, next) => {

    try {
        const rows = await executeQuery("select * from t_during_game");
        return res.json(rows);
    }
    catch (err) {
        console.log(err);
        //await tran.rollback();
        next(err);
    }
});

//試合中の試合のテーブル名の参照
router.post("/ref_table_name", async (req, res, next) => {

    const{ game_id } = req.body;

    try {
        const rows = await executeQuery("select * from t_during_game where game_id = ?", [game_id]);
        return res.json(rows);
    }
    catch (err) {
        console.log(err);
        //await tran.rollback();
        next(err);
    }
});

//試合前のテーブルと試合終了後のテーブルを出力するAPI
router.post("/game_status", async (req, res, next) => {
    try {
        const endGames = await executeQuery("select * from t_game as a join t_venue as venue using(venue_id) join (select school_id as school_id_1, school_name as school_name_1 from t_school) as b using(school_id_1) join (select school_id as school_id_2, school_name as school_name_2 from t_school) as c using(school_id_2)  join t_tournament as tournament using(tournament_id) where match_results is not null order by opening desc");
        const preGames =  await executeQuery("select * from t_game as a join t_venue as venue using(venue_id) join (select school_id as school_id_1, school_name as school_name_1 from t_school) as b using(school_id_1) join (select school_id as school_id_2, school_name as school_name_2 from t_school) as c using(school_id_2)  join t_tournament as tournament using(tournament_id) where match_results is null order by opening desc");
        //const rows = await executeQuery('select * from t_game as a join t_venue as venue using(venue_id) join (select school_id as school_id_1, school_name as school_name_1 from t_school) as b using(school_id_1) join (select school_id as school_id_2, school_name as school_name_2 from t_school) as c using(school_id_2)  join t_tournament as tournament using(tournament_id) where game_id = ?', [game_id]);
        // console.log(endGames);
        // console.log(preGames)
        return res.json({
            end: endGames,
            pre: preGames
        });
    }
    catch (err) {
        console.log(err);
        //await tran.rollback();
        next(err);
    }
});

//一日に一度一時テーブルを全削除する
/*
cron.schedule('* * 0 * * *', async () => {
    //4月1日に学年を更新
    //const tran = await beginTran();
    try{
        // await tran.query('update t_player set grade = replace(grade, 3, 4) where grade = 3');
        // await tran.query('update t_player set grade = replace(grade, 2, 3) where grade = 2');
        // await tran.query('update t_player set grade = replace(grade, 1, 2) where grade = 1');
        //tran.commit();
        const rows  = await executeQuery('select * from t_during_game');
        //const tmp_table_name = `test_pbl.` + table_name;
        for(var value of rows){
            var tmp_table_name = `test_pbl.` + value.table_name;
            await executeQuery(`drop table ${tmp_table_name}`);
        }
    }
    catch(err){
        //tran.rollback();
        console.log(err);
        next(err);
    }
});*/

module.exports = router;
