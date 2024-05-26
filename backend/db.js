// Import Mongoose library
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb+srv://21it3038:WDHbRTNejWX1uisv@cluster0.b8vudo6.mongodb.net/task');

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
