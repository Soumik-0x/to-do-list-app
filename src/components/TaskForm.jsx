import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
    dueDate: '',
    dueTime: '',
    category: 'General',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title) {
      addTask(task);
      setTask({
        title: '',
        description: '',
        priority: 'Low',
        dueDate: '',
        dueTime: '',
        category: 'General',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Task Description"
      ></textarea>
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />
      <input
        type="time"
        name="dueTime"
        value={task.dueTime}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        value={task.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
