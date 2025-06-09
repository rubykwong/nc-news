const db = require("../connection");

exports.dropTables = () => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    });
};

exports.createTables = () => {
  return db
    .query(
      `CREATE TABLE topics(
        slug VARCHAR PRIMARY KEY,
        description VARCHAR (300),
        img_url VARCHAR(1000));`
    )
    .then(() => {
      return db.query(`CREATE TABLE users (
                username VARCHAR PRIMARY KEY,
                name VARCHAR(200),
                avatar_url VARCHAR(1000)
                );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
                article_id SERIAL PRIMARY KEY,
                title VARCHAR(300),
                topic VARCHAR REFERENCES topics(slug),
                author VARCHAR REFERENCES users(username),
                body TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                votes INTEGER DEFAULT 0,
                article_img_url VARCHAR(1000)
                );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments(
                comment_id SERIAL PRIMARY KEY,
                article_id INT REFERENCES articles(article_id),
                body TEXT,
                votes INTEGER DEFAULT 0,
                author VARCHAR REFERENCES users(username),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );`);
    });
};
