const express = require('express');
const axios = require('axios');
const router = express.Router();

let todos = [];
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Initialize todos from JSONPlaceholder
const initializeTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    todos = response.data;
  } catch (error) {
    console.error('Error initializing todos:', error);
  }
};

initializeTodos();

// GET all todos
router.get('/', async (req, res) => {
  res.json(todos);
});

// GET a single todo by ID
router.get('/:id', (req, res) => {
  const todo = todos.find(todo => todo.id === parseInt(req.params.id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send('Todo not found');
  }
});

// POST a new todo
router.post('/', (req, res) => {
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title: req.body.title,
    completed: req.body.completed
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT to update a todo
router.put('/:id', (req, res) => {
  const todo = todos.find(todo => todo.id === parseInt(req.params.id));
  if (todo) {
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    res.json(todo);
  } else {
    res.status(404).send('Todo not found');
  }
});

// DELETE a todo
router.delete('/:id', (req, res) => {
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted successfully' });
  } else {
    res.status(404).send('Todo not found');
  }
});

module.exports = router;


module.exports = router;
