import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from '../assets/images/CALISTEP.png';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import UsersList from '../components/UsersList';
import api from '../utils/api';
import './styles/Users.css';

function Users(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(undefined);

  const isMounted = useRef(true);

  const fetchData = useCallback(async () => {
    isMounted.current && setLoading(true);
    isMounted.current && setError(null);
    try {
      const response = await api.users.list();
      const data = await response.json()
      isMounted.current && setData(data);
    } catch (error) {
      isMounted.current && setError(error);
    } finally {
      isMounted.current && setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, [fetchData]);

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

        {/* {this.state.loading && <MiniPageLoading />} */}
      </div>
    </>
  );
}

export default Users;
