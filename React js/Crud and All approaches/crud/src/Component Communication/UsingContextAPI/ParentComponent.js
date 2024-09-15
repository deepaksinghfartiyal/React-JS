import React from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const dataToPass = 'Hello from ParentComponent!';

  return (
    <div>
      <ChildComponent passedData={dataToPass} />
    </div>
  );
}

export default ParentComponent;
