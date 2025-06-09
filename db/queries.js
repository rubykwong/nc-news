const db = require("./connection.js");

db.query(`SELECT * FROM users`).then((response) => {
  console.log(response.rows);
});
db.query(`SELECT * FROM articles WHERE articles.topic = 'coding'`).then(
  (response) => {
    console.log(response.rows);
  }
);
db.query(`SELECT * FROM comments WHERE comments.votes < 0`).then((response) => {
  console.log(response.rows);
});
db.query(`SELECT * FROM topics`).then((response) => {
  console.log(response.rows);
});
db.query(`SELECT * FROM articles WHERE articles.author = 'grumpy19'`).then(
  (response) => {
    console.log(response.rows);
  }
);
db.query(`SELECT * FROM comments WHERE comments.votes > 10`)
  .then((response) => {
    console.log(response.rows);
  })
  .finally(() => {
    db.end();
  });
