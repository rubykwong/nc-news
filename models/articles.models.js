const db = require("../db/connection")

const fetchArticles = () => {
    return db.query(`SELECT articles.title, articles.article_id, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;`).then(({rows}) => {
        return rows
    })
}

module.exports = { fetchArticles}