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

//const pool = mysql.createPool(config.serverConf);

router.get("/", (req, res) => {
    res.send("Hello daseki");
});

//一時打席情報登録用のテーブルに打席情報登録（UPSERTを使うかも）
router.post("/daseki_register", async (req, res, next) => {
    const { table_name, inning, game_id, school_id, player_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch } = req.body;

    try {
        //打席情報登録
        await executeQuery(`insert into ${table_name} values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [inning, game_id, school_id, player_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch]);
        res.end("OK");
    }
    catch (err) {
        //next(err);
        console.log(err);
        next(err);
    }
});

//一時打席情報登録用のテーブル作成
router.post("/tmp_table_create", async (req, res, next) => {
    //create table のための名前作成
    const table_name = `test_pbl.` + req.body['table_name']

    console.log(table_name);

    try {
        //一時打席情報登録用テーブル作成
        await executeQuery(`create table ${table_name} (at_bat_id int not null, inning varchar(5), game_id int not null,  school_id int not null, player_id int not null, score int, total_score int, outcount int, base char(3), text_inf varchar(300), pass bool, touched_coordinate varchar(100), hit bool, foreball bool, deadball bool, pinch varchar(300), varchar(10), primary key(at_bat_id, inning, game_id))`);
        res.end('OK');   
    }
    catch (err) {
        //next(err);
        console.log("hehehe")
        next(err);
    }
});  

//一時打席情報登録用のテーブル削除
router.post("/tmp_table_delete", async (req, res, next) => {

    const { table_name, game_id } = req.body;

    const tran = await beginTran();

    try {
        //一時テーブルの情報が蓄積テーブルに登録されているか確認
        const rows = await tran.query(`select count(*) from t_at_bat where game_id = ?`, [game_id]);
        console.log(rows);
        if (rows[0]['count(*)'] >= 1) {
            try {
                await tran.query(`drop table ${table_name}`);
                await tran.commit();
                res.end("OK");
            }
            catch (err) {
                console.log("sakujodekinai")
                await tran.rollback();
            }
        }
        else {
            //保存されていないときの処理
            console.log('そんなテーブルないです');
            //console.log(err);
            await tran.rollback();
            next(err);
        }
    }
    catch (err) {
        console.log('試合テーブルを削除できません');
        console.log(err);
        await tran.rollback();
        next(err);
    }
});

//一時打席情報登録テーブルの情報を打席情報蓄積テーブルへ送信
router.post("/data_register", async (req, res) => {
    //一時テーブルの名前受け取り
    const { table_name } = req.body;

    const tran = await beginTran();

    try {
        await tran.query(`insert into t_at_bat select * from ${table_name}`);
        await tran.commit();
        res.end("OK");
    }
    catch (err) {
        console.log('試合テーブルを削除できません');
        await tran.rollback();
        next(err);
    }
});

//試合情報送信（速報用）
router.post("/tmp_daseki_transmission", async (req, res, next) => {
    const { table_name, at_bat_id, inning, game_id } = req.body;

    try {
        //試合情報の取得と送信
        //const rows = await executeQuery(`select * from ${table_name} as a join t_starting_player as b on  b.game_id = a.game_id and b.player_id = a.player_id where at_bat_id = ? and inning = ? and game_id = ?`, [at_bat_id, inning, game_id]);
        const rows = await executeQuery(`select * from ${table_name} as bat join (select * from t_starting_player where game_id = ?) as s_player using(player_id) join t_school as school on s_player.school_id = school.school_id where at_bat_id = ? and inning = ?`, [game_id, at_bat_id, inning]);
        //const rows1 = await executeQuery('select * from t_game as a join t_school as b on b.school_id = a.school_id_1 where tournament_id = ? order by match_num', [tournament_id]);
        /*
        return res.json(
            {
                at_bat_id: rows[0]['at_bat_id'],
                inning: rows[0]['inning'],
                game_id: rows[0]['game_id'],
                school_id: rows[0]['school_id'],
                player_id: rows[0]['player_id'],
                score: rows[0]['score'],
                total_score: [0]['total_score'],
                outcount: rows[0]['outcount'],
                base: rows[0]['base'],
                text_inf: rows[0]['text_inf'],
                pass: rows[0]['pass'],
                touched_coordinate: rows[0]['touched_coordinate'],
                ball_kind: rows[0]['ball_kind']
            }
        );*/
        return res.json(rows);
    }
    catch (err) { 
        console.log(err);
        //await tran.rollback();
        next(err);
    }
});

//試合情報送信(過去データ参照用)
router.post("/daseki_transmission", async (req, res, next) => {
    const { at_bat_id, game_id } = req.body;
    

    try {
        //試合情報の取得と送信
        //const rows = await executeQuery(`select * from ${table_name} as a join t_starting_player as b on  b.game_id = a.game_id and b.player_id = a.player_id where at_bat_id = ? and inning = ? and game_id = ?`, [at_bat_id, inning, game_id]);
        //テスト用
        const rows = await executeQuery(`select * from t_at_bat as bat join (select * from t_starting_player where game_id = ?) as s_player using(player_id) join t_school as school on s_player.school_id = school.school_id where at_bat_id = ? and inning = ?`, [game_id, at_bat_id]);
        //const rows1 = await executeQuery('select * from t_game as a join t_school as b on b.school_id = a.school_id_1 where tournament_id = ? order by match_num', [tournament_id]);
        /*
        return res.json(
            {
                at_bat_id: rows[0]['at_bat_id'],
                inning: rows[0]['inning'],
                game_id: rows[0]['game_id'],
                school_id: rows[0]['school_id'],
                player_id: rows[0]['player_id'],
                score: rows[0]['score'],
                total_score: [0]['total_score'],
                outcount: rows[0]['outcount'],
                base: rows[0]['base'],
                text_inf: rows[0]['text_inf'],
                pass: rows[0]['pass'],
                touched_coordinate: rows[0]['touched_coordinate'],
                ball_kind: rows[0]['ball_kind']
            }
        );*/
        return res.json(rows);
    }
    catch (err) { 
        console.log(err);
        //await tran.rollback();
        next(err);
    }
});

//試合中選手情報更新
router.post("/player_data_change", async (req, res, next) => {
   
    const { player_id, game_id, position, batting_order } = req.body;

    const tran = await beginTran();

    try{
        //選手情報の編集
        await tran.query('update t_starting_player set position = ?, batting_order = ? where player_id = ? and game_id = ?', [position, batting_order, player_id, game_id]);
        await tran.commit();
        res.end("OK");
    }
    catch(err){
        console.log(err);
        await tran.rollback();
        next(err);
    }
});

//速報中の試合情報更新（編集）
router.post("/daseki_update", async (req, res, next) => {
    const { table_name, at_bat_id, game_id, school_id, player_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch } = req.body;

    //const tran = await beginTran();

    try{
        //試合情報の編集
        await executeQuery(`update ${table_name} set school_id = ?, player_id = ?, score = ?, total_score = ?, outcount = ?, base = ?, text_inf = ?, pass = ?, touched_coordinate = ?, ball_kind = ?, hit = ?, foreball = ?, deadball = ? where at_bat_id = ? and game_id = ?`, [school_id, player_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch, at_bat_id, game_id]);
        //await tran.commit();
        res.end("OK");
    }
    catch(err){
        console.log('試合情報を登録できません');
        //await tran.rollback();
        next(err);
    }
});

//過去の試合情報更新（編集）
router.post("/registered_daseki_update", async (req, res, next) => {
    const { at_bat_id, game_id, school_id, player_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch } = req.body;

    //const tran = await beginTran();

    try{
        //試合情報の編集
        await executeQuery(`update t_at_bat set score = ?, total_score = ?, outcount = ?, base = ?, text_inf = ?, pass = ?, touched_coordinate = ?, ball_kind = ?, hit = ?, foreball = ?, deadball = ? where at_bat_id = ? and game_id = ?`, [school_id, player_id, score, total_score, outcount, base, text_inf, pass, touched_coordinate, ball_kind, hit, foreball, deadball, pinch, at_bat_id, game_id]);
        //await tran.commit();
        res.end("OK");
    }
    catch(err){
        console.log('試合情報を登録できません');
        //await tran.rollback();
        next(err);
    }
});

module.exports = router;