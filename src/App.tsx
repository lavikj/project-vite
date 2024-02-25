import { useState } from 'react';
import Modal from './Modal';

interface Task {
  id: number;
  name: string;
}

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: number) => void;
}

interface TaskItemProps {
  task: Task;
  onDeleteTask: (taskId: number) => void;
}

interface TaskFormProps {
  onAddTask: (taskName: string) => void;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskName: string) => {
    const newTask: Task = { id: Date.now(), name: taskName };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: number) => {
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

function TaskList({ tasks, onDeleteTask }: TaskListProps) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </ul>
  );
}

function TaskItem({ task, onDeleteTask }: TaskItemProps) {
  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <li>
      {task.name} <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [taskName, setTaskName] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!taskName.trim()) return;
    onAddTask(taskName);
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
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
