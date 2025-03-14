// Import Mongoose library
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('YOUR MONGODB URL');

// Define schema for the 'tasks' collection
const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    dueDate: Date
});

// Create Mongoose model based on the schema
const task = mongoose.model('task', taskSchema);

// Export the 'task' model to be used in other parts of the application
module.exports = {
    task
};
