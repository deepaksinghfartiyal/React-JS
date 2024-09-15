
import React, { createContext, useState } from 'react';

const DataContext = createContext();

console.log("DataContext.js DataContext "+DataContext);

const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  debugger;
  console.log("DataContext.js DataProvider"+tasks);
  console.log("DataContext.js DataProvider"+children);

  return (
    <DataContext.Provider value={{ tasks, setTasks }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
