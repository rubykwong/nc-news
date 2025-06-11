const db = require("../db/connection");

const fetchUsers = () => {
  return db
    .query(`SELECT username, name, avatar_url FROM users`)
    .then(({ rows }) => {
      return rows;
    });
};

const checkUserExists = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "bad request" });
      }
    });
};
module.exports = { fetchUsers, checkUserExists };
