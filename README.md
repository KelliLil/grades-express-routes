# Grades Express Routes

## Get Started

1. `npm i express`
1. Set up `"start": "node --watch app/index.js"` in `package.json`

## Routes

### GET /api/students

- Returns all students and all their grades

### GET /api/students/names

- Returns just the names of all students

Example: `[{name: "Mark West"}, {name: "John Doe"}]`, etc.

### GET /api/students/:id

- Returns a single student and all their grades

### POST /api/students

- Creates a new student (empty grades array)

### PUT /api/students/:id/grade

- Creates a new grade for a student

## Stretch Goals

- Add a `DELETE` route to delete a student
- Add a `DELETE` route to delete a grade
- Add a `PUT` route to update a grade
