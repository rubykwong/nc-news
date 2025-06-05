const { fetchArticles, fetchArticleById } = require("../models/articles.models")

const getArticles = (request, response) => {
    return fetchArticles()
        .then((articles) => {
            response.status(200).send({articles})
    })
}

const getArticleById = (request, response , next) => {
    const {article_id} = request.params;
    return fetchArticleById(article_id)
    .then((article) => {
        response.status(200).send({article: article});
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = { getArticles, getArticleById }