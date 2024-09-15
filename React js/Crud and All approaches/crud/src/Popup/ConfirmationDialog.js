import React from 'react';

function ConfirmationDialog({ isOpen, onCancel, onConfirm }) {
  debugger;
  if (!isOpen)
  {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this record?</p>
        <div className="abc">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmationDialog;