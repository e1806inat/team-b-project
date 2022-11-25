const { poolQuery } = require('./pool.js');
//const config = require("./mysqlConnection/config");
const Transaction = require("./transaction.js");

//引数にクエリとバインド用valuesを取れるようにして、結果を受け取る
const executeQuery = async (query, values) => {
    const results = await poolQuery(query, values);
    return results;
}
//トランザクションを開始
const beginTran = async () => {
    const  tran = new Transaction();
    await tran.begin();
    return tran;
}

module.exports = {
    executeQuery,
    beginTran
};