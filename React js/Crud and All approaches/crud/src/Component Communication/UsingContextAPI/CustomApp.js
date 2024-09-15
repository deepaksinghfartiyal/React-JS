// CustomApp.js
import React from 'react';
import { DataProvider } from './DataContext';
import ParentComponent from './ParentComponent';

//Wrap your CustomApp with the provider:

function CustomApp() {
  return (
    <DataProvider>
      <div className="CustomApp">
        <ParentComponent />
      </div>
    </DataProvider>
  );
}

export default CustomApp;
