//一打席速報入力画面のAPIたち
const router = require("express").Router();
const mysql = require("mysql2");
const config = require("../mysqlConnection/config");

const pool = mysql.createPool({
    host: "133.71.101.108",
    user: "test_user",
    password: "v2V!%Nwc",
    database: "test_pbl",
});

router.get("/", (req, res) => {
    res.send("Hello daseki");
});

//試合情報登録
router.post("/daseki_register", (req, res) => {
    const { at_bat_id, inning_id, player_id, school_id, outcount, base, text_inf, pass, touched_coordinate, ball_kind } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");

        //次はデータ取得から
        connection.query("insert into t_bat values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [at_bat_id, inning_id, player_id, school_id, outcount, base, text_inf, pass, touched_coordinate, ball_kind], (err, rows) => {
            connection.release();

            console.log(rows);
            if (err) {
                console.log('試合情報を登録できません');
            }
            /*
            if (!err) {
                res.render("home", { rows });
            }*/

        });
    });
});

//試合情報送信
router.post("/daseki_transmission", (req, res) => {
    console.log("e")
    const { at_bat_id, inning_id, game_id } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");
        
        //次はデータ取得から
        connection.query("select * from t_bat where at_bat_id = ? and inning_id = ? and game_id = ?", [at_bat_id, inning_id, game_id], (err, rows) => {
            connection.release();

            console.log(rows);

            if (err) {
                console.log('試合情報を読み込めません');
            } else {
                return res.json(
                    {
                        at_bat_id: rows[0]['at_bat_id'],
                        inning_id: rows[0]['inning_id'],
                        game_id: rows[0]['game_id'],
                        school_id: rows[0]['school_id'],
                        outcount: rows[0]['outcount'],
                        base: rows[0]['base'],
                        text_inf: rows[0]['text_inf'],
                        pass: rows[0]['pass'],
                        touched_coordinate: rows[0]['touched_coordinate'],
                        ball_kind: rows[0]['ball_kind']
                    }
                );
            }
        });
    });
});

//選手情報更新
router.post("/player_data_change", async (req, res) => {
    const { player_id, game_id, school_id, player_name_kanji, player_name_hira, position, uniform_number, grade, handed_hit, handed_throw, batting_order } = req.body;
    pool.getConnection(async (err, connection) => {
        connection.query('update t_starting set  position = ?, batting_order = ? where player_id = ? and game_id = ? and school_id = ?', [position, batting_order, player_id, game_id, school_id], async (err, rows) => {
            connection.release();

            if (err) {
                console.log('スタメンでエラー起きてる');
            }
            console.log(rows);
        });
    });
});

module.exports = router;