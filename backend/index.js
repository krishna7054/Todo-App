// Import required modules
const express = require('express');
const { createtodo, updatetodo } = require('./test'); // Assuming these are functions for validation or processing
const { todo } = require('./db'); // Importing the todo model from './db'
const cors = require('cors');

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware for enabling CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Endpoint to handle POST requests for creating a new todo item
app.post('/todo', async (req, res) => {
    // Parse input data using 'createtodo' function (assuming it performs some validation)
    const inputs = req.body;
    const finalinputs = createtodo.safeParse(inputs);

    // If input validation fails, return an error response
    if (!finalinputs.success) {
        return res.status(500).json({ msg: 'Wrong inputs' });
    }

    // Create a new todo document using data from the request body
    const data = new todo({
        title: req.body.title,
        description: req.body.description,
        completed: false
    });

    // Save the new todo document to the database
    await data.save();

    // Send a success response
    res.json({ msg: 'Todo created successfully' });
});

// Endpoint to handle GET requests for retrieving all todo items
app.get('/todos', async (req, res) => {
    // Find all todo items in the database
    const todos = await todo.find({});
    // Send the todo items as a response
    res.send({ todos });
});

// Endpoint to handle PATCH requests for updating the 'completed' status of a todo item
app.patch('/completed/:id', async (req, res) => {
    try {
        // Extract the todo ID from the request parameters
        const todoId = req.params.id;
        
        // Find the todo item by ID
        const foundTodo = await todo.findById(todoId);

        // If todo item is not found, return 404
        if (!foundTodo) {
            return res.status(404).json({ msg: 'Todo item not found' });
        }

        // Toggle the 'completed' status of the todo item
        foundTodo.completed = !foundTodo.completed;

        // Save the changes to the database
        await foundTodo.save();

        // Send a success response
        res.status(200).json({ msg: 'Todo updated successfully', todo: foundTodo });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ msg: 'Error updating todo' });
    }
});

// Endpoint to handle DELETE requests for deleting a todo item by ID
app.delete('/todo/:id', async (req, res) => {
    try {
        // Extract the todo ID from the request parameters
        const todoId = req.params.id;
        
        // Find and delete the todo item by ID
        await todo.findByIdAndDelete(todoId);

        // Send a success response
        res.json({ msg: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ msg: 'Error deleting todo' });
    }
});

// Start the Express server listening on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
