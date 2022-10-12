const router = require("express").Router();
const mysql = require("mysql2");
const async = require('async');
const config = require("../mysqlConnection/config");

const pool = mysql.createPool(config.serverConf);

//試合情報登録
router.post("/school_register", (req, res) => {
    const { school_name } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        console.log("MYSQLと接続中です");

        //次はデータ取得から
        connection.query("insert into t_school values (0, ?)", [school_name], (err, rows) => {
            connection.release();

            console.log(rows);
            if (err) {
                console.log('学校情報を登録できません');
            }
            /*
            if (!err) {
                res.render("home", { rows });
            }*/

        });
    });
});

module.exports = router;
