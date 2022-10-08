const express = require("express");
const app = express();
const PORT = 5000;
const daseki = require("./routes/daseki");
const auth = require("./routes/auth");

app.use(express.json());
app.use("/daseki", daseki);
app.use("/auth", auth);

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.listen(PORT, () => {
    console.log("サーバー起動中・・・");
});