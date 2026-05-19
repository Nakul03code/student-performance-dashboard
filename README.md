# Student Performance Dashboard

A full-stack web application built using NestJS, MongoDB, HTML, CSS, and JavaScript.

## Features

- Add student records
- Update student marks
- Delete students
- Dynamic graph plotting using Chart.js
- MongoDB database integration
- Backend CRUD APIs using NestJS

## Tech Stack

### Backend
- NestJS
- Node.js
- MongoDB
- Mongoose

### Frontend
- HTML
- CSS
- JavaScript
- Chart.js

## CRUD APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /students | Create student |
| GET | /students | Fetch all students |
| PUT | /students/:id | Update student |
| DELETE | /students/:id | Delete student |

## How To Run

### Backend

```bash
npm install
npm run start
```

### Frontend

Open:
```txt
frontend/index.html
```

## Database

MongoDB local connection:

```txt
mongodb://localhost:27017/studentdb
```

