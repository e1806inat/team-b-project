//一打席速報入力画面のAPIたち
const router = require("express").Router();
const { beginTran, executeQuery } = require("../mysql_client.js");
/*
const pool = mysql.createPool({
    host: "133.71.101.108",
    user: "test_user",
    password: "v2V!%Nwc",
    database: "test_pbl",
});*/

router.get("/", (req, res) => {
    res.send("Hello daseki");
});

//テスト用
router.post("/daseki_register_for_test", async (req, res, next) => {
    //const { table_name, inning, game_id, school_id, player_id, pitcher_id, score, total_score, batting_order, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch } = req.body;
    const tmp_table_name = `test_pbl.` + `test125`;

    try {
        //打席情報登録
        for (var values of req.body) {
            await executeQuery(`insert into ${tmp_table_name} values ("0", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [values.inning, values.game_id, values.school_id, values.player_id, values.pitcher_id, values.score, values.total_score, values.outcount, values.base, values.text_inf, values.pass, values.touched_coordinate, values.ball_kind, values.hit, values.foreball, values.deadball, values.pinch, values.batting_order]);
        }
        //await executeQuery(`insert into ${tmp_table_name} values ("0", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [inning, game_id, school_id, player_id, pitcher_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch,  batting_order]);
        res.end("OK");
    }
    catch (err) {
        //next(err);
        console.log(err);
        next(err);
    }
});

//一時打席情報登録用のテーブルに打席情報登録（UPSERTを使うかも）（運用者用webアプリ）
router.post("/daseki_register", async (req, res, next) => {
    const { table_name, inning, game_id, school_id, player_id, pitcher_id, score, total_score, batting_order, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;

    try {
        //打席情報登録
        await executeQuery(`insert into ${tmp_table_name} values ("0", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [inning, game_id, school_id, player_id, pitcher_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch, batting_order]);
        res.end("OK");
    }
    catch (err) {
        //next(err);
        console.log(err);
        next(err);
    }
});

//一時打席情報登録用のテーブル作成（運用者用webアプリ）
router.post("/tmp_table_create", async (req, res, next) => {
    //create table のための名前作成
    const table_name = `test_pbl.` + req.body['table_name']

    console.log(table_name);

    try {
        //一時打席情報登録用テーブル作成
        await executeQuery(`create table ${table_name} (at_bat_id int not null auto_increment, inning int, game_id int not null,  school_id int not null, player_id int not null, pitcher_id int not null, score int, total_score int, outcount int, base char(3), text_inf varchar(300), pass bool, touched_coordinate varchar(100), ball_kind varchar(10), hit bool, foreball bool, deadball bool, pinch varchar(300), batting_order int, primary key(at_bat_id, game_id), foreign key(school_id) references t_school(school_id),
        foreign key(player_id) references t_player(player_id))`);
        res.end('OK');
    }
    catch (err) {
        //next(err);
        console.log("hehehe")
        console.log(err)
        next(err);
    }
});

//一時打席情報登録用のテーブル削除（運用者用webアプリ）
router.post("/tmp_table_delete", async (req, res, next) => {

    const { table_name, game_id } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;

    const tran = await beginTran();

    try {
        //一時テーブルの情報が蓄積テーブルに登録されているか確認
        const count_of_bat = await tran.query('select count(*) from t_at_bat where game_id = ?', [game_id]);
        const count_of_tmp = await tran.query(`select count(*) from ${tmp_table_name}`);

        if (count_of_bat[0]['count(*)'] >= 1 && count_of_bat[0]['count(*)'] == count_of_tmp[0]['count(*)']) {
            await tran.query(`drop table ${tmp_table_name}`);
            await tran.query("delete from t_during_game where game_id = ?", [game_id]);
            await tran.commit();
            res.end("OK");
            // try {
            //     await tran.query(`drop table ${tmp_table_name}`);
            //     await tran.commit();
            //     res.end("OK");
            // }
            // catch (err) {
            //     console.log("sakujodekinai")
            //     await tran.rollback();
            // }
        }
        else {
            //保存されていないときの処理
            console.log('試合テーブルを削除できませんでした');
            //console.log(err);
            await tran.rollback();
            res.end("sippai");
            //next(err);
        }
    }
    catch (err) {
        console.log('試合テーブルを削除できません');
        console.log(err);
        await tran.rollback();
        next(err);
    }
});

//一時打席情報登録テーブルの情報を打席情報蓄積テーブルへ送信（運用者用webアプリ）
router.post("/data_register", async (req, res, next) => {
    //一時テーブルの名前受け取り
    const { table_name, game_id } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;

    const tran = await beginTran();

    try {
        //一時打席情報記録テーブルの内容を打席情報記録テーブルに登録
        await tran.query(`insert into t_at_bat select * from ${tmp_table_name}`);
        //さきほど打席情報記録テーブルに登録した情報の行数を抜き出し
        const count_of_bat = await tran.query('select count(*) from t_at_bat where game_id = ?', [game_id]);
        //一時打席情報記録テーブルの行数を抜き出し
        const count_of_tmp = await tran.query(`select count(*) from ${tmp_table_name}`);
        //二つの一打席情報の行数が一意するかどうかで正常に登録できているかを判定
        //確認できたら内容をcommit
        if (count_of_bat[0]['count(*)'] >= 1 && count_of_bat[0]['count(*)'] == count_of_tmp[0]['count(*)']) {
            await tran.commit();
            res.end("OK");
        }
        else {
            //確認できなければrollback
            console.log('試合情報を登録できません');
            //console.log(err);
            await tran.rollback();
            next(err);
        }
        res.end("OK");
    }
    catch (err) {
        console.log('試合情報を登録できません');
        await tran.rollback();
        next(err);
    }
});

//試合情報送信（速報用）（運用者用webアプリ）
router.post("/tmp_daseki_transmission", async (req, res, next) => {
    const { table_name, at_bat_id, inning, game_id } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;

    try {
        //試合情報の取得と送信(速報用)（運用者用webアプリ）
        const rows = await executeQuery(`select * from ${tmp_table_name} as bat join (select * from t_starting_player where game_id = ?) as s_player using(player_id) join t_school as school on s_player.school_id = school.school_id where at_bat_id = ? and inning = ?`, [game_id, at_bat_id, inning]);

        return res.json(rows);
    }
    catch (err) {
        console.log(err);
        //await tran.rollback();
        next(err);
    }
});

//試合情報送信（速報用）
router.post("/tmp_daseki_call", async (req, res, next) => {
    const { table_name, game_id } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;

    try {
        //試合情報の取得と送信(速報用)
        const rows1 = await executeQuery('select * from t_game where game_id = ?', [game_id]);
        const rows2 = await executeQuery(`select * from ((select * from ${tmp_table_name}) as a` + 'left join (select player_id, grade, uniform_number, handed_hit from t_registered_player where tournament_id = ?) as b using(player_id) left join (select * from t_player where school_id = ? or school_id = ?) as c using(player_id)) order by at_bat_id', [rows1[0]['tournament_id'], rows1[0]['school_id_1'], rows1[0]['school_id_2']]);
        // console.log(rows1[0]['tournament_id'])
        // const rows2 = await executeQuery(`select at_bat_id, inning, game_id, school_id, daseki.player_id, pitcher_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch, batting_order, grade, uniform_number, player_name_kanji, handed_hit from ${tmp_table_name} as daseki, (select a.player_id, grade, uniform_num`+
        //     `ber, player_name_kanji, handed_hit from (select player_id, grade, uniform_number, handed_hit from t_registered_player where tournament_id = ?) as a, (select player_id, player_name_kanji from t_player where school_id = ? or school_id = ?) as b where a.player_id = b.player_id) as c where daseki.player_id = c.player_id order by at_bat_id`,  [rows1[0]['tournament_id'], rows1[0]['school_id_1'], rows1[0]['school_id_2']]);
        //const rows2 = await executeQuery(`select * from ${tmp_table_name} as daseki join (select player_id, player_name_kanji from t_player where school_id = ? or school_id = ?) as player using(player_id) order by at_bat_id`, [rows1[0]['school_id_1'], rows1[0]['school_id_2']]);
        //const rows2 = await executeQuery(`select * from ${tmp_table_name} as daseki join (select player_id, player_name_kanji from t_player where school_id = ? or school_id = ? as playerData1 join (select grade, uniform_number from t_registered_player where tournament_id = ?) as plaerData2 using(player_id)) as player using(player_id) order by at_bat_id`, [rows1[0]['school_id_1'], rows1[0]['school_id_2']], rows1[0]['tournament_id']);
        //const rows = await executeQuery('select * from t_game as a join t_venue as venue using(venue_id) join (select school_id as school_id_1, school_name as school_name_1 from t_school) as b using(school_id_1) join (select school_id as school_id_2, school_name as school_name_2 from t_school) as c using(school_id_2)  join t_tournament as tournament using(tournament_id) where game_id = ?', [game_id]);
        // const rows = await executeQuery(`select * from ${tmp_table_name} as bat join (select * from t_starting_player where game_id = ?) as s_player using(player_id) join t_school as school on s_player.school_id = school.school_id order by at_bat_id desc limit 1`, [game_id]);
        return res.json(rows2);
    }
    catch (err) {
        console.log(err);
        //await tran.rollback();
        next(err);
    }
});

//テーブル存在確認（運用者用webアプリ）
router.post("/tmp_table_check", async (req, res, next) => {
    const table_name = req.body['table_name'];

    console.log(table_name);

    try {
        //試合情報の取得と送信(速報用)
        const rows = await executeQuery(`show tables like '${table_name}'`);
        if (rows == 0 && rows == false) {
            res.end("not exist");
        } else {
            res.end("exist");
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//試合情報送信(過去データ参照用)
router.post("/daseki_transmission", async (req, res, next) => {
    const { game_id } = req.body;


    try {
        //試合情報の取得と送信
        //テスト用
        const rows1 = await executeQuery('select * from t_game where game_id = ?', [game_id]);
        const rows2 = await executeQuery('select * from ((select * from t_at_bat where game_id = ?) as a left join (select player_id, grade, uniform_number, handed_hit from t_registered_player where tournament_id = ?) as b using(player_id) left join (select * from t_player where school_id = ? or school_id = ?) as c using(player_id)) order by at_bat_id', [game_id, rows1[0]['tournament_id'], rows1[0]['school_id_1'], rows1[0]['school_id_2']]);
        //const rows2 = await executeQuery(`select * from t_at_bat as bat join (select player_id, player_name_kanji from t_player where school_id = ? or school_id = ?) as player using(player_id) where game_id = ?`, [rows1[0]['school_id_1'], rows1[0]['school_id_2'], game_id]);
        // const rows2 = await executeQuery('select at_bat_id, inning, game_id, school_id, daseki.player_id, pitcher_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch, batting_order, grade, uniform_number, player_name_kanji, handed_hit from t_at_bat as daseki, (select a.player_id, grade, uniform_num'+
        // 'ber, player_name_kanji, handed_hit from (select player_id, grade, uniform_number, handed_hit from t_registered_player where tournament_id = ?) as a, (select player_id, player_name_kanji from t_player where school_id = ? or school_id = ?) as b where a.player_id = b.player_id) as c where daseki.player_id = c.player_id order by at_bat_id', [rows1[0]['tournament_id'], rows1[0]['school_id_1'], rows1[0]['school_id_2']]);
        //const rows2 = await executeQuery(`select * from ${tmp_table_name} as daseki join (select player_id, player_name_kanji from t_player where school_id = ? or school_id = ?) as player using(player_id) order by at_bat_id`, [rows1[0]['school_id_1'], rows1[0]['school_id_2']]);

        return res.json(rows2);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});



//試合中選手情報更新（運用者用webアプリ）
router.post("/player_data_change", async (req, res, next) => {

    const { player_id, game_id, position, batting_order } = req.body;

    const tran = await beginTran();

    try {
        //選手情報の編集
        await tran.query('update t_starting_player set position = ?, batting_order = ? where player_id = ? and game_id = ?', [position, batting_order, player_id, game_id]);
        await tran.commit();
        res.end("OK");
    }
    catch (err) {
        console.log(err);
        await tran.rollback();
        next(err);
    }
});

//速報中の試合情報更新（編集）（運用者用webアプリ）
router.post("/tmp_daseki_update", async (req, res, next) => {
    const { table_name, at_bat_id, game_id, school_id, player_id, pitcher_id, score, total_score, batting_order, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;

    try {
        //試合情報の編集
        await executeQuery(`update ${tmp_table_name} set school_id = ?, player_id = ?, pitcher_id = ?, score = ?, total_score = ?, batting_order = ?, outcount = ?, base = ?, text_inf = ?, pass = ?, touched_coordinate = ?, ball_kind = ?, hit = ?, foreball = ?, deadball = ?, pinch = ? where at_bat_id = ? and game_id = ?`, [school_id, player_id, pitcher_id, score, total_score, batting_order, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch, at_bat_id, game_id]);
        res.end("OK");
    }
    catch (err) {
        console.log(err);
        console.log('試合情報を登録できません');
        next(err);
    }
});

//過去の試合情報更新（編集）（運用者用webアプリ）
router.post("/registered_daseki_update", async (req, res, next) => {
    const { at_bat_id, game_id, school_id, player_id, pitcher_id, score, total_score, batting_order, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch } = req.body;

    //const tran = await beginTran();

    try {
        //試合情報の編集
        await executeQuery(`update t_at_bat set score = ?, total_score = ?, batting_order = ?, outcount = ?, base = ?, text_inf = ?, pass = ?, touched_coordinate = ?, ball_kind = ?, hit = ?, foreball = ?, deadball = ?, pinch = ? where at_bat_id = ? and game_id = ?`, [school_id, player_id, pitcher_id, score, total_score, batting_order, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch, at_bat_id, game_id]);
        res.end("OK");
    }
    catch (err) {
        console.log('試合情報を登録できません');
        next(err);
    }
});

//速報中の試合の状況取得（運用者用webアプリ）
router.post("/tmp_daseki_state", async (req, res, next) => {
    const { tournament_id } = req.body;
    //const tmp_table_name = `test_pbl.` + table_name;
    try {
        var gameStateArray = [];
        const game_ids = await executeQuery('select game_id from t_game where tournament_id = ?  and school_id_1 is not null and school_id_2 is not null', [tournament_id]);
        //速報中の試合テーブル一覧からgame_idが一致するテーブル名を出力
        for (var game of game_ids) {
            let gameIdArray = [{},{}]
            let Inning = {};
            let score = {'start':true}
            let table_name = await executeQuery('select * from t_during_game where game_id = ?', [game['game_id']]);
            let gameInfo = await executeQuery('select * from t_game where game_id = ?', [game['game_id']]); 
            //console.log(table_name)
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
                if(score1 == 0 && score1 == false){
                    score['score1'] = 0;
                }else{
                    score['score1'] = score1[0]['total_score'];
                }
                
                if(score2 == 0 && score2 == false){
                    score['score2'] = 0
                    score2 = 0;
                }else{
                    score['score2'] = score2[0]['total_score'];
                } 
                
                if(during[0]['count(*)'] == 0){
                    score['start'] = false;
                }
                gameIdArray[0] = Inning;
                gameIdArray[1] = score;
                gameStateArray.push(gameIdArray);
            }
        }
        //const table_name = await executeQuery('select * from t_during_game where game_id = ?', [game_id]);
        //console.log(table_name)
        //const tmp_table_name = `test_pbl.` + table_name[0]['tmp_table_name'];
        //試合情報の編集
        //await executeQuery(`update ${tmp_table_name} set school_id = ?, player_id = ?, pitcher_id = ?, score = ?, total_score = ?, outcount = ?, base = ?, text_inf = ?, pass = ?, touched_coordinate = ?, ball_kind = ?, hit = ?, foreball = ?, deadball = ?, pinch = ? where at_bat_id = ? and game_id = ?`, [school_id, player_id, pitcher_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch, at_bat_id, game_id]);
        //console.log(inning)
        return res.json(gameStateArray);
    }
    catch (err) {
        console.log(err);
        console.log('試合情報を登録できません');
        next(err);
    }
});

module.exports = router;