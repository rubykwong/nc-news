const db = require("../db/connection")

const fetchUsers = () => {
    return db.query(`SELECT username, name, avatar_url FROM users`)
    .then(({rows}) => {
        return rows
    })
}

module.exports = { fetchUsers }