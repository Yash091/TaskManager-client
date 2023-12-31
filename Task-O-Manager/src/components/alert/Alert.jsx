import React from 'react';
import './Alert.css';

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-modal">
        <div className="alert-content">
          <p>{message}</p>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
