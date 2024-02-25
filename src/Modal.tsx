import { useState } from 'react';
import './index.css';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Click Me!</button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-content">
              <h2>Modal Title Here</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
