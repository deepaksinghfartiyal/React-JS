import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext';

function TaskForm() {

  //"useContext" is React hook.
  //"useContext" is used to consume the value provided by a React.createContext object.
  //"useContext" hook from React to access the value provided by the "DataContext.Provider"

  const { tasks, setTasks } = useContext(DataContext);
  const [newTask, setNewTask] = useState('');

  console.log("TaskForm.js golbal "+DataContext);

  const addTask = () => {
  debugger
    setTasks([...tasks, newTask]);
    console.log("TaskForm.js inside addTask functio"+DataContext);
    setNewTask('');
  };
  return (
    <div>
      <h2>Add Task</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}
export default TaskForm;
