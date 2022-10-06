const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const {User} = require("../db/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { application } = require("express");

router.get("/", (req, res) => {
    res.send("Hello Authjs");
});

router.get("/login", (req, res) => {
    res.send("Hello login");
});

//ユーザ新規登録用のAPI
router.post("/register", body("email").isEmail(), body("password").isLength({min:6}), async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    //DBにユーザが存在しているか確認

    const user = User.find((user) => user.email === email);
    if(user){
        return res.status(400).json([
            {
                message:"すでにそのユーザは存在しています。"
            }
        ]);
    }

    //console.log(email, password);
    let hashedPassword = await bcrypt.hash(password, 10)
    //console.log(hashedPassword);

    //dbへ保存
    User.push({
        email,
        password: hashedPassword,
    });

    //クライアントへJWTの発行
    //secret_keyは実際は見えないように保存する
    const token = await JWT.sign({
        email,
     },
     "SECRET_KEY",
     {
        expiresIn:"24h",
     }
    );

    return res.json({
        token: token,
    });
});

//ログイン用のAPI
router.post("/login", async(req, res) => {
    const {email, password} = req.body;

    const user = User.find((user) => user.email === email);
    if(!user){
        console.log("aaaa")
        return res.status(400).json([
            {
                message:"そのユーザは存在しません"
            }
        ]);
    }

    //パスワードの複合、照合　（正常に動かないため使っていません,おそらくハッシュ化を複合するプログラムであるためかと）
    const isMatch = await bcrypt.compare(password, user.password);


    //if(password != user.password){
    if(!isMatch){
        return res.status(400).json([
            {
                message:"パスワードが異なります"
                
            }
        ]);
    }

    const token = await JWT.sign({
        email,
     },
     "SECRET_KEY",
     {
        expiresIn:"24h",
     }
    );

    return res.json({
        token: token,
        id: "OK",
    });
});

//DBのユーザを確認するAPI
router.get("/allUsers", (req, res) => {
    return res.json(User);
});

module.exports = router;