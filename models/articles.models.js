const db = require("../db/connection")

const fetchArticles = () => {
    return db.query(`SELECT articles.title, articles.article_id, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;`).then(({rows}) => {
        return rows
    })
}

const fetchArticleById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
        if (!rows.length) {
            return Promise.reject({status: 404, msg: 'not found'});
        }
        const article = rows[0]
        return article
    })
}

const checkArticleExists = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
        if (!rows.length) {
            return Promise.reject({status: 404, msg: 'not found'});
        }
    });
};

module.exports = { fetchArticles, fetchArticleById, checkArticleExists }