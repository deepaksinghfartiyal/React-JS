import React from "react";
import '../css/alert.css';

const ResponsiveAlert = ({message, onClose }) => {
  debugger;
  return (
    <div className="responsive-alert">
      <div className="alert-content">
        {/* not passing any event */}
        {/* <button onClick={onClose()} style={{ float: "right" }}> */}

          {/* if we want to pass event object */}
        <button onClick={(e) => onClose(e)} style={{ float: "right" }}>

          Close
        </button>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default ResponsiveAlert;