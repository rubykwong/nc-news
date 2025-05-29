const db = require("../connection")
const {dropTables, createTables} = require("./manage-tables")
const format = require("pg-format")



const seed = ({ topicData, userData, articleData, commentData }) => {
  return dropTables()
  .then(() => {
    return createTables()
  // }).then(() => {
  //   const formattedTopicsValues = topicData.map((topic) => {
  //     return [topic]
  //   })
  //   const topicsInsertStr = format(`INSERT INTO topics(slug, description, img_url) VALUES %L`, formattedTopicsValues)
  //   return db.query(topicsInsertStr); 
  })
  
};
module.exports = seed;
