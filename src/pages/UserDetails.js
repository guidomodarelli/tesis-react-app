import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/Badge';
import DeleteUserModal from '../components/DeleteUserModal';

const Actions = (props) => {
  const {
    userId,
    onOpenModal,
    modalIsOpen,
    onCloseModal,
    onDeleteUser,
  } = props;
  return (
    <div className='col d-flex flex-column align-items-center justify-content-center mt-4 mb-4'>
      <h2 className='mb-4'>Acciones:</h2>
      <div className='row'>
        <div className='mr-4'>
          <Link className='btn btn-primary mb-4' to={`/users/${userId}/edit`}>
            Editar
          </Link>
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
};

const UserDetails = (props) => {
  const {
    user,
    profile,
    onOpenModal,
    modalIsOpen,
    onCloseModal,
    onDeleteUser,
  } = props;
  return (
    <div className='container'>
      <Link to='/users' className='btn btn-outline-dark mt-3'>
        Volver
      </Link>
      <div className='row'>
        <div className='col mt-4 ml-2 mr-2 row justify-content-center'>
          <Badge
            firstname={user.firstname || ''}
            lastname={user.lastname || ''}
            email={user.email || ''}
            instagram={user.instagram || ''}
            birthdate={user.birthdate || ''}
            jobtitle={user.jobtitle || ''}
          />
        </div>
        {profile && (
          <Actions
            userId={user.id}
            onOpenModal={onOpenModal}
            modalIsOpen={modalIsOpen}
            onCloseModal={onCloseModal}
            onDeleteUser={onDeleteUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserDetails;
