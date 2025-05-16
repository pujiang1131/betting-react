import React, { useState, useEffect } from 'react';
import '../App.css';

const SuccessModal = ({ username, isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);
  
  // Reset and start countdown when modal opens
  useEffect(() => {
    let timer;
    if (isOpen) {
      setCountdown(5);
      timer = setInterval(() => {
        setCountdown(prevCount => {
          if (prevCount <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [isOpen]);
  
  // Close modal when countdown reaches 0
  useEffect(() => {
    if (countdown === 0) {
      onClose();
    }
  }, [countdown, onClose]);

  // Add event listener to close modal when clicking outside
  useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = (e) => {
        if (e.target.className === 'modal-overlay') {
          onClose();
        }
      };
      
      document.addEventListener('click', handleOutsideClick);
      
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Sign Up Successful!</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="success-icon">✓</div>
          <p>Welcome <strong>{username}</strong>!</p>
          <p>Your account has been created successfully.</p>
          <p className="redirect-text">Auto-closing in {countdown} seconds...</p>
          <button className="modal-btn" onClick={onClose}>Close Now</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 