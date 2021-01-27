import React from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';

const PermisosAdminModal = (props) => {
  const {
    currentUser: {
      addGroup,
      addNewAdmins,
      changeGroupInfo,
      changeGroupUser,
      changePermissionsAdmins,
      changeRoutine,
      deletePosts,
      deleteUsers,
      deleteVotes,
    },
    handleChangeCheckList,
    isOpen,
    onClose,
    onDesignAdmin: onSubmit,
    form,
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
              checked={form.addNewAdmins}
              onChange={handleChangeCheckList}
              id='flexCheckDefault'
              disabled={!addNewAdmins}
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
              checked={form.changeGroupInfo}
              onChange={handleChangeCheckList}
              id='flexCheckDefault2'
              disabled={!changeGroupInfo}
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
              checked={form.deletePosts}
              onChange={handleChangeCheckList}
              id='flexCheckDefault3'
              disabled={!deletePosts}
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
              checked={form.deleteVotes}
              onChange={handleChangeCheckList}
              id='flexCheckDefault4'
              disabled={!deleteVotes}
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
              checked={form.deleteUsers}
              onChange={handleChangeCheckList}
              id='flexCheckDefault5'
              disabled={!deleteUsers}
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
              checked={form.addGroup}
              onChange={handleChangeCheckList}
              id='flexCheckDefault6'
              disabled={!addGroup}
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
              checked={form.changeRoutine}
              onChange={handleChangeCheckList}
              id='flexCheckDefault7'
              disabled={!changeRoutine}
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
              checked={form.changePermissionsAdmins}
              onChange={handleChangeCheckList}
              id='flexCheckDefault8'
              disabled={!changePermissionsAdmins}
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
              checked={form.changeGroupUser}
              onChange={handleChangeCheckList}
              id='flexCheckDefault9'
              disabled={!changeGroupUser}
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
