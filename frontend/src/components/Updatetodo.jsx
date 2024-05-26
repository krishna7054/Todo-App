import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './todo.css';

// Reusable Input component
const Input = ({ type, placeholder, value, onChange }) => (
  <>
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <hr color="black" />
  </>
);

export function Updatetodo() {
  const { id } = useParams(); // Access the todo ID from URL parameters
  const navigate = useNavigate(); 
  // State variables to store todo data and loading state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the todo data based on the ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/${id}`);
        const todo = response.data.task;
        // Update state with the fetched todo data
        setTitle(todo.title);
        setDescription(todo.description);
        setStatus(todo.status);
        if (todo.dueDate) {
            setDueDate(todo.dueDate.substring(0, 10)); // Extract date part only
          }
        setLoading(false);
      } catch (error) {
        setError("Error fetching todo. Please try again.");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]); // Fetch data whenever the ID changes

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the todo with the new data
      await axios.put(`http://localhost:3000/tasks/${id}`, {
        title,
        description,
        status,
        dueDate
      });
      // Optionally, perform any necessary actions after successful update
      alert("Todo Updated Successfully");
      console.log("Todo updated successfully!");
    } catch (error) {
      setError("Error updating todo. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Navigate to show todos
  const handleShowTodos = () => {
    navigate('/');
  };

  return (
    <div className="cart">
      <form onSubmit={handleSubmit}>
        <div className='cart1'>
        <h2 className="heading">Update Todo</h2>
        <Input placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <hr color="black" />
        <Input placeholder="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <button className="button" type="submit"><span className="button-content">Update</span></button>
        <button className='button' type="button" onClick={handleShowTodos}><span className='button-content'>Show Todos</span></button>
      </form>
    </div>
  );
};

export default Updatetodo;
