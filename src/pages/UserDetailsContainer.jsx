import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import PageEmpty from '../components/screens/PageEmpty';
import PageError from '../components/screens/PageError';
import PageLoading from '../components/screens/PageLoading';
import {
  deleteUser,
  getUsers,
  handleChangeUserForm,
  putAdminPermissions,
} from '../redux/actions/usersActions';
import UserDetails from '../components/UserDetails';

const selectCurrentUserDetails = (userId) => createSelector(
  (state) => state.usersReducer.users,
  (users) => users.find((el) => {
    return el.id === userId;
  }),
);

/**
 *
 * @typedef {import("../redux/reducers/usersReducer").User} User
 * @typedef {import("../redux/reducers/usersReducer").UserForm} UserForm
 */

/**
 *
 * @param {{
 *  reducer: {
 *    loading: boolean;
 *    error: string;
 *  };
 *  usersReducer: {
 *    loading: boolean;
 *    error: string;
 *    form: UserForm;
 *    users: User[];
 *    currentUser: User;
 *    addNewAdmins: boolean;
 *    deleteUser: boolean;
 *    changePermissionsAdmins: boolean;
 *  };
 *  match: {
 *    params: {
 *      userId: string;
 *    };
 *  };
 *  history: unknown[];
 *  getUsers: getUsers;
 *  deleteUser: deleteUser;
 *  putAdminPermissions;
 *  handleChangeUserForm: handleChangeUserForm;
 * }} props
 * @returns
 */
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
    deleteUser, putAdminPermissions,
    handleChangeUserForm,
    history,
  } = props;

  const [modalDeleteUserIsOpen, setModalDeleteUserIsOpen] = useState(false);
  const [modalPermisosIsOpen, setModalPermisosIsOpen] = useState(false);

  /** @type {User} */
  const currentUserDetails = useSelector(selectCurrentUserDetails(userId));

  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
    const currentUserDetails = users.find((el) => {
      return el.id === userId;
    });
    handleChangeUserForm({ ...currentUserDetails });
  }, [users]);

  const handleOpenModalDeleteUser = () => setModalDeleteUserIsOpen(true);

  const handleCloseModalDeleteUser = () => setModalDeleteUserIsOpen(false);

  const handleOpenModalPermisos = () => setModalPermisosIsOpen(true);

  const handleCloseModalPermisos = () => setModalPermisosIsOpen(false);

  const handleDeleteUser = () => {
    deleteUser(userId);
    history.push('/login');
  };

  const handleDesignAdmin = () => {
    putAdminPermissions(userId);
  };

  const handleChangeCheckList = (e) => {
    handleChangeUserForm({ ...form, [e.target.name]: e.target.checked });
  };

  const isMyProfile = currentUser.id === userId;

  if (reducer.error || usersReducer.error) return <PageError />;
  if (reducer.loading || usersReducer.loading) return <PageLoading />;
  if (!currentUserDetails) return <PageEmpty msg='No encontramos ningún usuario' />;
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

const mapDispatchToProps = { deleteUser,
  handleChangeUserForm,
  putAdminPermissions,
  getUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailsContainer);
