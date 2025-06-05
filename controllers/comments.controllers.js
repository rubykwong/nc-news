const { fetchCommentsByArticleId } = require("../models/comments.models")
const { checkArticleExists } = require("../models/articles.models")

const getCommentsByArticleId = (request, response, next) => {
    const {article_id} = request.params;
    Promise.all([
        checkArticleExists(article_id),
        fetchCommentsByArticleId(article_id)
    ])
    .then(([, rows]) => {
        response.status(200).send({comments: rows})
    }).catch((err) => {
        next(err)
    })
}

module.exports = { getCommentsByArticleId }