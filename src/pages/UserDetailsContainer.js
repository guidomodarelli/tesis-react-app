import React, { useEffect, useState } from 'react';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import api from '../server/api';
import UserDetails from './UserDetails';

const UserDetailsContainer = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const controller = new AbortController();
  const { signal } = controller;

  const { match } = props;
  const { params } = match;
  const { userId } = params;

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
      await api(signal).users.remove(userId);
      localStorage.removeItem('token');
      props.history.push('/users');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const fetchData = () => {
    setLoading(true);
    api(signal)
      .users.findById(userId)
      .then((response) => {
        return response.status === 401 ?
          props.history.push('/login') :
          response.json();
      })
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const isMyProfile = () => {
    api(signal)
      .users.myProfile(userId)
      .then((response) => response.json())
      .then((data) => setProfile(data.myProfile))
      .catch((error) => setError(error));
  };

  useEffect(() => {
    isMyProfile();
    fetchData();
    return () => controller.abort();
  }, []);

  if (loading) {
    return <PageLoading />;
  }
  if (error) {
    return <PageError />;
  }
  return (
    <UserDetails
      onCloseModal={handleCloseModal}
      onOpenModal={handleOpenModal}
      modalIsOpen={modalIsOpen}
      onDeleteUser={handleDeleteUser}
      user={data}
      profile={profile}
    />
  );
};

export default UserDetailsContainer;
