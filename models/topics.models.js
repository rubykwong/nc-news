const db = require("../db/connection")
const fetchTopics = () => {
    return db.query(`SELECT * FROM topics`).then(({rows}) => {
        return rows
    })
}

const checkTopicExists = (topic) => {
    return db.query(`SELECT * FROM topics WHERE slug = $1`, [topic])
    .then(({rows}) => {
        if (!rows.length) {
            return Promise.reject({status: 404, msg: 'not found'});
        }
    });
};
module.exports = {fetchTopics, checkTopicExists}