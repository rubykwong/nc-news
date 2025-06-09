const fs = require("fs/promises");

const fetchEndpoints = () => {
  const filePath = `${__dirname}/../endpoints.json`;
  return fs.readFile(filePath, "utf-8").then((data) => {
    return JSON.parse(data);
  });
};

module.exports = { fetchEndpoints };
