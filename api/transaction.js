const pool = require("./pool.js");

const Transaction = class {
    constructor(connection) {
      this.connection = connection;
    }
    async begin() {
        if (this.connection) {
        this.connection.release();
      }
      this.connection = await pool.getConnection();
      this.connection.beginTransaction();
    }
    async query(query, values, options = {}) {
      options = {
        fields: options.fields || false
      };
      return new Promise((resolve, reject) => {
        this.connection.query(query, values, (err, results, fields) => {
            if (!err) {
            resolve(!options.fields ? results : { results, fields });
          } else {
            reject(err);
          }
        });
      });
    }
    async commit() {
      return new Promise((resolve, reject) => {
          this.connection.commit((err) => {
          if (!err) {
            this.connection.release();
            this.connection = null;
            resolve();
          } else {
            reject(err);
          }
        });
      });
    }
    async rollback() {
      return new Promise((resolve) => {
          this.connection.rollback(() => {
          this.connection.release();
          this.connection = null;
          resolve();
        });
      });
    }
  };
  
  module.exports = Transaction;
  