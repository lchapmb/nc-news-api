# Northcoders News API

## Background

This is a news API which accesses application data programmatically. The database uses PSQL, as well as [Knex](https://knexjs.org).

## Setup

Instructions for setting up the backend:

Either clone the repo from https://github.com/lchapmb/be-nc-news, or download and extract.

Use your console to install all necessary dependancies with:

```
npm i
```

To run the server locally run the following command in your console and navigate to the page on your local machine using your browser. By default this will be http://localhost:9090/api

```
npm start
```

---

## Available Endpoints

You can view a JSON object of the all the available endpoints and methods at https://nc-news-today.herokuapp.com/api

---

```http
GET /api/topics

GET /api/users/:username

DELETE /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

GET /api/articles
POST /api/articles

DELETE /api/comments/:comment_id

GET /api

```

## Planned Endpoints

PATCH /api/comments/:comment_id

DELETE /api/articles/:article_id

POST /api/topics

POST /api/users

GET /api/users

---

## Links

Hosted version on Heroku: https://nc-news-today.herokuapp.com/api

GitHub repo: https://github.com/lchapmb/be-nc-news
