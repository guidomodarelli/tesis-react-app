import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/Badge';
import DeleteUserModal from '../components/DeleteUserModal';

function Actions(props) {
  const userId = props.userId;
  return (
    <div className='col d-flex flex-column align-items-center justify-content-center'>
      <h2 className='mb-4'>Acciones:</h2>
      <div>
        <Link className='btn btn-primary mb-4' to={`/users/${userId}/edit`}>
          Editar
        </Link>
      </div>
      <div>
        <button onClick={props.onOpenModal} className='btn btn-danger'>
          Eliminar
        </button>
        <DeleteUserModal
          isOpen={props.modalIsOpen}
          onClose={props.onCloseModal}
          onDeleteUser={props.onDeleteUser}
        />
      </div>
    </div>
  );
}

function UserDetails(props) {
  const user = props.user;

  return (
    <div className='container'>
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
        {props.profile && (
          <Actions
            userId={user.id}
            onOpenModal={props.onOpenModal}
            modalIsOpen={props.modalIsOpen}
            onCloseModal={props.onCloseModal}
            onDeleteUser={props.onDeleteUser}
          />
        )}
      </div>
    </div>
  );
}

export default UserDetails;
