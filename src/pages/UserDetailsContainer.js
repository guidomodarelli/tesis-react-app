import React, { useState } from 'react';
import { connect } from 'react-redux';
import api from '../api';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import UserDetails from './presentational/UserDetails';

const UserDetailsContainer = (props) => {
  const {
    match: {
      params: { userId },
    },
    usersReducer,
    reducer: {
      currentUser,
    },
    reducer: {
      loading: loadingReducer,
    },
    usersReducer: {
      loading: loadingUsersReducer,
    },
  } = props;

  const currentUserDetails = usersReducer.users.filter((el) => el.id === userId)[0];
  const profile = currentUser.id === userId;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.delete.users.remove(userId);
      if (profile) {
        localStorage.removeItem('token');
      }
      props.history.push('/');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  if (loading || loadingReducer || loadingUsersReducer) {
    return <PageLoading />;
  }
  if (error) {
    return <PageError />;
  }
  return (
    <>
      <UserDetails
        onCloseModal={handleCloseModal}
        onOpenModal={handleOpenModal}
        modalIsOpen={modalIsOpen}
        onDeleteUser={handleDeleteUser}
        user={currentUserDetails}
        profile={profile}
        deleteUser={currentUser.Permission.deleteUsers}
      />
    </>
  );
};

const mapStateToProps = (reducers) => {
  return {
    reducer: reducers.reducer,
    usersReducer: reducers.usersReducer,
  };
};

export default connect(mapStateToProps, null)(UserDetailsContainer);
