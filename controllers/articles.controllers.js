const { fetchArticles, fetchArticleById, updateArticleVotes, checkArticleExists } = require("../models/articles.models")
const { checkTopicExists } = require("../models/topics.models")

const getArticles = (request, response, next) => {
    const {sort_by, order, topic} = request.query
    const articlesPromise = topic ? Promise.all([checkTopicExists(topic), fetchArticles(sort_by, order, topic)])
    .then(([, articles]) => articles)
    : fetchArticles(sort_by, order)

    articlesPromise
    .then((articles) => {
            response.status(200).send({articles})
    }).catch((err) => {
        next (err)
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

const patchArticleVotes = (request, response, next) => {
    const {article_id} = request.params;
    const {inc_votes} = request.body
    Promise.all([
        checkArticleExists(article_id),
         updateArticleVotes(inc_votes, article_id)
    ])
    .then(([, patchedArticle]) => {
        response.status(200).send({article: patchedArticle})
    }).catch((err) => {
        next(err)
    })
}

module.exports = { getArticles, getArticleById, patchArticleVotes }