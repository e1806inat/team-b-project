const bodyParser = require('body-parser') // body-parser
const express = require("express");
const  { engine } = require("express-handlebars");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
const mysql = require("mysql");
app.use(express.json());

const PORT = 5000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//connection pool (always open database)
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: '',
    database: "pbl_teamb_test",
});

app.post("/insert", (req, res) => {

    //データを挿入
    /*const{venue_id, venue_school} = req.body;
    if ( addSchool.length === 0 ){
        return res.status(400).send("学校名が空欄です");
    }*/

    //console.log(req.body);

    const { venue_id, venue_name } = req.body;

    console.log(venue_id);
    console.log(venue_name);

    pool.getConnection((err, connection) => {
        if ( err ){
            console.log("Connetion failed");
            throw err;
        }
        
        console.log("Connecting MySQL・・・");

        //console.log(venue_id);
        //console.log(venue_name);

        connection.query('insert into school ( venue_id, venue_name) values (?,?)', [venue_id,venue_name], (err,rows) =>{
            connection.release();

            if ( err ){
                console.log("Insert Failed・・・");
                console.log(err);
            }
        });
        
        //mysqlにデータ追加
        /*connection.query(
            `INSERT INTO school VALUES ("", "")`, (err, rows) => {
            connection.release();

            console.log(rows);

            if ( !err ){
                res.redirect("/");
            }
            else{
                console.log(err);
            }
        });*/

        
    })
    
});

app.post("/delete", (req, res) => {

    //delete(１つのデータ削除)
    const{deleteId} = req.body;
    console.log(deleteId);
    if ( deleteId.length === 0 ){
        return res.status(400).send("IDを入力してください");
    }
    if ( isNaN(deleteId) ){
        return res.status(400).send("数字を入力してください");
    }

    pool.getConnection((err, connection) => {
        //connection check
        if ( err ){
            console.log("Connetion failed");
            throw err;
        }

        connection.query(
            `DELETE FROM school WHERE venue_id = "${deleteId}"`, (err, rows) => {
            connection.release();

            console.log(rows);

            if ( !err ){
                res.redirect("/");
            }
            else{
                console.log(err);
            }
        });

    });
});

app.post("/AllDelete", (req, res) => {
    pool.getConnection((err, connection) => {
        if ( err ){
            console.log("Connetion failed");
            throw err;
        }

        connection.query(
            `DELETE FROM school`, (err, rows) => {
            connection.release();

            if ( !err ){
                res.redirect("/");
            }
            else{
                console.log(err);
            }
        });
    }); 
});

//update(データ更新)
app.post("/Update", (req, res) => {
    const{UpdateId} = req.body;
    const{UpdateName} = req.body;

    console.log(UpdateId);
    console.log(UpdateName);

    if ( UpdateId.length === 0 ){
        return res.status(400).send("IDを入力してください");
    }
    if ( isNaN(UpdateId) ){
        return res.status(400).send("数字を入力してください");
    }

    if ( UpdateName.length === 0 ){
        return res.status(400).send("学校名が空欄です");
    }

    pool.getConnection((err, connection) => {
        if ( err ){
            console.log("Connetion failed");
            throw err;
        }

        connection.query(
            `UPDATE school SET venue_name = "${UpdateName}" where venue_id = "${UpdateId}"`, (err, rows) => {
            connection.release();

            if ( !err ){
                res.redirect("/");
            }
            else{
                console.log(err);
            }
        });
    }); 
});

// root directory(/) means localhost:NUMBER.
app.get("/select", (req, res) => {
    //res.render("home"); //homeはhome.handlebarsの先頭部分から

    const{at_bat_id, inning, game_id} = req.body;
    
    pool.getConnection((err, connection) => {
        if ( err ){
            console.log("Connetion failed");
            throw err;
        }

        console.log("Connecting MySQL・・・\n");
        //mysqlにquery(問い合わせ)
        //select(データベースを表示)
        connection.query(`SELECT * FROM t_at_bat where at_bat_id = ? AND inning = ? AND game_id = ?`, [at_bat_id,inning,game_id], (err, rows) => {
            connection.release();

            //console.log(rows);

            if ( !err ){
                //res.render("home", {rows});
                console.log("return to postman...\n");
                return res.json(rows);
            }
        })
    });
});



app.listen(PORT, () => console.log("Starting server・・・\n"));
