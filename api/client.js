
//Promise化するため
const { promisify } = require("util");
const config = require('./mysqlConnection/config');
const mysql = require("mysql2");

console.log(config);

const con = mysql.createConnection({
  host: config.HOST,
  //port: config.PORT,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE
});

//const con = mysql.createConnection(config.serverConf);
//Promise化してasync/awaitを使う
const Client = {
  connect: promisify(con.connect).bind(conf),
  query: promisify(con.query).bind(conf),
  end: promisify(con.end).bind(conf)
};

module.exports = {
  Client,
};