const db = require("../connection")
const {dropTables, createTables} = require("./manage-tables")
const format = require("pg-format")
const {convertTimestampToDate, createLookUpObj} = require("./utils")


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
  }) .then(() => {
    const timeStampedArticles = articleData.map(convertTimestampToDate)
     const formattedArticlesValue = timeStampedArticles.map(({title, topic, author, body, created_at, votes, article_img_url}) => {
    return [title, topic, author, body, created_at, votes, article_img_url]
     })
     const articlesInsertStr = format(`INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`, formattedArticlesValue)
     return db.query(articlesInsertStr)
   })
   .then(({rows}) => {
    const lookUpObj = createLookUpObj(rows, "title", "article_id")
    const timeStampedComments = commentData.map(convertTimestampToDate)
    const formattedCommentsValues = timeStampedComments.map(({article_title, body, votes, author, created_at}) => {
      return [lookUpObj[article_title], body, votes, author, created_at]
    })
    const commentsInsertStr = format(`INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L`, formattedCommentsValues)
    return db.query(commentsInsertStr)
   })
  
};
module.exports = seed;
