jest.setTimeout(15000);
const db = require("../db/connection");
const endpointsJson = require("../endpoints.json");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const app = require("../app");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  test("200: responds with an array of all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const topics = body.topics;
        expect(topics.length).not.toBe(0);
        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("GET /api/articles", () => {
  test("200: responds with an object with articles key and value of an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles.length).not.toBe(0);
        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
        });
      });
  });
  test("200: articles are sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const dates = body.articles.map(
          (article) => new Date(article.created_at)
        );
        const sortedDates = [...dates].sort((a, b) => b - a);
        expect(dates).toEqual(sortedDates);
      });
  });
  test("200: article objects do not have a body property", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((article) => {
          expect(article).not.toHaveProperty("body");
        });
      });
  });
});

describe("GET /api/users", () => {
  test("200: responds with an object with key of users and value of an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const users = body.users;
        expect(users.length).not.toBe(0);
        users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});

describe("GET api/articles/:article_id", () => {
  test("200: responds with a specified article object", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        const article = body.article;
        expect(typeof article.author).toBe("string");
        expect(typeof article.title).toBe("string");
        expect(article.article_id).toBe(3);
        expect(typeof article.body).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
        expect(typeof article.article_img_url).toBe("string");
        expect(typeof article.comment_count).toBe("number");
      });
  });
  test("404: returns an error message if request is to a non-existing endpoint", () => {
    return request(app)
      .get("/api/articles/200000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: returns an error message if an invalid request is made", () => {
    return request(app)
      .get("/api/articles/notAnArticle")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});

describe("GET api/articles/:article_id/comments", () => {
  test("200: responds with an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(comment.article_id).toBe(1);
        });
      });
  });
  test("404: returns an error message if request is to a non-existing endpoint", () => {
    return request(app)
      .get("/api/articles/200000/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: returns an error message if an invalid request is made", () => {
    return request(app)
      .get("/api/articles/notAnArticle/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});

describe("POST /api/articles/:articleId/comments", () => {
  test("posts a comment to the specified article", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "butter_bridge", body: "testing" })
      .expect(201)
      .then(({ body }) => {
        const comment = body.comment;
        expect(typeof comment.author).toBe("string");
        expect(typeof comment.body).toBe("string");
      });
  });
  test("404: returns an error message if request is to a non-existing endpoint", () => {
    return request(app)
      .post("/api/articles/1000/comments")
      .send({ username: "butter_bridge", body: "testing" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: returns an error message if an invalid request is made", () => {
    return request(app)
      .post("/api/articles/stillNotAnArticle/comments")
      .send({ username: "butter_bridge", body: "testing" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("400: returns an error mesage if required fields are missing from the request", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "", body: "testing" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("400: returns an error message if username provided does not match an existing user", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "rubyk", body: "testing" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});

describe("PATCH /api/articles/:articleId", () => {
  test("200: updates the number of votes on a specified article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -10 })
      .expect(200)
      .then(({ body }) => {
        const article = body.article;
        expect(typeof article.author).toBe("string");
        expect(typeof article.title).toBe("string");
        expect(article.article_id).toBe(1);
        expect(typeof article.body).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.created_at).toBe("string");
        expect(article.votes).toBe(90);
        expect(typeof article.article_img_url).toBe("string");
      });
  });
  test("400: returns an error message if provided an invalid article_id", () => {
    return request(app)
      .patch("/api/articles/articleone")
      .send({ inc_votes: 1 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  test("404: returns an error message if a valid request is made to a non-existing endpoint", () => {
    return request(app)
      .patch("/api/articles/270")
      .send({ inc_votes: 1 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });

  test("400: returns an error message if provided an invalid newVote value", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "soManyVotes" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});

describe("DELETE /api/comments/comment_id", () => {
  test("204: deletes a specified comment", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test("404: returns an error message is a valid request is made to a non-existing comment endpoint", () => {
    return request(app)
      .delete("/api/comments/1000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: returns an error message if request is to an invalid comment endpoint", () => {
    return request(app)
      .delete("/api/comments/notActuallyAComment")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});

describe("GET /api/articles/?sort_by&order", () => {
  test("200: accepts a sort_by query which responds with all articles sorted by the provided column", () => {
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        const votes = articles.map((article) => article.votes);
        const sortedVotes = [...votes].sort((a, b) => b - a);
        expect(votes).toEqual(sortedVotes);
      });
  });
  test("200: articles are sorted in ascending or descending order, as specified by the order query", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=asc")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        const votes = articles.map((article) => article.votes);
        const sortedVotes = [...votes].sort((a, b) => a - b);
        expect(votes).toEqual(sortedVotes);
      });
  });
  test("200: articles are sorted in descending order if no order query parameter is provided", () => {
    return request(app)
      .get("/api/articles?sort_by=created_at")
      .expect(200)
      .then(({ body }) => {
        const dates = body.articles.map(
          (article) => new Date(article.created_at)
        );
        const sortedDates = [...dates].sort((a, b) => b - a);
        expect(dates).toEqual(sortedDates);
      });
  });
  test("200: articles are sorted in descending order and by created_at if no query parameters are provided", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        const dates = body.articles.map(
          (article) => new Date(article.created_at)
        );
        const sortedDates = [...dates].sort((a, b) => b - a);
        expect(dates).toEqual(sortedDates);
      });
  });
  test("400: returns an error message if an invalid query is made", () => {
    return request(app)
      .get("/api/articles?sort_by=onions")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
describe("GET /api/articles/?topic", () => {
  test("200: accepts a topic query which returns an array of all articles that match a specified topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles.length).not.toBe(0);
        articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
        });
      });
  });
  test("200: returns an empty array if there are no articles on a particular topic", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toEqual([]);
      });
  });
  test("404: returns an error message if the queried topic does not exist", () => {
    return request(app)
      .get("/api/articles?topic=arsenalfc")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
