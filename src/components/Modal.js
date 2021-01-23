import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/styles/components/Modal.css';

function Modal(props) {
  const { isOpen, onClose, children } = props;
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className='modal'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <button type='button' onClick={onClose} className='btn-close'>
            &nbsp;
          </button>

          {children}
        </div>
      </div>

    </div>,
    document.getElementById('modal'),
  );
}

export default Modal;
