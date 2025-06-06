const { fetchCommentsByArticleId, insertComment } = require("../models/comments.models")
const { checkArticleExists } = require("../models/articles.models")
const { checkUserExists } = require("../models/users.models")

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

const postComment = (request, response, next) => {
    const { username, body } = request.body
    const {article_id} = request.params
    Promise.all([
        checkArticleExists(article_id),
        checkUserExists(username),
        insertComment(article_id, username, body)
    ])
    .then(([, , insertedComment]) => {
        response.status(201).send({comment: insertedComment})
    }).catch((err) => {
        next(err)
    })
}
module.exports = { getCommentsByArticleId, postComment }