// Import required modules
const express = require('express');
const { createtodo, updatetodo } = require('./test'); // Assuming these are functions for validation or processing
const { task } = require('./db'); // Importing the task model from './db'
const cors = require('cors');

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware for enabling CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Endpoint to handle POST requests for creating a new task item
app.post('/tasks', async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        // Create a new task document using data from the request body
        const newTask = new task({
            title,
            description,
            status: status || 'pending',
            dueDate: dueDate ? new Date(dueDate) : undefined
        });

        // Save the new task document to the database
        await newTask.save();

        // Send a success response with the created task
        res.status(201).json({ msg: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ msg: 'Error creating task' });
    }
});

// Endpoint to handle GET requests for retrieving all task items
app.get('/tasks', async (req, res) => {
    try {
        // Find all task items in the database
        const tasks = await task.find({});
        // Send the task items as a response
        res.json({ tasks });
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ msg: 'Error retrieving tasks' });
    }
});

// Endpoint to handle GET requests for retrieving a task by its ID
app.get('/tasks/:id', async (req, res) => {
    try {
        // Extract the task ID from the request parameters
        const taskId = req.params.id;
        
        // Find the task item by ID
        const foundTask = await task.findById(taskId);

        // If task item is not found, return 404
        if (!foundTask) {
            return res.status(404).json({ msg: 'Task item not found' });
        }

        // Send the task item as a response
        res.json({ task: foundTask });
    } catch (error) {
        console.error('Error retrieving task:', error);
        res.status(500).json({ msg: 'Error retrieving task' });
    }
});


// Endpoint to handle PUT requests for updating a task item by ID
app.put('/tasks/:id', async (req, res) => {
    try {
        // Extract the task ID from the request parameters
        const taskId = req.params.id;
        
        // Find the task item by ID
        const foundTask = await task.findById(taskId);

        // If task item is not found, return 404
        if (!foundTask) {
            return res.status(404).json({ msg: 'Task item not found' });
        }

        // Update the task item with data from the request body
        foundTask.title = req.body.title || foundTask.title;
        foundTask.description = req.body.description || foundTask.description;
        foundTask.status = req.body.status || foundTask.status;
        foundTask.dueDate = req.body.dueDate ? new Date(req.body.dueDate) : foundTask.dueDate;

        // Save the changes to the database
        await foundTask.save();

        // Send a success response
        res.status(200).json({ msg: 'Task updated successfully', task: foundTask });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ msg: 'Error updating task' });
    }
});

// Endpoint to handle DELETE requests for deleting a task item by ID
app.delete('/tasks/:id', async (req, res) => {
    try {
        // Extract the task ID from the request parameters
        const taskId = req.params.id;
        
        // Find and delete the task item by ID
        await task.findByIdAndDelete(taskId);

        // Send a success response
        res.json({ msg: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ msg: 'Error deleting task' });
    }
});

// Start the Express server listening on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
