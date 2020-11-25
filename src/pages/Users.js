/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import logo from '../assets/images/CALISTEP.png';
import '../assets/styles/pages/Users.css';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import UsersList from '../components/UsersList';
import api from '../server/api';

const Users = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(undefined);
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchData = () => {
    setLoading(true);
    api(signal)
      .users.list()
      .then((response) => {
        return response.status === 401
          ? props.history.push('/login')
          : response.json();
      })
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    return () => controller.abort();
  }, []);

  if (loading && !data) {
    return <PageLoading />;
  }
  if (error) {
    return <PageError />;
  }
  return (
    <>
      <div className='Users'>
        <div className='Users__hero'>
          <div className='Users__container'>
            <img className='img-fluid' src={logo} alt='logo' />
          </div>
        </div>
      </div>

      <div className='Users__container'>
        <UsersList users={data} />
      </div>
    </>
  );
};

export default Users;
