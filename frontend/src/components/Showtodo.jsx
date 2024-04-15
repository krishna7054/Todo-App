// Import necessary dependencies from React and external libraries
import React, { Component } from "react";
import { useState } from 'react';        // Import useState hook for managing state
import './todo.css';                     // Import CSS file for styling

// Define the Showtodo component
export function Showtodo({ todos, onDelete, onComp }) {
  // Define state to store updated todos
  const [updatedTodos, setUpdatedTodos] = useState(todos);

  // Function to handle deletion of a todo item
  const handleDelete = async (id) => {
    try {
      // Call the onDelete function passed from the parent component (App) to delete the todo item
      await onDelete(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Function to handle marking a todo item as completed
  const handleComp = async (id) => {
    try {
      // Call the onComp function passed from the parent component (App) to update the completed status of the todo item
      await onComp(id);
      // Update the todos state to reflect the updated todo
      setUpdatedTodos(updatedTodos.map(todo => {
        if (todo._id === id) {
          return { ...todo, Completed: true }; // Ensure 'Completed' matches the field name in your MongoDB schema
        }
        return todo;
      }));
    } catch (error) {
      console.error('Error updating completed:', error);
    }
  };

  // Render the Showtodo component
  return (
    <div>
      <button><a href="/">back</a></button> {/* Button to navigate back */}
      {/* Map over the todos array and render each todo item */}
      {todos && todos.map((todo) => {
        return (
          <div className={"createtodocard"} key={todo._id}>
            {/* Display the title of the todo item */}
            <h2 className={"label"}>Title:{todo.title}</h2>
            <hr color="black"></hr>
            {/* Display the description of the todo item */}
            <h3 className={"label"} >description:{todo.description}</h3>
            <hr color="black"></hr>
            {/* Button to mark a todo item as completed */}
            <button onClick={() => handleComp(todo._id)}>
              {todo.Completed ? "Completed" : "Mark as Completed"}
            </button>
            {/* Button to delete a todo item */}
            <button onClick={() => handleDelete(todo._id)}>Delete Todo</button>
          </div>
        );
      })}
    </div>
  );
}
