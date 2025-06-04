const {fetchTopics} = require("../models/topics.models")

const getTopics = (request, response)  => {
    return fetchTopics().then((rows) => {
        response.status(200).send({topics: rows})
    })
}

module.exports = { getTopics }