// Import necessary dependencies from React and external libraries
import { useState } from "react";         // For managing state in functional components
import axios from "axios";                 // For making HTTP requests
import { useNavigate } from "react-router-dom"; // For navigation in React Router
import './todo.css';                       // Import CSS file for styling

// Define the Createtodo component
export function Createtodo() {
    // Define state variables using the useState hook
    const [title, settitle] = useState('');           // State for todo title
    const [description, setdescription] = useState('');// State for todo description
    const navigate = useNavigate();                    // Hook for navigation

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        
        try {
            // Make a POST request to the backend to create a new todo
            await axios.post('http://localhost:3000/todo', {
                title: title,
                description: description
            });

            // Reset title and description fields after successful creation
            settitle('');
            setdescription('');

            // Show success message
            alert('Todo created successfully!');
        } catch (error) {
            // Log any errors that occur during todo creation
            console.log('Problem while creating a todo', error);
        }
    };

    // Function to handle navigation to show all todos
    const handleShowtodos = () => {
        navigate('/show'); // Navigate to the '/show' route
    }

    // Render the Createtodo component
    return (
        <>
            {/* Render the heading */}
            <h1 className={"heading"}>Create Todo</h1>
            {/* Render the form for creating a todo */}
            <div className={"createtodocard"}>
                <form onSubmit={handleSubmit}>
                    <div>
                        {/* Input field for entering todo title */}
                        <input className={"input"} placeholder="Title" type="text" name="title" value={title} onChange={(e) => settitle(e.target.value)} />
                        <hr color="black"></hr>
                        {/* Input field for entering todo description */}
                        <input className={"input"} placeholder="Description" type="text" name="description" value={description} onChange={(e) => setdescription(e.target.value)} />
                        <hr color="black"></hr>
                    </div>
                    {/* Button to submit the form */}
                    <button type="submit">Add Lists</button>
                    {/* Button to navigate to show all todos */}
                    <button onClick={handleShowtodos}> Show Todos</button>
                </form>
            </div>
        </>
    )
}
