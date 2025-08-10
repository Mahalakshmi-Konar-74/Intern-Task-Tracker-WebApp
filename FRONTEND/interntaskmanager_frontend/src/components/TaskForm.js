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
      let res = await axios.get('http://127.0.0.1:8000/api/tasks/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      let data = res.data;
      if (filter) {
        data = data.filter(t => t.status === filter);
      }
      setTasks(data);
    } catch {
      alert("Failed to load tasks!");
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
          <li className="list-group-item" key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
