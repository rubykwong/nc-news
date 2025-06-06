const db = require("../db/connection")

const fetchCommentsByArticleId = (article_id) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [article_id])
    .then(({rows}) => {
        return rows
    })
}

const insertComment = (article_id, username, body) => {
    if (!username || !body || !username.length || !body.length) {
        return Promise.reject({status: 400, msg: 'bad request'})
    }
    return db.query(`INSERT INTO comments (article_id, body, author) VALUES ($1, $2, $3) RETURNING *`, [article_id, body, username])
    .then(({rows}) => {
        return rows[0]
    })
}

module.exports = {fetchCommentsByArticleId, insertComment}