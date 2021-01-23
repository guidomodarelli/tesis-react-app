import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PageEmpty from '../components/PageEmpty';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import { deleteUser, getAll as getUsers } from '../redux/actions/usersActions';
import UserDetails from './presentational/UserDetails';

const UserDetailsContainer = (props) => {
  const {
    match: {
      params: { userId },
    },
    reducer,
    usersReducer,
    usersReducer: {
      users,
      currentUser,
      currentUser: { Permission },
    },
    getUsers,
    deleteUser,
    history,
  } = props;

  const [modalDeleteUserIsOpen, setModalDeleteUserIsOpen] = useState(false);
  const [modalPermisosIsOpen, setModalPermisosIsOpen] = useState(false);

  useEffect(() => !users.length && getUsers(), []);

  const handleOpenModalDeleteUser = () => setModalDeleteUserIsOpen(true);

  const handleCloseModalDeleteUser = () => setModalDeleteUserIsOpen(false);

  const handleOpenModalPermisos = () => setModalPermisosIsOpen(true);

  const handleCloseModalPermisos = () => setModalPermisosIsOpen(false);

  const handleDeleteUser = () => {
    deleteUser(userId);
    history.push('/login');
  };

  const handleDesignAdmin = () => {};

  const isMyProfile = currentUser.id === userId;

  const currentUserDetails = useSelector(() => users.find((el) => el.id === userId));

  if (reducer.error || usersReducer.error) return <PageError />;
  if (reducer.loading || usersReducer.loading) return <PageLoading />;
  if (!currentUserDetails) return <PageEmpty />;
  return (
    <UserDetails
      addAdmin={Permission ? Permission.addNewAdmins : false}
      deleteUser={Permission ? Permission.deleteUsers : false}
      modalDeleteUserIsOpen={modalDeleteUserIsOpen}
      modalPermisosIsOpen={modalPermisosIsOpen}
      onCloseModalDeleteUser={handleCloseModalDeleteUser}
      onCloseModalPermisos={handleCloseModalPermisos}
      onDeleteUser={handleDeleteUser}
      onDesignAdmin={handleDesignAdmin}
      onOpenModalDeleteUser={handleOpenModalDeleteUser}
      onOpenModalPermisos={handleOpenModalPermisos}
      profile={isMyProfile}
      user={currentUserDetails}
    />
  );
};

const mapStateToProps = ({ reducer, usersReducer }) => ({
  reducer,
  usersReducer,
});

const mapDispatchToProps = {
  deleteUser,
  getUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailsContainer);
