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

// cors対策
/*
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTION"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});*/

app.use(express.json());
app.use("/daseki", daseki);
app.use("/auth", auth);
app.use("/member", member);
app.use("/school", school);
app.use("/tournament", tournament);
app.use("/venue", venue);
app.use("/game", game);

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.listen(PORT, () => {
    console.log("サーバー起動中・・・");
});