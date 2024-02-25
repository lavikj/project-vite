import { useState } from 'react';
import Modal from './Modal'

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskName) => {
    const newTask = { id: Date.now(), name: taskName };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <>
      <h1>Task List</h1>
      <TaskList tasks={tasks} onDeleteTask={deleteTask} />
      <TaskForm onAddTask={addTask} />
      <Modal />
    </>
  );
}

function TaskList({ tasks, onDeleteTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </ul>
  );
}

function TaskItem({ task, onDeleteTask }) {
  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <li>
      {task.name} <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

function TaskForm({ onAddTask }) {
  const [taskName, setTaskName] = useState('');

  const handleChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskName.trim()) return;
    onAddTask(taskName);
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      marginTop: '10px',
    }}>
      <input
        type="text"
        placeholder="Enter task name"
        value={taskName}
        onChange={handleChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default App;
