import React from 'react';
import Modal from './Modal';

const DeleteUserModal = (props) => {
  const { isOpen, onClose, onDeleteUser } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='DeleteUserModal'>
        <h1>¿Estás seguro?</h1>
        <p>Estás apunto de eliminar esta cuenta!</p>
        <div className='mt-2'>
          <button
            type='button'
            onClick={onDeleteUser}
            className='btn btn-danger me-2'
          >
            Eliminar
          </button>
          <button type='button' onClick={onClose} className='btn btn-primary'>
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
