const router = require("express").Router();
const { beginTran, executeQuery } = require("../mysql_client.js");

router.get("/", (req, res) => {
    res.send("Hello daseki");
});

router.post("/daseki_register_for_test", async (req, res, next) => {
    const tmp_table_name = `test_pbl.` + `test125`;

    try {
        for (var values of req.body) {
            await executeQuery(`insert into ${tmp_table_name} values ("0", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [values.inning, values.game_id, values.school_id, values.player_id, values.pitcher_id, values.score, values.total_score, values.outcount, values.base, values.text_inf, values.pass, values.touched_coordinate, values.ball_kind, values.hit, values.foreball, values.deadball, values.pinch, values.batting_order]);
        }
        res.end("OK");
    }
    catch (err) {
        next(err);
    }
});

router.post("/daseki_register", async (req, res, next) => {
    const { table_name, inning, game_id, school_id, player_id, pitcher_id, score, total_score, batting_order, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;

    try {
        await executeQuery(`insert into ${tmp_table_name} values ("0", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [inning, game_id, school_id, player_id, pitcher_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch, batting_order]);
        res.end("OK");
    }
    catch (err) {
        next(err);
    }
});

router.post("/tmp_table_create", async (req, res, next) => {
    const table_name = `test_pbl.` + req.body['table_name']

    try {
        await executeQuery(`create table ${table_name} (at_bat_id int not null auto_increment, inning int, game_id int not null,  school_id int not null, player_id int not null, pitcher_id int not null, score int, total_score int, outcount int, base char(3), text_inf varchar(300), pass bool, touched_coordinate varchar(100), ball_kind varchar(10), hit bool, foreball bool, deadball bool, pinch varchar(300), batting_order int, primary key(at_bat_id, game_id), foreign key(school_id) references t_school(school_id),
        foreign key(player_id) references t_player(player_id))`);
        res.end('OK');
    }
    catch (err) {
        next(err);
    }
});

router.post("/tmp_table_delete", async (req, res, next) => {

    const { table_name, game_id } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;

    const tran = await beginTran();

    try {
        await tran.query(`insert into t_at_bat select * from ${tmp_table_name}`);
        const count_of_bat = await tran.query('select count(*) from t_at_bat where game_id = ?', [game_id]);
        const count_of_tmp = await tran.query(`select count(*) from ${tmp_table_name}`);

        if (count_of_bat[0]['count(*)'] >= 1 && count_of_bat[0]['count(*)'] == count_of_tmp[0]['count(*)']) {
            await tran.query(`drop table ${tmp_table_name}`);
            await tran.query("delete from t_during_game where game_id = ?", [game_id]);
            await tran.commit();
            res.end("OK");
        }
        else {
            await tran.rollback();
            res.end("sippai");
        }
    }
    catch (err) {
        await tran.rollback();
        next(err);
    }
});

router.post("/data_register", async (req, res, next) => {
    const { table_name, game_id } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;

    const tran = await beginTran();

    try {
        await tran.query(`insert into t_at_bat select * from ${tmp_table_name}`);
        const count_of_bat = await tran.query('select count(*) from t_at_bat where game_id = ?', [game_id]);
        const count_of_tmp = await tran.query(`select count(*) from ${tmp_table_name}`);
        if (count_of_bat[0]['count(*)'] >= 1 && count_of_bat[0]['count(*)'] == count_of_tmp[0]['count(*)']) {
            await tran.commit();
            res.end("OK");
        }
        else {
            await tran.rollback();
            next(err);
        }
        res.end("OK");
    }
    catch (err) {
        await tran.rollback();
        next(err);
    }
});

router.post("/tmp_daseki_transmission", async (req, res, next) => {
    const { table_name, at_bat_id, inning, game_id } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;

    try {
        const rows = await executeQuery(`select * from ${tmp_table_name} as bat join (select * from t_starting_player where game_id = ?) as s_player using(player_id) join t_school as school on s_player.school_id = school.school_id where at_bat_id = ? and inning = ?`, [game_id, at_bat_id, inning]);
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

router.post("/tmp_daseki_call", async (req, res, next) => {
    const { table_name, game_id } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;

    try {
        const rows1 = await executeQuery('select * from t_game where game_id = ?', [game_id]);
       
        const rows2 = await executeQuery(`select * from ((select * from ${tmp_table_name}) as a left join (select player_id, grade, uniform_number, handed_hit from t_registered_player where tournament_id = ?) as b using(player_id) left join (select * from t_player where school_id = ? or school_id = ?) as c using(player_id)) order by at_bat_id`, [rows1[0]['tournament_id'], rows1[0]['school_id_1'], rows1[0]['school_id_2']]);
      
        return res.json(rows2);
    }
    catch (err) {
        next(err);
    }
});

router.post("/tmp_table_check", async (req, res, next) => {
    const table_name = req.body['table_name'];

    try {
        const rows = await executeQuery(`show tables like '${table_name}'`);
        if (rows == 0 && rows == false) {
            res.end("not exist");
        } else {
            res.end("exist");
        }
    }
    catch (err) {
        next(err);
    }
});

router.post("/daseki_transmission", async (req, res, next) => {
    const { game_id } = req.body;


    try {
        const rows1 = await executeQuery('select * from t_game where game_id = ?', [game_id]);
        const rows2 = await executeQuery('select * from ((select * from t_at_bat where game_id = ?) as a left join (select player_id, grade, uniform_number, handed_hit from t_registered_player where tournament_id = ?) as b using(player_id) left join (select * from t_player where school_id = ? or school_id = ?) as c using(player_id)) order by at_bat_id', [game_id, rows1[0]['tournament_id'], rows1[0]['school_id_1'], rows1[0]['school_id_2']]);

        return res.json(rows2);
    }
    catch (err) {
        next(err);
    }
});


router.post("/player_data_change", async (req, res, next) => {

    const { player_id, game_id, position, batting_order } = req.body;

    const tran = await beginTran();

    try {
        await tran.query('update t_starting_player set position = ?, batting_order = ? where player_id = ? and game_id = ?', [position, batting_order, player_id, game_id]);
        await tran.commit();
        res.end("OK");
    }
    catch (err) {
        await tran.rollback();
        next(err);
    }
});

router.post("/tmp_daseki_update", async (req, res, next) => {
    const { table_name, at_bat_id, game_id, school_id, player_id, pitcher_id, score, total_score, batting_order, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;

    try {
        await executeQuery(`update ${tmp_table_name} set school_id = ?, player_id = ?, pitcher_id = ?, score = ?, total_score = ?, batting_order = ?, outcount = ?, base = ?, text_inf = ?, pass = ?, touched_coordinate = ?, ball_kind = ?, hit = ?, foreball = ?, deadball = ?, pinch = ? where at_bat_id = ? and game_id = ?`, [school_id, player_id, pitcher_id, score, total_score, batting_order, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch, at_bat_id, game_id]);
        res.end("OK");
    }
    catch (err) {
        next(err);
    }
});

router.post("/registered_daseki_update", async (req, res, next) => {
    const { at_bat_id, game_id, player_id, pitcher_id, score, total_score, batting_order, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch } = req.body;

    try {
        await executeQuery(`update t_at_bat set player_id = ?, pitcher_id = ?, score = ?, total_score = ?, batting_order = ?, outcount = ?, base = ?, text_inf = ?, pass = ?, touched_coordinate = ?, ball_kind = ?, hit = ?, foreball = ?, deadball = ?, pinch = ? where at_bat_id = ? and game_id = ?`, [player_id, pitcher_id, score, total_score, batting_order, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch, at_bat_id, game_id]);
        res.end("OK");
    }
    catch (err) {
        next(err);
    }
});

router.post("/tmp_daseki_state", async (req, res, next) => {
    const { tournament_id } = req.body;

    try {
        var gameStateArray = [];
        const game_ids = await executeQuery('select game_id from t_game where tournament_id = ?  and school_id_1 is not null and school_id_2 is not null', [tournament_id]);
   
        for (var game of game_ids) {
            let gameIdArray = [{}, {}]
            let Inning = {};
            let score = { 'start': true }
            let table_name = await executeQuery('select * from t_during_game where game_id = ?', [game['game_id']]);
            let gameInfo = await executeQuery('select * from t_game where game_id = ?', [game['game_id']]);

            if (table_name != 0 && table_name != false) {
                let tmp_table_name = `test_pbl.` + table_name[0]['tmp_table_name'];
                let school_id_1 = gameInfo[0]['school_id_1'];
                let school_id_2 = gameInfo[0]['school_id_2'];
                let rows = await executeQuery(`select inning from ${tmp_table_name} order by at_bat_id desc limit 1`);
                let score1 = await executeQuery(`select total_score from ${tmp_table_name} where school_id = ? order by at_bat_id desc limit 1`, [school_id_1]);
                let score2 = await executeQuery(`select total_score from ${tmp_table_name} where school_id = ? order by at_bat_id desc limit 1`, [school_id_2]);
                let during = await executeQuery(`select count(*) from ${tmp_table_name}`);
                if (rows == 0 && rows == false) {
                    var inning = '１回表'
                    Inning[game['game_id'].toString()] = inning;
                } else {
                    if (rows[0]['inning'] % 10 === 1) {
                        var inning = Math.floor(rows[0]['inning'] / 10).toString() + '回表';
                    } else {
                        var inning = Math.floor(rows[0]['inning'] / 10).toString() + '回裏';
                    }
                    Inning[game['game_id'].toString()] = inning;
                }
                if (score1 == 0 && score1 == false) {
                    score['score1'] = 0;
                } else {
                    score['score1'] = score1[0]['total_score'];
                }

                if (score2 == 0 && score2 == false) {
                    score['score2'] = 0
                    score2 = 0;
                } else {
                    score['score2'] = score2[0]['total_score'];
                }

                if (during[0]['count(*)'] == 0) {
                    score['start'] = false;
                }
                gameIdArray[0] = Inning;
                gameIdArray[1] = score;
                gameStateArray.push(gameIdArray);
            }
        }
        return res.json(gameStateArray);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;