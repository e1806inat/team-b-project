const express = require("express");
const app = express();
const PORT = 5000;
const daseki = require("./routes/daseki");
const auth = require("./routes/auth");
const member = require("./routes/member");
const school = require("./routes/school");
const tournament = require("./routes/tournament");
const venue = require("./routes/venue");
const game = require("./routes/game");

const session = require('express-session');
//const { default: errorHandler } = require("./error");
const { errorHandler } = require("./error");
//const { loginlogout } = require("./loginout");
const MySQLStore = require('express-mysql-session')(session); //追加分

const mysqlOptions ={
    host: "133.71.101.108",
    user: "test_user",
    password: "v2V!%Nwc", 
    database: "test_pbl"
  };

const sess = {
    secret: "otameshi",
    cookie: {maxAge: 10 * 1000},
    store: new MySQLStore(mysqlOptions),
    resave: false,
    saveUninitialized: false
};

sess.cookie.secure = true; //for production
app.use(session(sess));
// cors対策

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTION"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

//sessのテスト後で別ファイルに分けるべし
/*
var sessionCheck = function(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/auth');
    }
  };*/

app.use(express.json());
//app.use(require('./loginout'));
//app.use(errorHandler);
app.use("/auth", auth);
app.use("/daseki", daseki);
app.use("/member",  member);
app.use("/school",  school);
app.use("/tournament",  tournament);
app.use("/venue",  venue);
app.use("/game",  game);
app.use(errorHandler);


app.get("/", (req, res) => {
    res.send("Hello Express");
});
/*
app.post("/", (req, res) => {
    let message = req.body.message
    req.session.message = message
});*/

app.listen(PORT, () => {
    console.log("サーバー起動中・・・");
});