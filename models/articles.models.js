const db = require("../db/connection")
const format = require("pg-format")

const fetchArticles = (sort_by = "created_at", order = "desc", topic) => {
    const validSortBy = ["title", "article_id", "topic", "author", "created_at", "votes", "article_img_url", "comment_count"]
    const validOrder = ["asc", "desc"]
    const queryParams = []
    if (!validSortBy.includes(sort_by)) {
        return Promise.reject({status: 400, msg: "bad request"})
    }
    if (!validOrder.includes(order.toLowerCase())){
                return Promise.reject({status: 400, msg: "bad request"})
    }
    let queryString = `SELECT articles.title, articles.article_id, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id ` 

    if (topic){
        queryParams.push(topic)
        queryString += `WHERE articles.topic = $${queryParams.length} `
    }

    queryString += `GROUP BY articles.article_id ORDER BY ${sort_by} ${order.toUpperCase()}`
    
    return db.query(queryString, queryParams)
    .then(({rows}) => {
        return rows
    })
}

// const fetchArticles = (sort_by = "created_at", order = "desc") => {
//     const validSortBy = ["title", "article_id", "topic", "author", "created_at", "votes", "article_img_url", "comment_count"]
//     const validOrder = ["asc", "desc"]
//     if (!validSortBy.includes(sort_by)) {
//         return Promise.reject({status: 400, msg: "bad request"})
//     }
//     if (!validOrder.includes(order.toLowerCase())){
//                 return Promise.reject({status: 400, msg: "bad request"})
//     }
//     let queryString = `SELECT articles.title, articles.article_id, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY articles.${sort_by} ${order.toUpperCase()}`
    
//     return db.query(queryString)
//     .then(({rows}) => {
//         return rows
//     })
// }

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

const updateArticleVotes = (inc_votes, article_id) => {
    return db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`, [inc_votes, article_id])
    .then(({rows}) => {
        return rows[0]
    })
}

module.exports = { fetchArticles, fetchArticleById, checkArticleExists, updateArticleVotes }