// Import necessary dependencies from React and external libraries
import { useEffect, useState } from 'react';          // For managing state and performing side effects
import { Createtodo } from './components/Createtodo'; // Import the Createtodo component
import { Showtodo } from './components/Showtodo';     // Import the Showtodo component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // For routing
import axios from 'axios';                            // For making HTTP requests

// Define the App component
function App() {
  // Define state to store todo items
  const [todos, setTodos] = useState([]);

  // Fetch todo items from the server when the component mounts or when todos state changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a GET request to fetch todo items from the server
        const response = await axios.get('http://localhost:3000/todos');
        // Update the todos state with the fetched data
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); // Call the fetchData function
  }, [todos]); // Add todos to the dependency array to trigger re-fetching when todos state changes

  // Function to handle deletion of a todo item
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to delete the todo with the specified ID
      await axios.delete(`http://localhost:3000/todo/${id}`);
      // Update the todos state to remove the deleted todo
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Function to handle marking a todo item as completed
  const handleComp = async (id) => {
    try {
      // Send a PATCH request to update the completed field of the todo with the specified ID
      await axios.patch(`http://localhost:3000/completed/${id}`); // Assuming setting completed to true
      // Update the todos state to reflect the updated todo
      setTodos(todos.map(todo => {
        if (todo._id === id) {
          return { ...todo, Completed: !Completed }; // Toggle the Completed field
        } else {
          return todo;
        }
      }));
    } catch (error) {
      console.error('Error updating completed todo:', error);
    }
  };
  
  // Render the App component
  return (
    <>
      {/* Router component to manage navigation */}
      <Router >
        {/* Routes component to define application routes */}
        <Routes>
          {/* Route for creating a new todo */}
          <Route path='/' element={<Createtodo />} />
          {/* Route for showing all todo items */}
          <Route path='/show' element={<Showtodo todos={todos} onDelete={handleDelete} onComp={handleComp} />} />
        </Routes>
      </Router>
    </>
  );
}

// Export the App component as the default export
export default App;
