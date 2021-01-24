import React from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';

const PermisosAdminModal = (props) => {
  const {
    currentUser: { Permission },
    handleChangeCheckList,
    isOpen,
    onClose,
    onDesignAdmin: onSubmit,
    permisos,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='modal-header'>
        <h1 className='mt-3'>¿Qué puede hacer este administrador?</h1>
      </div>
      <div className='modal-body'>
        <form>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='addNewAdmins'
              value={permisos.addNewAdmins}
              onChange={handleChangeCheckList}
              id='flexCheckDefault'
              disabled={Permission ? !Permission.addNewAdmins : true}
            />
            <label className='form-check-label' htmlFor='flexCheckDefault'>
              Añadir administradores
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='changeGroupInfo'
              value={permisos.changeGroupInfo}
              onChange={handleChangeCheckList}
              id='flexCheckDefault2'
              disabled={Permission ? !Permission.changeGroupInfo : true}
            />
            <label className='form-check-label' htmlFor='flexCheckDefault2'>
              Editar info. del grupo
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='deletePosts'
              value={permisos.deletePosts}
              onChange={handleChangeCheckList}
              id='flexCheckDefault3'
              disabled={Permission ? !Permission.deletePosts : true}
            />
            <label className='form-check-label' htmlFor='flexCheckDefault3'>
              Eliminar Publicaciones
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='deleteVotes'
              value={permisos.deleteVotes}
              onChange={handleChangeCheckList}
              id='flexCheckDefault4'
              disabled={Permission ? !Permission.deleteVotes : true}
            />
            <label className='form-check-label' htmlFor='flexCheckDefault4'>
              Eliminar votos
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='deleteUsers'
              value={permisos.deleteUsers}
              onChange={handleChangeCheckList}
              id='flexCheckDefault5'
              disabled={Permission ? !Permission.deleteUsers : true}
            />
            <label className='form-check-label' htmlFor='flexCheckDefault5'>
              Eliminar usuarios
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='addGroup'
              value={permisos.addGroup}
              onChange={handleChangeCheckList}
              id='flexCheckDefault6'
              disabled={Permission ? !Permission.addGroup : true}
            />
            <label className='form-check-label' htmlFor='flexCheckDefault6'>
              Crear grupo
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='changeRoutine'
              value={permisos.changeRoutine}
              onChange={handleChangeCheckList}
              id='flexCheckDefault7'
              disabled={Permission ? !Permission.changeRoutine : true}
            />
            <label className='form-check-label' htmlFor='flexCheckDefault7'>
              Modificar rutinas
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='changePermissionsAdmins'
              value={permisos.changePermissionsAdmins}
              onChange={handleChangeCheckList}
              id='flexCheckDefault8'
              disabled={Permission ? !Permission.changePermissionsAdmins : true}
            />
            <label className='form-check-label' htmlFor='flexCheckDefault8'>
              Modificar permisos de otros admins.
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='changeGroupUser'
              value={permisos.changeGroupUser}
              onChange={handleChangeCheckList}
              id='flexCheckDefault9'
              disabled={Permission ? !Permission.changeGroupUser : true}
            />
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
            onClick={onSubmit}
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

const mapStateToProps = ({ usersReducer }) => ({
  currentUser: usersReducer.currentUser,
});

export default connect(mapStateToProps, null)(PermisosAdminModal);
