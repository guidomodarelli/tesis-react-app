import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/styles/components/Modal.css';
import PropTypes from 'prop-types';

const Modal = (props) => {
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
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
