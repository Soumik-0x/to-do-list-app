import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (currentTask === null) {
      setTasks([...tasks, task]);
    } else {
      const updatedTasks = tasks.map((t, index) =>
        index === currentTask ? task : t
      );
      setTasks(updatedTasks);
      setCurrentTask(null);
    }
  };

  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  const editTask = (index) => {
    setCurrentTask(index);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
      </div>
    </div>
  );
};

export default App;
