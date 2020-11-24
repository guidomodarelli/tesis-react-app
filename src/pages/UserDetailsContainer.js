import { useCallback, useEffect, useRef, useState } from 'react';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import api from '../utils/api';
import UserDetails from './UserDetails';

function UserDetailsContainer(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const userId = props.match.params.userId;
  const isMounted = useRef(true);

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
      await api.users.remove(userId);
      props.history.push('/users');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const fetchData = useCallback(async () => {
    isMounted.current && setLoading(true);
    isMounted.current && setError(null);
    try {
      const response = await api.users.findById(userId);
      const data = await response.json();
      isMounted.current && setData(data);
    } catch (error) {
      isMounted.current && setError(error);
    } finally {
      isMounted.current && setLoading(false);
    }
  }, [userId]);

  const isMyProfile = useCallback(async () => {
    isMounted.current && setError(null);
    try {
      const response = await api.users.myProfile(userId);
      const data = await response.json();
      isMounted.current && setProfile(data.myProfile);
    } catch (error) {
      isMounted.current && setError(null);
    }
  }, [userId]);

  useEffect(() => {
    isMyProfile();
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, [fetchData, isMyProfile]);

  if (loading) {
    return <PageLoading />;
  } else if (error) {
    return <PageError />;
  } else
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
}

export default UserDetailsContainer;
