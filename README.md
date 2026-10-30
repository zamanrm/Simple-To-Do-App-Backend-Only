# Simple To-Do App (Backend)

A REST API for creating and managing to-do tasks. It is built with Node.js, Express, MongoDB, and Mongoose. This project provides a backend only; it does not include a frontend.

Each todo has:

- `title` — required, non-empty string
- `description` — string, defaults to an empty string
- `completed` — boolean, defaults to `false`

## Requirements

- Node.js 18 or later
- npm
- MongoDB running locally, or a MongoDB Atlas connection URI

## Setup and run

Open a terminal in the project directory and install dependencies:

```powershell
npm install
```

Create a local environment file from the example:

```powershell
Copy-Item .env.example .env
```

The default `.env` values connect to a local MongoDB server at `127.0.0.1:27017` and use the `simple_todo_app` database. Make sure MongoDB is running. For MongoDB Atlas, edit `.env` and set `MONGODB_URI` to your Atlas connection URI:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/simple_todo_app
```

Start the API:

```powershell
npm start
```

For development with automatic restarts:

```powershell
npm run dev
```

When startup succeeds, the terminal reports that it connected to MongoDB and the API is running at `http://localhost:3000`. Open that URL to see the API status response. Keep the terminal open while using the API.

## API endpoints

All endpoints use the base URL `http://localhost:3000`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Check that the API is running |
| `POST` | `/todos` | Create a todo |
| `GET` | `/todos` | Get all todos |
| `GET` | `/todos/:id` | Get one todo by its MongoDB ID |
| `PUT` | `/todos/:id` | Update one or more todo fields |
| `DELETE` | `/todos/:id` | Delete a todo |

### Create a todo

Send a `POST` request to `http://localhost:3000/todos` with `Content-Type: application/json`:

```json
{
  "title": "Read a book",
  "description": "Read one chapter",
  "completed": false
}
```

`title` is required. `description` and `completed` are optional. A successful create returns `201 Created` and the saved todo, including its MongoDB `_id`.

### Update a todo

Use the `_id` returned when creating the todo. Send a `PUT` request to `http://localhost:3000/todos/TODO_ID` with one or more fields:

```json
{
  "completed": true
}
```

### Example requests

Replace `TODO_ID` with a todo's `_id`:

```text
GET    http://localhost:3000/todos
GET    http://localhost:3000/todos/TODO_ID
PUT    http://localhost:3000/todos/TODO_ID
DELETE http://localhost:3000/todos/TODO_ID
```

Responses are JSON. Invalid request data returns `400 Bad Request`; a todo that does not exist returns `404 Not Found`.

## Test with Postman

Import `postman/Simple-To-Do-App.postman_collection.json` into Postman. With the server running, send **Create todo** first; it saves the new todo's ID in the collection variable. Then send the other requests to list, retrieve, update, and delete todos. The Postman collection is optional and is not required to run the API.
