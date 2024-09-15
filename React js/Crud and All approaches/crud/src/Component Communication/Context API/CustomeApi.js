import React from 'react';
import { DataProvider } from './DataContext';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function CustApp() {
  return (
    <DataProvider>
      <div className="App">
        <h1>Task Manager</h1>
        <TaskForm />
        <TaskList />
      </div>
    </DataProvider>
  );
}

export default CustApp;
