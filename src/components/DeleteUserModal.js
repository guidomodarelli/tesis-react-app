import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const DeleteUserModal = (props) => {
  const { isOpen, onClose, onDeleteUser } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='modal-header'>
        <h1 className='mt-3'>¿Estás seguro?</h1>
      </div>
      <div className='modal-body'>
        <p>&iexcl;Estás apunto de eliminar esta cuenta!</p>
      </div>
      <div className='modal-footer'>
        <button
          type='button'
          onClick={onDeleteUser}
          className='btn btn-danger me-2'
        >
          Confirmar
        </button>
        <button type='button' onClick={onClose} className='btn btn-secondary'>
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

DeleteUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default DeleteUserModal;
