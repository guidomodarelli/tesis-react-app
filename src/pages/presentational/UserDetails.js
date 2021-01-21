import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/Badge';
import DeleteUserModal from '../../components/DeleteUserModal';

const Actions = (props) => {
  const {
    addAdmin,
    userId,
    onOpenModal,
    modalIsOpen,
    onCloseModal,
    onDeleteUser,
    profile,
    deleteUser,
  } = props;
  return (
    <div className='col d-flex flex-column align-items-center justify-content-center mt-4 mb-4'>
      <h2 className='mb-3'>Acciones:</h2>
      <div className='w-100 justify-content-center d-flex'>
        {profile && (
          <Link
            className='btn btn-primary'
            to={`/users/${userId}/edit`}
            style={{
              marginRight: '0.75rem',
            }}
          >
            Editar
          </Link>
        )}
        {(profile || deleteUser) && (
          <>
            <button
              type='button'
              onClick={onOpenModal}
              className='btn btn-danger'
            >
              Eliminar
            </button>
            <DeleteUserModal
              isOpen={modalIsOpen}
              onClose={onCloseModal}
              onDeleteUser={onDeleteUser}
            />
          </>
        )}
        {addAdmin && (
          <button
            type='button'
            onClick={(params) => {

            }}
            className='btn btn-outline-primary'
          >
            Designar como admin.
          </button>
        )}
      </div>
    </div>
  );
};

const UserDetails = (props) => {
  const {
    addAdmin,
    user,
    profile,
    deleteUser,
    onOpenModal,
    modalIsOpen,
    onCloseModal,
    onDeleteUser,
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
            onOpenModal={onOpenModal}
            modalIsOpen={modalIsOpen}
            onCloseModal={onCloseModal}
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
