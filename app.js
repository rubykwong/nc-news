const express = require("express")
const app = express()
const { getEndpoints } = require("./controllers/endpoints.controllers")
const {getTopics} = require("./controllers/topics.controllers")
const { getArticles } = require("./controllers/articles.controllers")
const { getUsers } = require("./controllers/users.controllers")
app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

app.get("/api/articles", getArticles)

app.get("/api/users", getUsers)

module.exports = app