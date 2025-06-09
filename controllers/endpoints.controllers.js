const { fetchEndpoints } = require("../models/endpoints.models");

const getEndpoints = (request, response) => {
  return fetchEndpoints().then((endpoints) => {
    response.status(200).send({ endpoints });
  });
};

module.exports = { getEndpoints };
