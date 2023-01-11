//選手情報関連のAPIたち
const router = require("express").Router();
const { beginTran, executeQuery } = require("../mysql_client.js");
const cron = require("node-cron");

//選手情報登録
router.post("/member_register", async (req, res, next) => {
    try {
        //for文で選手登録
        for (const value of req.body) {
            await executeQuery('insert into t_player values (0, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [value.school_id, value.player_name_kanji, value.player_name_hira, value.grade, value.handed_hit, value.handed_throw, value.hit_num, value.bat_num, value.BA]);
        }
        res.end("OK");
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//大会毎の選手情報登録（運用者用webアプリ）
router.post("/tournament_member_register", async (req, res, next) => {
    try {
        for (const value of req.body) {
            //upsertで大会毎に出場する選手を登録
            await executeQuery('insert into t_registered_player (player_id, tournament_id, school_id, uniform_number, grade, handed_hit, handed_throw, hit_num, bat_num, BA) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on duplicate key update grade = values(grade), handed_hit = values(handed_hit), handed_throw = values(handed_throw), BA = values(BA)', [value.player_id, value.tournament_id, value.school_id, value.uniform_number, value.grade, value.handed_hit, value.handed_throw, value.hit_num, value.bat_num, value.BA]);
        }
        res.end("OK");
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//大会毎の選手削除（運用者用webアプリ）
router.post("/tournament_member_delete_batch", async (req, res, next) => {
    const { tournament_id, school_id } = req.body;
    try {
        //大会登録選手の一括削除
        await executeQuery('delete from t_registered_player where tournament_id = ? and school_id = ?', [tournament_id, school_id]);
        res.end("OK");
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//前大会の選手情報参照(登録選手選択画面の補助用→これを使うと画面が見やすくなる！)（運用者用webアプリ）
router.post("/pre_tournament_member_call", async (req, res, next) => {
    const { tournament_id, school_id } = req.body;
    try {
        //指定の大会で登録されていた選手一覧（選手ID）の取得
        rows = executeQuery('select player_id from t_registered_player where tournament_id = ? and school_id = ?', [tournament_id, school_id]);
        return res.json(rows);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//スタメン登録(このままでは途中で終了した場合に途中までinsertされたやつが残る。そこでupsertにすればもう一回入れなおした時にいい感じになりそう)（運用者用webアプリ）
router.post("/starting_member_register", async (req, res, next) => {
    try {
        for (const value of req.body) {
            //upsertでスタメンを登録
            await executeQuery('insert into t_starting_player (player_id, game_id, school_id, position, uniform_number, grade, handed_hit, handed_throw, batting_order, BA) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on duplicate key update position = values(position), uniform_number = values(uniform_number), grade = values(grade), handed_hit = values(handed_hit), handed_throw = values(handed_throw), batting_order = values(batting_order), BA = values(BA)', [value.player_id, value.game_id, value.school_id, value.position, value.uniform_number, value.grade, value.handed_hit, value.handed_throw, value.batting_order, value.BA]);
        }
        res.end("OK");
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//編集のための試合、高校ごとのスタメン登録一括削除（編集の際に削除しておかないとどんどん登録選手が増えていく可能性があるため）（運用者用webアプリ）
router.post("/starting_member_delete_batch", async (req, res, next) => {
    const {game_id, school_id} = req.body;
    try {
        //指定の試合の高校のスタメンdelete
        await executeQuery('delete from t_starting_player where game_id = ? and school_id = ?', [game_id, school_id]);
        res.end("OK");
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//過去データ参照のための呼び出し
router.post("/member_call", async (req, res, next) => {
    const { school_id } = req.body;

    try {
        
        //選手の学年は毎年４月１日に更新され、３年生は４年生と設定されている（grade:4）。
        const rows = await executeQuery('select * from t_player where grade <= 3 and school_id = ? and player_name_kanji is not null', [school_id]);
        return res.json(rows);
    }
    catch (err) {
        next(err);
    }
});

//選手データ参照（顧客用webアプリ）
router.post("/ref_member_call", async (req, res, next) => {
    const { school_id, grades, option } = req.body;

    try {
        //選手テーブルから選手情報を呼び出す。in(?)で学年の指定ができる例えばin(1,2)なら２年生以下、in(2,4)なら２年生と卒業生のような感じ
        //optionは並び替えの基準例えば、gradeなら学年順、BAなら打率順
        //ascは昇順か降順かasc==1ならば昇順、じゃなければ降順
        var rows = await executeQuery(`select * from t_player where grade in (?) and school_id = ? order by player_name_hira`, [grades, school_id]);
        if (option=="grade"){
            var rows = await executeQuery(`select * from t_player where grade in (?) and school_id = ? order by grade`, [grades, school_id]);
        } 
        else if (option=="player_name_hira"){
            var rows = await executeQuery(`select * from t_player where grade in (?) and school_id = ? order by player_name_hira`, [grades, school_id]);
        }
        else if (option=="BA"){
            var rows = await executeQuery(`select * from t_player where grade in (?) and school_id = ? order by BA desc`, [grades, school_id]);
        }
        else if (option=="hit_num"){
            var rows = await executeQuery(`select * from t_player where grade in (?) and school_id = ? order by hit_num desc`, [grades, school_id]);
        }
        else if (option=="bat_num"){
            var rows = await executeQuery(`select * from t_player where grade in (?) and school_id = ? order by bat_num desc`, [grades, school_id]);
        }
        //console.log(rows)    
        return res.json(rows);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//選手データ参照（顧客用webアプリ）
router.post("/ref_tournament_member_call", async (req, res, next) => {
    const { tournament_id, school_id, option} = req.body;

    try {
        //大会に登録された選手を閲覧可能、optionは並び替えの基準
        var rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ? order by player_name_hira', [school_id, tournament_id, option]);
        if (option=="grade"){
            var rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ? order by grade', [school_id, tournament_id, option]);
        } 
        else if (option=="player_name_hira"){
            var rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ? order by player_name_hira', [school_id, tournament_id, option]);
        }
        else if (option=="BA"){
            var rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ? order by  BA desc', [school_id, tournament_id, option]);
        }
        else if (option=="hit_num"){
            var rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ? order by hit_num desc', [school_id, tournament_id, option]);
        }
        else if (option=="bat_num"){
            var rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ? order by bat_num desc', [school_id, tournament_id, option]);
        }
        return res.json(rows);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//大会に登録されている選手の呼び出し。スタメン登録画面で使用（運用者用webアプリ）
router.post("/tournament_member_call", async (req, res, next) => {
    const { tournament_id, school_id } = req.body;

    try {
        //大会毎に登録されている選手の呼び出し
        const rows = await executeQuery('select * from t_registered_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id) where tournament_id = ?', [school_id, tournament_id]);
        return res.json(rows);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//試合ごとのスタメン呼び出し。どこで使うかは分からない。（運用者用webアプリ）
router.post("/starting_member_call", async (req, res, next) => {
    const { game_id, school_id } = req.body;

    try {
        //試合ごとのスタメンの呼び出し
        const rows = await executeQuery('select * from t_starting_player as a join (select player_id, player_name_kanji, player_name_hira from t_player where school_id = ?) as b using(player_id)  where game_id = ? order by batting_order', [school_id, game_id]);
        return res.json(rows);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//選手情報編集、選手情報を消すこともできる（運用者用webアプリ）
router.post("/member_edit", async (req, res, next) => {
    const { player_id, school_id, player_name_kanji, player_name_hira, grade, handed_hit, handed_throw, BA } = req.body;

    //const tran = await beginTran();

    try {
        //選手情報の編集
        await executeQuery('update t_player set player_name_kanji = ?, player_name_hira = ?, grade = ?, handed_hit = ?, handed_throw = ?, BA = ? where player_id = ? and school_id = ?', [player_name_kanji, player_name_hira, grade, handed_hit, handed_throw, BA, player_id, school_id]);
        res.end('OK');
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//選手情報編集、選手情報を消すこともできる（運用者用webアプリ）
router.post("/tournament_member_edit", async (req, res, next) => {
    const { player_id, tournament_id, uniform_number, grade, handed_hit, handed_throw, BA } = req.body;

    //const tran = await beginTran();

    try {
        //大会登録選手情報の編集
        await executeQuery('update t_registered_player set uniform_number = ?, grade = ?, handed_hit = ?, handed_throw = ?, BA = ? where player_id = ? and tournament_id = ?', [uniform_number, grade, handed_hit, handed_throw, BA, player_id, tournament_id]);
        res.end('OK');
    }
    catch (err) {
        next(err);
    }
});

//選手情報編集、選手情報を消すこともできる（運用者用webアプリ）
router.post("/starting_member_edit", async (req, res, next) => {
    const { player_id, game_id, position, uniform_number, grade, handed_hit, handed_throw, batting_order, BA } = req.body;

    //const tran = await beginTran();

    try {
        //試合ごとのスタメン情報の編集
        await executeQuery('update t_starting_player set position = ?,uniform_number = ?, grade = ?, handed_hit = ?, handed_throw = ?, batting_order = ?, BA = ? where player_id = ? and game_id = ?', [position, uniform_number, grade, handed_hit, handed_throw, batting_order, BA, player_id, game_id]);
        res.end('OK');
    }
    catch (err) {
        next(err);
    }
});

//大会毎の選手情報削除（運用者用webアプリ）
router.post("/tournament_member_delete", async (req, res, next) => {
    const { tournament_id, player_id } = req.body;
    try {
        //大会登録選手の削除    
        await executeQuery('delete from t_registered_player where tournament_id = ? and player_id = ?', [tournament_id, player_id]);   
        res.end("OK");
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//スタメンの選手情報削除（運用者用webアプリ）
router.post("/starting_member_delete", async (req, res, next) => {
    const { game_id, player_id } = req.body;
    try {
        //試合ごとの選手情報の削除    
        await executeQuery('delete from t_starting_player where game_id = ? and player_id = ?', [game_id, player_id]);   
        res.end("OK");
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//打率計算＆更新（運用者用webアプリ）
router.post("/cal_BA", async (req, res, next) => {
    //試合結果から打率を計算する。
    const { game_id, table_name } = req.body;
    const tmp_table_name = `test_pbl.` + table_name;
    
    count_hit = {};
    count_bat = {};
    const tran = await beginTran();

    try {
        //試合で選手が安打を打った打席のplayer_idとhitフラグを取得
        rows = await tran.query(`select player_id, hit, foreball, deadball from ${tmp_table_name} where game_id = ? and pass <> 1`, [game_id]);
        //rows = await tran.query(`select player_id, hit, foreball, deadball from ${tmp_table_name} pass <> 1`);


        //for文を使って各選手毎の打席数とヒット数を計算
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
        //打率の計算と選手テーブルへの打率挿入
        for (var key in count_bat) {
            //選手テーブルから過去の打席数、安打数を取得
            rows = await tran.query('select hit_num, bat_num from t_player where player_id = ?', [key]);
            //打率の計算(計算式は打率(BA)＝総安打数(tmp_hit)/{総打席数(tmp_bat)-四死球合計数(foreball&deadball)})
            var tmp_hit = await rows[0]['hit_num'] + count_hit[key];
            var tmp_bat = await rows[0]['bat_num'] + count_bat[key];
            //console.log(tmp_bat);
            var BA = await Number((tmp_hit / tmp_bat).toFixed(3));
            //選手テーブルに新たな安打数、打席数、打率を挿入
            await tran.query('update t_player set hit_num = ?, bat_num = ?, BA = ? where player_id = ?', [tmp_hit, tmp_bat, BA, key]);
        }
        tran.commit();
        res.end('OK');
    }
    catch (err) {
        console.log(err);
        tran.rollback();
        next(err);
    }
});

//大会選手の打率を更新（運用者用webアプリ）
router.post("/tournament_member_BA_update", async (req, res, next) => {
    const { player_id, tournament_id, BA } = req.body;

    //const tran = await beginTran();

    try {
        //大会登録選手情報の更新
        await executeQuery('update t_registered_player set BA = ? where player_id = ? and tournament_id = ?', [BA, player_id, tournament_id]);
        res.end('OK');
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//学校ID、選手名、学年が同じ選手がいないか確認（運用者用webアプリ）
router.post("/check_member", async (req, res, next) => {
    const { school_id, player_name_kanji, grade } = req.body;

    try {
        //同じ選手が登録されていないかを確認
        const rows = await executeQuery('select count(*) from t_player where school_id = ? and grade = ? and player_name_kanji = ?', [school_id, grade, player_name_kanji]);
        if (rows[0]['count(*)']>=1){
            res.end('すでに登録されています');
        } else {
            res.end('登録されていません');
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

//一年に一度学年更新（運用者用webアプリ）
cron.schedule('* * * 1 4 *',async () => {
    //4月1日に学年を更新
    const tran = await beginTran();
    try{
        await tran.query('update t_player set grade = replace(grade, 3, 4) where grade = 3');
        await tran.query('update t_player set grade = replace(grade, 2, 3) where grade = 2');
        await tran.query('update t_player set grade = replace(grade, 1, 2) where grade = 1');
        tran.commit();
    }
    catch(err){
        tran.rollback();
        console.log(err);
        next(err);
    }
});

module.exports = router;