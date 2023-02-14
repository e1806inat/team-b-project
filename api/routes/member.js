const router = require("express").Router();
const { beginTran, executeQuery } = require("../mysql_client.js");
const cron = require("node-cron");

router.post("/member_register", async (req, res, next) => {
    try {
        for (const value of req.body) {
            await executeQuery('insert into t_player values (0, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [value.school_id, value.player_name_kanji, value.player_name_hira, value.grade, value.handed_hit, value.handed_throw, value.hit_num, value.bat_num, value.BA]);
        }
        res.end("OK");
    } catch (err) {
        next(err);
    }
});

router.post("/tournament_member_register", async (req, res, next) => {
    try {
        for (const value of req.body) {
            await executeQuery('insert into t_registered_player (player_id, tournament_id, school_id, uniform_number, grade, handed_hit, handed_throw, hit_num, bat_num, BA) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on duplicate key update grade = values(grade), handed_hit = values(handed_hit), handed_throw = values(handed_throw), BA = values(BA)', [value.player_id, value.tournament_id, value.school_id, value.uniform_number, value.grade, value.handed_hit, value.handed_throw, value.hit_num, value.bat_num, value.BA]);
        }
        res.end("OK");
    } catch (err) {
        next(err);
    }
});

router.post("/tournament_member_delete_batch", async (req, res, next) => {
    const { tournament_id, school_id } = req.body;
    try {
        await executeQuery('delete from t_registered_player where tournament_id = ? and school_id = ?', [tournament_id, school_id]);
        res.end("OK");
    } catch (err) {
        next(err);
    }
});

router.post("/pre_tournament_member_call", async (req, res, next) => {
    const { tournament_id, school_id } = req.body;
    try {
        const rows = executeQuery('select player_id from t_registered_player where tournament_id = ? and school_id = ?', [tournament_id, school_id]);
        return res.json(rows);
    } catch (err) {
        next(err);
    }
});

router.post("/starting_member_register", async (req, res, next) => {
    try {
        for (const value of req.body) {
            await executeQuery('insert into t_starting_player (player_id, game_id, school_id, position, uniform_number, grade, handed_hit, handed_throw, batting_order, BA) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on duplicate key update position = values(position), uniform_number = values(uniform_number), grade = values(grade), handed_hit = values(handed_hit), handed_throw = values(handed_throw), batting_order = values(batting_order), BA = values(BA)', [value.player_id, value.game_id, value.school_id, value.position, value.uniform_number, value.grade, value.handed_hit, value.handed_throw, value.batting_order, value.BA]);
        }
        res.end("OK");
    }
    catch (err) {
        next(err);
    }
});

router.post("/starting_member_delete_batch", async (req, res, next) => {
    const {game_id, school_id} = req.body;
    try {
        await executeQuery('delete from t_starting_player where game_id = ? and school_id = ?', [game_id, school_id]);
        res.end("OK");
    }
    catch (err) {
        next(err);
    }
});

router.post("/member_call", async (req, res, next) => {
    const { school_id } = req.body;

    try {
        const rows = await executeQuery('select * from t_player where grade <= 3 and school_id = ? and player_name_kanji is not null', [school_id]);
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

router.post("/ref_member_call", async (req, res, next) => {
    const { school_id, grades, option } = req.body;

    try {
        var rows = await executeQuery(`select * from t_player where grade in (?) and school_id = ? and player_name_kanji is not null order by player_name_hira`, [grades, school_id]);
        if (option=="grade"){
            var rows = await executeQuery(`select * from t_player where grade in (?) and school_id = ? and player_name_kanji is not null order by grade`, [grades, school_id]);
        } 
        else if (option=="player_name_hira"){
            var rows = await executeQuery(`select * from t_player where grade in (?) and school_id = ? and player_name_kanji is not null order by player_name_hira`, [grades, school_id]);
        }
        else if (option=="BA"){
            var rows = await executeQuery(`select * from t_player where grade in (?) and school_id = ? and player_name_kanji is not null order by BA desc`, [grades, school_id]);
        }
        else if (option=="hit_num"){
            var rows = await executeQuery(`select * from t_player where grade in (?) and school_id = ? and player_name_kanji is not null order by hit_num desc`, [grades, school_id]);
        }
        else if (option=="bat_num"){
            var rows = await executeQuery(`select * from t_player where grade in (?) and school_id = ? and player_name_kanji is not null order by bat_num desc`, [grades, school_id]);
        }
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

router.post("/ref_tournament_member_call", async (req, res, next) => {
    const { tournament_id, school_id, option} = req.body;

    try {
        var rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ? and player_name_kanji is not null order by player_name_hira', [school_id, tournament_id, option]);
        if (option=="grade"){
            var rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ? and player_name_kanji is not null order by grade', [school_id, tournament_id, option]);
        } 
        else if (option=="player_name_hira"){
            var rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ? and player_name_kanji is not null order by player_name_hira', [school_id, tournament_id, option]);
        }
        else if (option=="BA"){
            var rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ? and player_name_kanji is not null order by  BA desc', [school_id, tournament_id, option]);
        }
        else if (option=="hit_num"){
            var rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ? and player_name_kanji is not null order by hit_num desc', [school_id, tournament_id, option]);
        }
        else if (option=="bat_num"){
            var rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ? and player_name_kanji is not null order by bat_num desc', [school_id, tournament_id, option]);
        }
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

router.post("/tournament_member_call", async (req, res, next) => {
    const { tournament_id, school_id } = req.body;

    try {
        const rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ?', [school_id, tournament_id]);
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

router.post("/starting_member_call", async (req, res, next) => {
    const { game_id, school_id } = req.body;

    try {
        const rows = await executeQuery('select * from t_starting_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id)  where game_id = ? order by batting_order', [school_id, game_id]);
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

router.post("/member_edit", async (req, res, next) => {
    const { player_id, school_id, player_name_kanji, player_name_hira, grade, handed_hit, handed_throw, BA } = req.body;

    try {
        await executeQuery('update t_player set player_name_kanji = ?, player_name_hira = ?, grade = ?, handed_hit = ?, handed_throw = ?, BA = ? where player_id = ? and school_id = ?', [player_name_kanji, player_name_hira, grade, handed_hit, handed_throw, BA, player_id, school_id]);
        res.end('OK');
    }
    catch (err) {
        next(err);
    }
});

router.post("/tournament_member_edit", async (req, res, next) => {
    const { player_id, tournament_id, uniform_number, grade, handed_hit, handed_throw, BA } = req.body;

    try {
        await executeQuery('update t_registered_player set uniform_number = ?, grade = ?, handed_hit = ?, handed_throw = ?, BA = ? where player_id = ? and tournament_id = ?', [uniform_number, grade, handed_hit, handed_throw, BA, player_id, tournament_id]);
        res.end('OK');
    }
    catch (err) {
        next(err);
    }
});

router.post("/starting_member_edit", async (req, res, next) => {
    const { player_id, game_id, position, uniform_number, grade, handed_hit, handed_throw, batting_order, BA } = req.body;

    try {
        await executeQuery('update t_starting_player set position = ?,uniform_number = ?, grade = ?, handed_hit = ?, handed_throw = ?, batting_order = ?, BA = ? where player_id = ? and game_id = ?', [position, uniform_number, grade, handed_hit, handed_throw, batting_order, BA, player_id, game_id]);
        res.end('OK');
    }
    catch (err) {
        next(err);
    }
});

router.post("/tournament_member_delete", async (req, res, next) => {
    const { tournament_id, player_id } = req.body;
    try {  
        await executeQuery('delete from t_registered_player where tournament_id = ? and player_id = ?', [tournament_id, player_id]);   
        res.end("OK");
    } catch (err) {
        next(err);
    }
});

router.post("/starting_member_delete", async (req, res, next) => {
    const { game_id, player_id } = req.body;
    try {
        await executeQuery('delete from t_starting_player where game_id = ? and player_id = ?', [game_id, player_id]);   
        res.end("OK");
    } catch (err) {
        next(err);
    }
});

router.post("/cal_BA", async (req, res, next) => {
    const { game_id, table_name } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;
    
    count_hit = {};
    count_bat = {};
    const tran = await beginTran();

    try {
        rows = await tran.query(`select player_id, hit, foreball, deadball from ${tmp_table_name} where player_id is not null and text_inf <> '%盗塁%' and pass <> 1`);

        for await (var values of rows) {
            var key = values['player_id']
            if (values['hit'] == 1) {
                count_hit[key] = (count_hit[key] || 0) + 1;
            } else {
                count_hit[key] = (count_hit[key] || 0);
            }
            if (values['foreball']!=1 && values['deadball']!=1){
                count_bat[key] = (count_bat[key] || 0) + 1;
            } else {
                count_bat[key] = (count_bat[key] || 0);
            }
        }
        for (var key in count_bat) {
            rows = await tran.query('select hit_num, bat_num from t_player where player_id = ?', [key]);
            var tmp_hit = await rows[0]['hit_num'] + count_hit[key];
            var tmp_bat = await rows[0]['bat_num'] + count_bat[key];
            var BA = await Number((tmp_hit / tmp_bat).toFixed(3));
            await tran.query('update t_player set hit_num = ?, bat_num = ?, BA = ? where player_id = ?', [tmp_hit, tmp_bat, BA, key]);
        }
        tran.commit();
        res.end('OK');
    }
    catch (err) {
        tran.rollback();
        next(err);
    }
});

router.post("/tournament_member_BA_update", async (req, res, next) => {
    const { player_id, tournament_id, BA } = req.body;

    try {
        await executeQuery('update t_registered_player set BA = ? where player_id = ? and tournament_id = ?', [BA, player_id, tournament_id]);
        res.end('OK');
    }
    catch (err) {
        next(err);
    }
});

router.post("/check_member", async (req, res, next) => {
    const { school_id, player_name_kanji, grade } = req.body;

    try {
        const rows = await executeQuery('select count(*) from t_player where school_id = ? and grade = ? and player_name_kanji = ?', [school_id, grade, player_name_kanji]);
        if (rows[0]['count(*)']>=1){
            res.end('すでに登録されています');
        } else {
            res.end('登録されていません');
        }
    }
    catch (err) {
        next(err);
    }
});

cron.schedule('* * * 1 4 *',async () => {
    const tran = await beginTran();
    try{
        await tran.query('update t_player set grade = replace(grade, 3, 4) where grade = 3');
        await tran.query('update t_player set grade = replace(grade, 2, 3) where grade = 2');
        await tran.query('update t_player set grade = replace(grade, 1, 2) where grade = 1');
        tran.commit();
    }
    catch(err){
        tran.rollback();
        next(err);
    }
});

module.exports = router;