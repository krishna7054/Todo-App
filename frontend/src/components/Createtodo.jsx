import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './todo.css'

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

export function Createtodo() {
  // Define state variables for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to create a new task
      await axios.post('http://localhost:3000/tasks', {
        title,
        description,
        status,
        dueDate,
      });

      // Reset form fields after successful submission
      setTitle('');
      setDescription('');
      setStatus('pending');
      setDueDate('');
      alert('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task. Please try again.');
    }
  };

  // Navigate to show todos
  const handleShowTodos = () => {
    navigate('/');
  };

  return (
    <div className='cart'>
      
        <form onSubmit={handleSubmit}>
          <div className='cart1'>
          <h1 className="heading">Create Todo</h1>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </select>
            <hr color="black" />
            <Input
              type="date"
              placeholder="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button className='button' type="submit"><span className='button-content'>Add Task</span></button>
          <button className='button' type="button" onClick={handleShowTodos}><span className='button-content'>Show Todos</span></button>
        </form>
      </div>
   
  );
}
