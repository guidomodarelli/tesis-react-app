import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import api from '../api';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import UserDetails from './presentational/UserDetails';

const UserDetailsContainer = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const {
    match: {
      params: { userId },
    },
  } = props;

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
      localStorage.removeItem('token');
      props.history.push('/');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const fetchData = () => {
    setLoading(true);
    api.get.users
      .findById(userId)
      .then((data) => {
        setData(data);
        setProfile(data.id === userId);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
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
        user={data}
        profile={profile}
      />
    </>
  );
};

export default connect(null, null)(UserDetailsContainer);
