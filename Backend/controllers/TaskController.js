const Task = require('../models/Task');

// create new task 

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are required" });
    }

    const task = new Task({ title, description, status, priority });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


//get all tasks

exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}



// update task by id

exports.updateTask = async (req, res) => {
    try {
      const { title, description, status, priority } = req.body;
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { title, description, status, priority },
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      } else {
        res.status(200).json({ message: "Task updated successfully", task });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

// delete task by id

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
             if (!task) {
        return res.status(404).json({ message: "Task not found" });
      } else {
        res.status(200).json({ message: "Task deleted successfully", task });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

// get task by id

// exports.getTaskById = async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.id);
//         if (!task) {
//             return res.status(404).json({ message: "Task not found" });
//         }
//         res.status(200).json(task);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }