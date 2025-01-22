const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.post('/task', taskController.createTask);
router.get("/tasks", taskController.getAllTasks);
// router.get('task/:id', taskController.getTaskById);
router.get("task/:id", taskController.updateTask);
router.get("task/:id", taskController.deleteTask);

module.exports = router;


