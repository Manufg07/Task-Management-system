import React, { useState } from 'react'

const AddTask = () => {
    const [title, settitle] = useState('');
    const [description, setTaskDescription] = useState('');
    const [date, setDate] = useState('');
    const [status,setTaskStatus]=useState('');
    const [priority,setTaskPriority]=useState('');

    const submitForm = (e) => {
        e.preventDefault();
        const TaskDetails = {
            title: title,
            description: description,
            date: date,
            status:status,
            priority:priority
        };
        addTaskasync(TaskDetails);
    };
    const addTaskasync = async (TaskDetails) => {
        const response = await fetch("/API/api/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(TaskDetails),
        });
        if (response.ok) {
            const data = await response.json();
            alert('Task Added Successfully');
            console.log(data);
        } else {
            alert('Failed to add task');
            console.error('Failed to add task', response.statusText);
        }
    }

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6">Add Task</h2>
            <form onSubmit={submitForm} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Task Name</label>
                    <input
                        type="text"
                        onChange={(e) => settitle(e.target.value)}
                        name="title"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Task Description</label>
                    <textarea
                        name="description"
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        onChange={(e) => setTaskStatus(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Task Deadline</label>
                    <input
                        type="date"
                        name="taskdeadline"
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                        name="priority"
                        onChange={(e) => setTaskPriority(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    </div>
);
}

export default AddTask