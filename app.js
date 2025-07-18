const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { getEndpoints } = require("./controllers/endpoints.controllers");
const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticles,
  getArticleById,
  patchArticleVotes,
} = require("./controllers/articles.controllers");
const { getUsers } = require("./controllers/users.controllers");
const {
  handlePSQLErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors");
const {
  getCommentsByArticleId,
  postComment,
  deleteComment,
} = require("./controllers/comments.controllers");

app.use(cors());
app.use(express.json());
app.use(express.static("public"))
app.get("/api", (request, response) => {
  response.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/api/endpoints", getEndpoints)
app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticleVotes);

app.delete("/api/comments/:comment_id", deleteComment);

app.use(handlePSQLErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
