// Import Mongoose library
const mongoose= require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb+srv://21it3038:2EPb5K9LTpQSH865@cluster0.b8vudo6.mongodb.net/todo')


// Define schema for the 'todo' collection
const todoSchema= mongoose.Schema({
    title: String,
    description: String,
    Completed: Boolean
})


// Create Mongoose model based on the schema
const todo= mongoose.model('todo', todoSchema);

// Export the 'todo' model to be used in other parts of the application
module.exports= {
    todo
}