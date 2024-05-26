

// Import the Zod library
const z = require('zod');

// Define schema for creating a todo
const createtodo = z.object({
    title: z.string(),        // Title must be a string
    description: z.string()   // Description must be a string
});

// Define schema for updating a todo
const updatetodo = z.object({
    id: z.string()            // ID must be a string
});

// Export the validation schemas
module.exports = {
    createtodo: createtodo,   // Export the createtodo schema
    updatetodo: updatetodo    // Export the updatetodo schema
};
