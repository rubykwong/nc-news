jest.setTimeout(15000)
const db = require("../db/connection");
const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */
const data = require("../db/data/test-data/index")
const request = require("supertest")
const seed = require("../db/seeds/seed")
const app = require("../app")
/* Set up your beforeEach & afterAll functions here */
beforeEach(() => {
  return seed(data)
})

afterAll(() => {
  return db.end()
})

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: responds with an array of all topics", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({ body }) => {
      const topics = body.topics
      expect(topics.length).not.toBe(0)
      topics.forEach((topic) => {
        expect(typeof topic.slug).toBe("string")
        expect(typeof topic.description).toBe("string")
      })
    })
  })
})

describe("GET /api/articles", () => {
  test("200: responds with an object with articles key and value of an array of article objects", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({body}) => {
      const articles = body.articles
      expect(articles.length).not.toBe(0)
      articles.forEach((article) => {
        expect(typeof article.author).toBe("string")
        expect(typeof article.title).toBe("string")
        expect(typeof article.article_id).toBe("number")
        expect(typeof article.topic).toBe("string")
        expect(typeof article.created_at).toBe("string")
        expect(typeof article.votes).toBe("number")
        expect(typeof article.article_img_url).toBe("string")
        expect(typeof article.comment_count).toBe("number")
      })
    })
  })
    test("200: articles are sorted by date in descending order", () => {
      return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({body}) => {
        const dates = body.articles.map((article) => new Date(article.created_at))
        const sortedDates = [...dates].sort((a, b) => b - a)
        expect(dates).toEqual(sortedDates)
      })
      })
  test("200: article objects do not have a body property", () => {
      return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({body}) => {
        body.articles.forEach((article) => {
          expect(article).not.toHaveProperty("body")
        })
      })
    })
  })