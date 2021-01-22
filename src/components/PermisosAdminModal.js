import React from 'react';
import Modal from './Modal';

const PermisosAdminModal = (props) => {
  const { isOpen, onClose, handleClick } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <h1>¿Qué puede hacer este administrador?</h1>
          <div className='mt-2'>
            <button
              type='button'
              onClick={handleClick}
              className='btn btn-danger me-2'
            >
              Confirmar
            </button>
            <button type='button' onClick={onClose} className='btn btn-primary'>
              Cancelar
            </button>
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default PermisosAdminModal;
