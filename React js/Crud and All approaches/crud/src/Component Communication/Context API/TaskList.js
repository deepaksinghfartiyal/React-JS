
import React, { useContext } from 'react';
import { DataContext } from './DataContext';

function TaskList() {
  const { tasks } = useContext(DataContext);

  console.log("TaskList.js global"+DataContext);

  return (
    <div>
      <h2>Task List</h2>
      {console.log("TaskList.js inside html task loop"+DataContext)}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
