import { useState, useEffect } from 'react'
import AddTask from './AddTask.jsx'
import TaskList from './TaskList.jsx'

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error('Invalid data format received:', data);
        setTasks([]);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Task Manager</h1>
        <p>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} remaining</p>
      </header>
      <main className="content">
        <AddTask onTaskAdded={fetchTasks} />
        <TaskList tasks={tasks} onTaskDeleted={fetchTasks} />
      </main>
    </div>
  )
}

export default App
