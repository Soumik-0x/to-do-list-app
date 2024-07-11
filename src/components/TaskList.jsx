import React, { useEffect, useState } from 'react';

const calculateTimeLeft = (dueDate, dueTime) => {
  const due = new Date(`${dueDate}T${dueTime}`);
  const now = new Date();
  const difference = due - now;

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const TaskList = ({ tasks, deleteTask, editTask }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timers = tasks.map((task, index) =>
      setInterval(() => {
        setTimeLeft((prev) => ({
          ...prev,
          [index]: calculateTimeLeft(task.dueDate, task.dueTime),
        }));
      }, 1000)
    );

    return () => timers.forEach(clearInterval);
  }, [tasks]);

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div key={index} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Due Time: {task.dueTime}</p>
          <p>Category: {task.category}</p>
          <div>
            {timeLeft[index] ? (
              <p>
                Time Left: {timeLeft[index].hours}h {timeLeft[index].minutes}m {timeLeft[index].seconds}s
              </p>
            ) : (
              <p>Time's up!</p>
            )}
          </div>
          <button onClick={() => deleteTask(index)}>Delete</button>
          <button onClick={() => editTask(index)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
