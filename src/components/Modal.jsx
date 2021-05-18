import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'bulma';
import classNames from 'classnames';

/**
 *
 * @param {{
 *  isOpen: boolean;
 *  onClose: () => void;
 *  children: JSX.Element;
 * }} props
 * @returns
 */
const Modal = (props) => {
  const { isOpen, onClose, children } = props;

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={classNames('modal', isOpen && 'is-active')}>
      <div
        className='modal-background'
        onClick={onClose}
        tabIndex={-1}
        role='button'
        aria-label='background'
      />
      <div className='w-initial modal-content px-5 bg-white'>{children}</div>
      <div
        className='modal-close is-large'
        aria-label='close'
        onClick={onClose}
        role='button'
        tabIndex={-1}
      />
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
