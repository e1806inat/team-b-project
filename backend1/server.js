const express = require("express");
const app = express();
const PORT = 5000;
const auth = require("./routes/auth");
const post = require("./routes/post");

app.use(express.json());

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

app.use("/auth", auth);
app.use("/post", post);

app.get("/", (req, res) => {
    res.send("Hello Express");
});

// postの処理
app.post("/", function (req, res) {
    try {
      res.json(req.body); // jsonで返却
    } catch (error) {
      console.error(error);
    }
  });
  

app.listen(PORT, () => {
    console.log("サーバーを起動中・・・");
});