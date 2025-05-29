const db = require("../connection")
const {dropTables, createTables} = require("./manage-tables")
const format = require("pg-format")
const {convertTimestampToDate, referenceTopicsSlug, referenceUsersUsername} = require("./utils")


const seed = ({ topicData, userData, articleData, commentData }) => {
  return dropTables()
  .then(() => {
    return createTables()
  }).then(() => {
    const formattedTopicsValues = topicData.map(({slug, description, img_url}) => {
      return [slug, description, img_url]
    })
    const topicsInsertStr = format(`INSERT INTO topics(slug, description, img_url) VALUES %L`, formattedTopicsValues)
    return db.query(topicsInsertStr); 
  }).then(() =>{
    const formattedUsersValue = userData.map(({username, name, avatar_url}) => {
      return [username, name, avatar_url]
    })
    const usersInsertStr = format(`INSERT INTO users(username, name, avatar_url) VALUES %L`, formattedUsersValue)
    return db.query(usersInsertStr)
  })
  // .then(() => {
  //   const formattedArticlesValue = articleData.map((article) => {
  //     return [convertTimestampToDate(article)]
  //   })
    //   return [title, referenceTopicsSlug(topic), referenceUsersUsername(author), body,convertTimestampToDate(created_at), votes, article_img_url]
    // })
    // const formattedArticlesValue = articleData.map(({title, topic, author, body, created_at, votes, article_img_url}) => {
    //   return [title, referenceTopicsSlug(topic), referenceUsersUsername(author), body,convertTimestampToDate(created_at), votes, article_img_url]
  //   // })
  //   const articlesInsertStr = format(`INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L`, formattedArticlesValue)
  //   return db.query(articlesInsertStr)
  // })
  
};
module.exports = seed;
