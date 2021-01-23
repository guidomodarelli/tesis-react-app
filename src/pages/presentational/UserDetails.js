import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/Badge';
import DeleteUserModal from '../../components/DeleteUserModal';
import PermisosAdminModal from '../../components/PermisosAdminModal';

const Actions = (props) => {
  const {
    addAdmin,
    deleteUser,
    modalDeleteUserIsOpen,
    modalPermisosIsOpen,
    onCloseModalDeleteUser,
    onCloseModalPermisos,
    onDeleteUser,
    onDesignAdmin,
    onOpenModalDeleteUser,
    onOpenModalPermisos,
    profile,
    userId,
  } = props;
  return (
    <div className='col d-flex flex-column align-items-center justify-content-center mt-4 mb-4'>
      <h2 className='mb-3'>Acciones:</h2>
      <div className='w-100 justify-content-center d-flex'>
        {profile && (
          <Link
            className='btn btn-primary me-2'
            to={`/users/${userId}/edit`}
          >
            Editar
          </Link>
        )}
        {(profile || deleteUser) && (
          <>
            <button
              type='button'
              onClick={onOpenModalDeleteUser}
              className='btn btn-danger'
            >
              Eliminar
            </button>
            <DeleteUserModal
              isOpen={modalDeleteUserIsOpen}
              onClose={onCloseModalDeleteUser}
              onDeleteUser={onDeleteUser}
            />
          </>
        )}
        {addAdmin && !profile && (
          <>
            <button
              type='button'
              onClick={onOpenModalPermisos}
              className='btn btn-outline-primary ms-2'
            >
              Designar como admin.
            </button>
            <PermisosAdminModal
              isOpen={modalPermisosIsOpen}
              onClose={onCloseModalPermisos}
              onDesignAdmin={onDesignAdmin}
            />
          </>
        )}
      </div>
    </div>
  );
};

const UserDetails = (props) => {
  const {
    addAdmin,
    deleteUser,
    modalDeleteUserIsOpen,
    modalPermisosIsOpen,
    onCloseModalDeleteUser,
    onCloseModalPermisos,
    onDeleteUser,
    onDesignAdmin,
    onOpenModalDeleteUser,
    onOpenModalPermisos,
    profile,
    user,
  } = props;
  return (
    <div className='container'>
      <Link to='/users' className='btn btn-outline-dark mt-2'>
        Volver
      </Link>
      <div className='row mt-3 flex-column'>
        <div className='col px-2 d-flex justify-content-center'>
          <Badge
            firstname={user.firstname || ''}
            lastname={user.lastname || ''}
            email={user.email || ''}
            instagram={user.instagram || ''}
            birthdate={user.birthdate || ''}
            jobtitle={user.jobtitle || ''}
          />
        </div>
        {(profile || deleteUser || addAdmin) && (
          <Actions
            addAdmin={addAdmin}
            deleteUser={deleteUser}
            modalDeleteUserIsOpen={modalDeleteUserIsOpen}
            modalPermisosIsOpen={modalPermisosIsOpen}
            onCloseModalDeleteUser={onCloseModalDeleteUser}
            onCloseModalPermisos={onCloseModalPermisos}
            onDeleteUser={onDeleteUser}
            onDesignAdmin={onDesignAdmin}
            onOpenModalDeleteUser={onOpenModalDeleteUser}
            onOpenModalPermisos={onOpenModalPermisos}
            profile={profile}
            userId={user.id}
          />
        )}
      </div>
    </div>
  );
};

export default UserDetails;
