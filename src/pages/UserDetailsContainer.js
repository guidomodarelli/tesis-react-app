import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import PageEmpty from '../components/screens/PageEmpty';
import PageError from '../components/screens/PageError';
import PageLoading from '../components/screens/PageLoading';
import {
  deleteUser,
  getAll as getUsers,
  handleChangeForm,
  putOtherUser,
} from '../redux/actions/usersActions';
import UserDetails from './presentational/UserDetails';

const selectCurrentUserDetails = (userId) => createSelector(
  (state) => state.usersReducer.users,
  (users) => users.find((el) => el.id === userId),
);

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

  const currentUserDetails = useSelector(selectCurrentUserDetails(userId));

  const fetchUsers = async () => {
    if (!users.length) {
      await getUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
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
      addAdmin={addNewAdmins || false}
      changePermissionsAdmins={changePermissionsAdmins || false}
      deleteUser={deleteUsers || false}
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
