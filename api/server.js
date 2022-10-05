const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.listen(PORT, () => {
    console.log("サーバー起動中・・・");
});