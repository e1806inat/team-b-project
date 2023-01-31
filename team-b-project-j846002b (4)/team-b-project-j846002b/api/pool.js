const { promisify } = require("util");
const { host, user, password, database } = require('./mysqlConnection/config');
const mysql = require("mysql2");
//const config = require("./mysqlConnection/config");

//const cofObj = config.serverConf;
const cofObj = {
    host,
    //port,
    user,
    password,
    database
}

//Poolインスタンス
//const pool = mysql.createPool({ ...cofObj, connectionLimit: 10 });
const pool = mysql.createPool({
    host: "133.71.101.108",
    user: "test_user",
    password: "v2V!%Nwc",
    database: "test_pbl",
});
//pool.getConnectionプロミス化
const getConnection = promisify(pool.getConnection).bind(pool);
//pool.queryプロミス化
const poolQuery = promisify(pool.query).bind(pool)

module.exports = {
getConnection,
poolQuery
};