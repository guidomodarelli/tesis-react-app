import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PageEmpty from '../components/PageEmpty';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import {
  deleteUser,
  getAll as getUsers,
  handleChangeForm,
  putOtherUser,
} from '../redux/actions/usersActions';
import UserDetails from './presentational/UserDetails';

const UserDetailsContainer = (props) => {
  const {
    match: {
      params: { userId },
    },
    reducer,
    usersReducer,
    usersReducer: {
      form,
      users,
      currentUser,
      currentUser: { addNewAdmins, deleteUsers, changePermissionsAdmins },
    },
    getUsers,
    deleteUser,
    putOtherUser,
    handleChangeForm,
    history,
  } = props;

  const [modalDeleteUserIsOpen, setModalDeleteUserIsOpen] = useState(false);
  const [modalPermisosIsOpen, setModalPermisosIsOpen] = useState(false);

  const currentUserDetails = useSelector(() => users.find((el) => el.id === userId));

  useEffect(async () => {
    if (!users.length) await getUsers();
    const user = users.find((el) => el.id === userId);
    handleChangeForm({ ...user });
  }, []);

  const handleOpenModalDeleteUser = () => setModalDeleteUserIsOpen(true);

  const handleCloseModalDeleteUser = () => setModalDeleteUserIsOpen(false);

  const handleOpenModalPermisos = () => setModalPermisosIsOpen(true);

  const handleCloseModalPermisos = () => setModalPermisosIsOpen(false);

  const handleDeleteUser = () => {
    deleteUser(userId);
    history.push('/login');
  };

  const handleDesignAdmin = () => {
    putOtherUser(userId);
  };

  const handleChangeCheckList = (e) => {
    handleChangeForm({ ...form, [e.target.name]: e.target.checked });
  };

  const isMyProfile = currentUser.id === userId;

  if (reducer.error || usersReducer.error) return <PageError />;
  if (reducer.loading || usersReducer.loading) return <PageLoading />;
  if (!currentUserDetails) return <PageEmpty />;
  return (
    <UserDetails
      addAdmin={addNewAdmins}
      changePermissionsAdmins={changePermissionsAdmins}
      deleteUser={deleteUsers}
      form={form}
      handleChangeCheckList={handleChangeCheckList}
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
  handleChangeForm,
  putOtherUser,
  getUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailsContainer);
