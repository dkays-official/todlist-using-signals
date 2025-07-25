const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller.js');

// Create a new ToDo`   
router.post('/todos', todoController.createToDo);

// Get all ToDos
router.get('/todos', todoController.getAllToDos);

// Update a Todo
router.put('/todos', todoController.updateToDo);

// Delete a ToDo
router.delete('/todos/:id', todoController.deleteToDo);

module.exports = router;