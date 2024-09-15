import React from 'react';

function ChildComponent(props) {
  return (
    <div>
      <p>{props.passedData}</p>
    </div>
  );
}

export default ChildComponent;
