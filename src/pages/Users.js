import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import logo from '../assets/images/CALISTEP.png';
import '../assets/styles/pages/Users.css';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import UsersList from '../components/UsersList';
import { getAll as getUsers } from '../redux/actions/usersActions';

const Users = (props) => {
  const { loading, error, users } = props;

  useEffect(() => {
    props.getUsers();
  }, []);

  if (loading) {
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
        <UsersList users={users} />
      </div>
    </>
  );
};

const mapStateToProps = (reducers) => {
  return {
    loading: reducers.usersReducer.loading,
    error: reducers.usersReducer.error,
    users: reducers.usersReducer.users,
  };
};

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
