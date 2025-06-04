const express = require("express")
const app = express()
const { getEndpoints } = require("./controllers/endpoints.controllers")
const {getTopics} = require("./controllers/topics.controllers")
app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

module.exports = app