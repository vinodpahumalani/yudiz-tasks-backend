# Yudiz Task-1 Backend and Task-2

Simple Backend using Express.

Following environment variables are required in `.env` file should stay in project root folder.

```
MONGO_URL
MONGO_DB_NAME
JWT_SECRET
JWT_EXPIRE_TIME

```

## Frontend Link: https://github.com/vinodpahumalani/yudiz-task-1-frontend

## Available Scripts

In the project directory, you can run:

### `npm install`

### `npm start` - Start server (uses nodemon)

## Task-2 - (Time to complete 1 hour 30 min 5:30PM - 7:00PM)

- It's logic is available in file `/public/script.js`.
- You can run in by calling API `GET http://localhost:3000/task-2/index.html`.

## Make sure to run it on localhost:3000 to avoid any complications with frontend.

## Task-1 - (Time to complete 8 hour with frontend)

## Folowing are the APIs

### Register User

```
POST http://localhost:3000/users HTTP/1.1
Headers:
Content-Type: application/json

Body:
{
    "mobile":"9856589562",
    "email":"jasonderulo@gmail.com",
    "password":"jason@123"
}
```

### Get User

```
GET http://localhost:3000/users/me HTTP/1.1

Headers:
Content-Type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTk4MjU5NGFlYjE1MjkxODI3NzMyZCIsImlhdCI6MTYyMDY3MzEzOCwiZXhwIjoxNjIwNzU5NTM4fQ.i7bLyLQEPHp61s4YDQ539o_Mmgnth1y0rrzXqywbxGc
```

### Login User

```
POST http://localhost:3000/users/login HTTP/1.1

Headers:
Content-Type: application/json

Body:
{
    "mobile":"9856589562",
    "password":"jason@123"
}
```
