const express = require("express")
const app = express()
const { getEndpoints } = require("./controllers/endpoints.controllers")

app.get("/api", getEndpoints)

module.exports = app