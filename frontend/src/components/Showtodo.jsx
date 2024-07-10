import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './show.css'; // Import CSS file for styling

export function Showtodo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://backend-todo-nqal.onrender.com/tasks");
      setTodos(response.data.tasks);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-todo-nqal.onrender.com/tasks/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      alert("Delete Successfully")
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      // Implement your update logic here
      
      console.log("Updating todo with ID:", id);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format date as "MM/DD/YYYY"
  };

  return (
    <div>

<div className="b">
  <div>
<nav className="nav">Todos</nav></div>
<div>
<Link to="/create">
        
<button type="button" className="bttn">
  <span className="button__text">Add TODO</span>
  <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
</button>
      </Link>
      </div>
      </div>
    <div className="crt">
      <div>
      
      {todos.map((todo) => (
        <div key={todo._id} className="createtodocard">
          <h2 className="label">Title: {todo.title}</h2>
          <h3 className="label">Description: {todo.description}</h3>
          <p className="label">Status: {todo.status}</p>
          <p className="label">Due Date: {formatDate(todo.dueDate)}</p>
          <button className="button" onClick={() => handleDelete(todo._id)}><span className="button-content">Delete</span></button>
          <Link to={`/update/${todo._id}`}>
          <button className="button" onClick={() => handleUpdate(todo._id)}><span className="button-content">Update</span></button>
      </Link>
          
        </div>
      ))}
      </div>
    </div>
    </div>
  );
}
