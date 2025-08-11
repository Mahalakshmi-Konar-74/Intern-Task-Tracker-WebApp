import { useState } from 'react';
import axios from 'axios';

export default function TaskForm({ fetchTasks }) {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('pending');

  const addTask = async () => {
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/data/Tasks/',
        {
          task_name: taskName,
          status: status
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      fetchTasks();
      setTaskName('');
      setStatus('pending');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to add task!');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/data/Tasks/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to delete task!');
    }
  };

  return (
    <div className="card p-3">
      <h5>Add Task</h5>
      <input
        className="form-control mb-2"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <select
        className="form-control mb-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button className="btn btn-primary" onClick={addTask}>
        Add
      </button>

    </div>
  );
}
