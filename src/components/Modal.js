import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/styles/components/Modal.css';

function Modal(props) {
  const { isOpen, onClose, children } = props;
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className='Modal'>
      <div className='Modal__container'>
        <button type='button' onClick={onClose} className='Modal__close-button'>
          X
        </button>

        {children}
      </div>
    </div>,
    document.getElementById('modal'),
  );
}

export default Modal;
