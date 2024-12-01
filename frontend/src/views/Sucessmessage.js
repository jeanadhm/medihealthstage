// components/SuccessMessage.js
import React from 'react';

const SuccessMessage = ({ message }) => {
  return (
    <div className="success-message">
      <div className="success-icon">&#10003;</div>
      <div className="success-text">{message}</div>
      <style jsx>{`
        .success-message {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #d4edda;
          color: #155724;
          padding: 1rem;
          border-radius: 5px;
          border: 1px solid #c3e6cb;
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          animation: fadeInOut 5s forwards;
        }
        .success-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
        }
        .success-text {
          font-size: 1rem;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SuccessMessage;
