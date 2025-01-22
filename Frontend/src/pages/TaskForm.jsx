import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ taskId, onSave }) => {
    const [task, setTask] = useState({ title: '', description: '' });

    useEffect(() => {
        if (taskId) {
            // Fetch the task details if taskId is provided (edit mode)
            axios.get(`/api/tasks/${taskId}`)
                .then(response => {
                    setTask(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the task!', error);
                });
        }
    }, [taskId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskId) {
            // Update the task if taskId is provided
            axios.put(`/api/tasks/${taskId}`, task)
                .then(response => {
                    onSave(response.data);
                })
                .catch(error => {
                    console.error('There was an error updating the task!', error);
                });
        } else {
            // Create a new task
            axios.post('/api/tasks', task)
                .then(response => {
                    onSave(response.data);
                })
                .catch(error => {
                    console.error('There was an error creating the task!', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                {taskId ? 'Update' : 'Create'} Task
            </button>
        </form>
    );
};

export default TaskForm;