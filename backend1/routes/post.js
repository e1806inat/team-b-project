const router = require("express").Router();
const {publicPosts, privatePosts} = require("../db/Post");
//const checkJWT = require("../middleware/checkJWT");
const checkJWT = require("../middleware/checkJWT");

//誰でも見れる生地閲覧用のAPI
router.get("/public", (req, res) => {
    res.json(publicPosts);
});

//JWTを持っている人用の生地閲覧API
router.get("/private", checkJWT, (req, res) => {
    res.json(privatePosts);
});

module.exports = router;