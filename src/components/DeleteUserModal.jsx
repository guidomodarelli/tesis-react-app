import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import FormButtons from './FormButtons';

/**
 *
 * @param {{
 *  isOpen: boolean;
 *  onClose: () => void;
 *  onDeleteUser: () => void;
 * }} props
 * @returns
 */
const DeleteUserModal = (props) => {
  const { isOpen, onClose, onDeleteUser } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <>
        <div className='Modal__header'>
          <h1 className='title'>¿Estás seguro?</h1>
        </div>
        <div className='Modal__body'>
          <p>¡Estás apunto de eliminar esta cuenta!</p>
        </div>
        <div className='Modal__footer'>
          <FormButtons onClick={onDeleteUser} onClose={onClose} danger />
        </div>
      </>
    </Modal>
  );
};

DeleteUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default DeleteUserModal;
