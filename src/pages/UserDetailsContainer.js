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
    usersReducer: { users },
    reducer: {
      currentUser,
      currentUser: { Permission },
    },
    getUsers,
    deleteUser,
    history,
  } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => !users.length && getUsers(), []);

  const handleOpenModal = () => setModalIsOpen(true);

  const handleCloseModal = () => setModalIsOpen(false);

  const handleDeleteUser = () => {
    deleteUser(userId);
    history.push('/login');
  };

  const profile = () => currentUser.id === userId;

  const currentUserDetails = useSelector(() => users.find((el) => el.id === userId));

  if (reducer.error || usersReducer.error) return <PageError />;
  if (reducer.loading || usersReducer.loading) return <PageLoading />;
  if (!currentUserDetails) return <PageEmpty />;
  return (
    <>
      <UserDetails
        onCloseModal={handleCloseModal}
        onOpenModal={handleOpenModal}
        modalIsOpen={modalIsOpen}
        onDeleteUser={handleDeleteUser}
        user={currentUserDetails}
        profile={profile()}
        deleteUser={Permission ? Permission.deleteUsers : false}
      />
    </>
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
