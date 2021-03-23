import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Badge from '../../components/Badge';
import DeleteUserModal from '../../components/DeleteUserModal';
import PermisosAdminModal from '../../components/PermisosAdminModal';
import { resetMessageErrors } from '../../redux/actions';
import { resetUserForm } from '../../redux/actions/usersActions';

const Actions = (props) => {
  const {
    addAdmin,
    changePermissionsAdmins,
    deleteUser,
    form,
    handleChangeCheckList,
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
    userRole,
    resetUserForm,
    resetMessageErrors,
  } = props;

  const handleClick = () => {
    resetUserForm();
    resetMessageErrors();
  };

  return (
    <div className='col d-flex flex-column align-items-center justify-content-center mb-4'>
      <h2 className='mb-3'>Acciones:</h2>
      <div className='w-100 justify-content-center d-flex'>
        {profile && (
          <Link className='btn btn-primary me-2' to={`/users/${userId}/edit`} onClick={handleClick}>
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
        {(addAdmin || changePermissionsAdmins) && !profile && (
          <>
            <button
              type='button'
              onClick={onOpenModalPermisos}
              className='btn btn-outline-primary ms-2'
            >
              {userRole === 'admin' && changePermissionsAdmins && <>Modificar permisos</>}
              {userRole === 'normal' && addAdmin && <>Designar como admin.</>}
            </button>
            <PermisosAdminModal
              form={form}
              handleChangeCheckList={handleChangeCheckList}
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

Actions.propTypes = {
  addAdmin: PropTypes.bool.isRequired,
  changePermissionsAdmins: PropTypes.bool.isRequired,
  deleteUser: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  handleChangeCheckList: PropTypes.func.isRequired,
  modalDeleteUserIsOpen: PropTypes.bool.isRequired,
  modalPermisosIsOpen: PropTypes.bool.isRequired,
  onCloseModalDeleteUser: PropTypes.func.isRequired,
  onCloseModalPermisos: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onDesignAdmin: PropTypes.func.isRequired,
  onOpenModalDeleteUser: PropTypes.func.isRequired,
  onOpenModalPermisos: PropTypes.func.isRequired,
  profile: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  resetUserForm,
  resetMessageErrors,
};

const ActionConnect = connect(null, mapDispatchToProps)(Actions);

const UserDetails = (props) => {
  const {
    addAdmin,
    changePermissionsAdmins,
    deleteUser,
    form,
    handleChangeCheckList,
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
            name={user.name || ''}
            email={user.email || ''}
            instagram={user.instagram || ''}
            birthdate={user.birthdate || new Date().toISOString()}
            bio={user.bio || ''}
          />
        </div>
        {(profile ||
          deleteUser ||
          (addAdmin && user.role === 'normal') ||
          (changePermissionsAdmins && user.role === 'admin')) && (
          <ActionConnect
            addAdmin={addAdmin}
            changePermissionsAdmins={changePermissionsAdmins}
            deleteUser={deleteUser}
            handleChangeCheckList={handleChangeCheckList}
            modalDeleteUserIsOpen={modalDeleteUserIsOpen}
            modalPermisosIsOpen={modalPermisosIsOpen}
            onCloseModalDeleteUser={onCloseModalDeleteUser}
            onCloseModalPermisos={onCloseModalPermisos}
            onDeleteUser={onDeleteUser}
            onDesignAdmin={onDesignAdmin}
            onOpenModalDeleteUser={onOpenModalDeleteUser}
            onOpenModalPermisos={onOpenModalPermisos}
            form={form}
            profile={profile}
            userId={user.id}
            userRole={user.role}
          />
        )}
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  addAdmin: PropTypes.bool.isRequired,
  changePermissionsAdmins: PropTypes.bool.isRequired,
  deleteUser: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  handleChangeCheckList: PropTypes.func.isRequired,
  modalDeleteUserIsOpen: PropTypes.bool.isRequired,
  modalPermisosIsOpen: PropTypes.bool.isRequired,
  onCloseModalDeleteUser: PropTypes.func.isRequired,
  onCloseModalPermisos: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onDesignAdmin: PropTypes.func.isRequired,
  onOpenModalDeleteUser: PropTypes.func.isRequired,
  onOpenModalPermisos: PropTypes.func.isRequired,
  profile: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserDetails;
