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

const config = require('./mysqlConnection/config');

const cookieParser = require("cookie-parser");

const session = require('express-session');
const { errorHandler } = require("./error");
const MySQLStore = require('express-mysql-session')(session); 

const mysqlOptions ={
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE
};

const sess = {
    secret: "otameshi",
    cookie: {httpOnly:true, secure:false, maxAge: 86400000 },
    store: new MySQLStore(mysqlOptions),
    resave: false,
    saveUninitialized: false
};

app.use(cookieParser());
app.use(session(sess));

var cors = require('cors'); 

const corsOptions = {
  credentials: true
}
app.use(cors(corsOptions));

var loginCheck = function(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    res.redirect('/auth');
  }
};
    
app.use(express.json());

app.get("/", loginCheck);

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.use("/auth", auth);
app.use("/daseki", daseki);
app.use("/member",  member);
app.use("/school",  school);
app.use("/tournament",  tournament);
app.use("/venue",  venue);
app.use("/game",  game);
app.use(errorHandler);

app.listen(PORT, () => {
});