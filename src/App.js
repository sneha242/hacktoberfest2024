import React, { useState, useEffect } from 'react';
import './App.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage when the app loads
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      const newTaskObj = { name: newTask, completed: false };  // Task object with completion status
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    } else {
      alert('Task cannot be empty!');
    }
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  // Toggle task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => toggleTaskCompletion(index)}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            {task.name}
            <button onClick={(e) => {
              e.stopPropagation();
              deleteTask(index);
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
