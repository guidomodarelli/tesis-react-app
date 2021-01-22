import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/Badge';
import DeleteUserModal from '../../components/DeleteUserModal';
import PermisosAdminModal from '../../components/PermisosAdminModal';

const Actions = (props) => {
  const {
    addAdmin,
    deleteUser,
    handleClick,
    modalDeleteUserIsOpen,
    onCloseModalDeleteUser,
    onDeleteUser,
    onOpenModalDeleteUser,
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
              className='btn btn-outline-primary ms-2'
              data-bs-toggle='modal'
              data-bs-target='#exampleModal'
            >
              Designar como admin.
            </button>
            <PermisosAdminModal
              handleClick={handleClick}
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
    onCloseModalDeleteUser,
    onDeleteUser,
    onOpenModalDeleteUser,
    profile,
    user,
  } = props;
  return (
    <div className='container px-2'>
      <Link to='/users' className='btn btn-outline-dark mt-2'>
        Volver
      </Link>
      <div className='row mt-3 flex-column'>
        <div className='col mx-2 d-flex justify-content-center'>
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
            userId={user.id}
            onOpenModalDeleteUser={onOpenModalDeleteUser}
            modalDeleteUserIsOpen={modalDeleteUserIsOpen}
            onCloseModalDeleteUser={onCloseModalDeleteUser}
            onDeleteUser={onDeleteUser}
            profile={profile}
            deleteUser={deleteUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserDetails;
