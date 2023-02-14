const { promisify } = require("util");
const config = require('./mysqlConnection/config');
const mysql = require("mysql2");
//const config = require("./mysqlConnection/config");

//const cofObj = config.serverConf;
// const cofObj = {
//     host,
//     //port,
//     user,
//     password,
//     database
// }
// console.log('ddddddddddddddddddddddddd')
// console.log(HOST)
// console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa')
//Poolインスタンス
//const pool = mysql.createPool({ ...cofObj, connectionLimit: 10 });
// const pool = mysql.createPool({
//     host: "133.71.101.108",
//     user: "test_user",
//     password: "v2V!%Nwc",
//     database: "test_pbl",
// });
const pool = mysql.createPool({
  host: config.HOST,
  //port: config.PORT,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE
});
//pool.getConnectionプロミス化
const getConnection = promisify(pool.getConnection).bind(pool);
//pool.queryプロミス化
const poolQuery = promisify(pool.query).bind(pool)

module.exports = {
getConnection,
poolQuery
};