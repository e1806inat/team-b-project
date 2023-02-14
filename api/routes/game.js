const router = require("express").Router();
const { rejectSeries } = require("async");
const { text } = require("express");
const { beginTran, executeQuery } = require("../mysql_client.js");

router.post("/game_register", async (req, res, next) => {
    const { tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, match_results } = req.body;

    const tran = await beginTran();

    try {
        rows = await tran.query("select count(*) from t_game where tournament_id = ? and school_id_1 = ? and school_id_2 = ? and game_ymd = ?", [tournament_id, school_id_1, school_id_2, game_ymd]);
        try {
            await tran.query("insert into t_game values (0, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, match_results]);
            await tran.commit();
            res.end("OK");
        }
        catch (err) {
            await tran.rollback();
            next(err);
        }
    }
    catch (err) {
        await tran.rollback();
    }
});

router.post("/game_call", async (req, res, next) => {
    const { tournament_id } = req.body;

    try {
        const rows = await executeQuery('select * from t_game as a join t_venue as venue using(venue_id) join (select school_id as school_id_1, school_name as school_name_1 from t_school) as b using(school_id_1)  join (select school_id as school_id_2, school_name as school_name_2 from t_school) as c using(school_id_2) where tournament_id = ? order by match_num', [tournament_id]);

        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

router.post("/a_game_call", async (req, res, next) => {
    const { game_id } = req.body;

    try {
        const rows = await executeQuery('select * from t_game as a join t_venue as venue using(venue_id) join (select school_id as school_id_1, school_name as school_name_1 from t_school) as b using(school_id_1) join (select school_id as school_id_2, school_name as school_name_2 from t_school) as c using(school_id_2)  join t_tournament as tournament using(tournament_id) where game_id = ?', [game_id]);

        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

router.post("/game_edit", async (req, res, next) => {
    const { game_id, tournament_id, school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, match_results } = req.body;
    try {
        await executeQuery('update t_game set school_id_1 = ?, school_id_2 = ?, venue_id = ?, match_num = ?, first_rear_1 = ?, first_rear_2 = ?, game_ymd = ?, match_results = ? where  game_id = ? and tournament_id = ?', [school_id_1, school_id_2, venue_id, match_num, first_rear_1, first_rear_2, game_ymd, match_results, game_id, tournament_id]);
        res.end('OK');
    }
    catch (err) {
        next(err);
    }
});

router.post("/game_delete", async (req, res, next) => {
    const { game_id, tournament_id } = req.body;

    try {
        await executeQuery('delete from t_game where game_id = ? and tournament_id = ?', [game_id, tournament_id]);
        res.end('OK');
    }
    catch (err) {
        next(err);
    }
});

router.post("/game_sets", async (req, res, next) => {
    const { game_id, school_id_1, school_id_2 } = req.body;

    const tran = await beginTran();

    try {
        const table_name = await executeQuery('select * from t_during_game where game_id = ?', [game_id]);
        const tmp_table_name = `test_pbl.` + table_name[0]['tmp_table_name'];
        const school_1_results = await tran.query(`select * from ${tmp_table_name} where school_id = ? order by at_bat_id desc limit 1`, [school_id_1]);
        const school_2_results = await tran.query(`select * from ${tmp_table_name} where school_id = ? order by at_bat_id desc limit 1`, [school_id_2]);
 
        var text = school_1_results[0]['total_score'] + '-' + school_2_results[0]['total_score']

        await tran.query('update t_game set match_results = ? where  game_id = ?', [text, game_id]);

        tran.commit();
        res.end("OK");

    }
    catch (err) {
        tran.rollback();
        next(err);
    }
});

router.post("/during_game_register", async (req, res, next) => {
    const { game_id, tmp_table_name } = req.body;

    try {
        await executeQuery("insert into t_during_game values (?, ?)", [game_id, tmp_table_name]);
        res.end("OK");
    }
    catch (err) {
        next(err);
    }
});


router.post("/during_game_delete", async (req, res, next) => {
    const { game_id } = req.body;

    try {
        await executeQuery("delete from t_during_game where game_id = ?", [game_id]);
        res.end("OK");
    }
    catch (err) {
        next(err);
    }
});

router.post("/ref_during_game", async (req, res, next) => {

    try {
        const rows = await executeQuery("select * from t_during_game");
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

router.post("/ref_table_name", async (req, res, next) => {

    const{ game_id } = req.body;

    try {
        const rows = await executeQuery("select * from t_during_game where game_id = ?", [game_id]);
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

router.post("/game_status", async (req, res, next) => {
    try {
        const endGames = await executeQuery("select * from t_game as a join t_venue as venue using(venue_id) join (select school_id as school_id_1, school_name as school_name_1 from t_school) as b using(school_id_1) join (select school_id as school_id_2, school_name as school_name_2 from t_school) as c using(school_id_2)  join t_tournament as tournament using(tournament_id) where match_results is not null order by opening desc");
        const preGames =  await executeQuery("select * from t_game as a join t_venue as venue using(venue_id) join (select school_id as school_id_1, school_name as school_name_1 from t_school) as b using(school_id_1) join (select school_id as school_id_2, school_name as school_name_2 from t_school) as c using(school_id_2)  join t_tournament as tournament using(tournament_id) where match_results is null order by opening desc");
        return res.json({
            end: endGames,
            pre: preGames
        });
    }
    catch (err) {
        next(err);
    }
});

// cron.schedule('* * 0 * * *', async () => {
//     try{
//         const rows  = await executeQuery('select * from t_during_game');
//         for(var value of rows){
//             var tmp_table_name = `test_pbl.` + value.table_name;
//             await executeQuery(`drop table ${tmp_table_name}`);
//         }
//     }
//     catch(err){
//         console.log(err);
//         next(err);
//     }
// });

module.exports = router;
