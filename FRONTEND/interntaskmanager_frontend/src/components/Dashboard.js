import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      let res = await axios.get('http://127.0.0.1:8000/api/data/Tasks/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      let data = res.data;
      if (filter) {
        data = data.filter(t => t.status.toLowerCase() === filter.toLowerCase());
      }
      setTasks(data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to load tasks!");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/data/Tasks/${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchTasks(); // refresh list
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to delete task!");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <select className="form-control mb-2" onChange={e => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      <ul className="list-group">
        {tasks.map(task => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
            {task.task_name} - {task.status}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
