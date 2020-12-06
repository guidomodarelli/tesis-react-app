import React, { useEffect, useState } from 'react';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import api from '../api';
import UserDetails from './UserDetails';

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

  const isMyProfile = async () => {
    try {
      const data = await api.get.users.myProfile(userId);
      if (data) {
        setProfile(data.myProfile);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchData = () => {
    setLoading(true);
    api.get.users
      .findById(userId)
      .then((data) => {
        setData(data);
        isMyProfile();
      })
      .then(() => setLoading(false))
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
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

export default UserDetailsContainer;
