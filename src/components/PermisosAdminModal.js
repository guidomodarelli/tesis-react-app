import React from 'react';
import Modal from './Modal';

const PermisosAdminModal = (props) => {
  const { isOpen, onClose, onDesignAdmin } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='modal-header'>
        <h1>¿Qué puede hacer este administrador?</h1>
      </div>
      <div className='modal-body'>
        <form onSubmit={onDesignAdmin}>
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
            <label className='form-check-label' htmlFor='flexCheckDefault'>
              Añadir administradores
            </label>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault2' />
            <label className='form-check-label' htmlFor='flexCheckDefault2'>
              Editar info. del grupo
            </label>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault3' />
            <label className='form-check-label' htmlFor='flexCheckDefault3'>
              Eliminar Publicaciones
            </label>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault4' />
            <label className='form-check-label' htmlFor='flexCheckDefault4'>
              Eliminar votos
            </label>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault5' />
            <label className='form-check-label' htmlFor='flexCheckDefault5'>
              Eliminar usuarios
            </label>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault6' />
            <label className='form-check-label' htmlFor='flexCheckDefault6'>
              Crear grupo
            </label>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault7' />
            <label className='form-check-label' htmlFor='flexCheckDefault7'>
              Modificar rutinas
            </label>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault8' />
            <label className='form-check-label' htmlFor='flexCheckDefault8'>
              Modificar permisos de otros admins.
            </label>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault9' />
            <label className='form-check-label' htmlFor='flexCheckDefault9'>
              Cambiar al usuario de grupo
            </label>
          </div>

        </form>
      </div>
      <div className='modal-footer'>
        <div className='mt-2'>
          <button
            type='submit'
            onClick={onDesignAdmin}
            className='btn btn-primary me-2'
          >
            Confirmar
          </button>
          <button type='button' onClick={onClose} className='btn btn-secondary'>
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PermisosAdminModal;
