import React, { useEffect, useState } from 'react';
import logo from '../assets/images/CALISTEP.png';
import '../assets/styles/pages/Users.css';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import UsersList from '../components/UsersList';
import api from '../api';

const Users = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(undefined);

  const fetchData = () => {
    setLoading(true);
    api.get.users
      .list()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(async () => {
    return fetchData();
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
