import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PageError from '../components/screens/PageError';
import PageLoading from '../components/screens/PageLoading';
import UsersList from '../components/UsersList';
import { getUsers } from '../redux/actions/usersActions';
import 'bulma';

/**
 *
 * @typedef {import("../redux/reducers/usersReducer").StateUsersReducer} StateUsersReducer
 */

/**
 * @param {StateUsersReducer & {
 *  getUsers: getUsers;
 * }} props
 * @returns
 */
const Users = (props) => {
  const { loading, error, users, getUsers } = props;

  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
  }, []);

  if (error) return <PageError />;
  if (loading) return <PageLoading />;
  return (
    <div className='w-full max-w-xl mx-auto px-4 mt-4 pb-5'>
      <h1 className='text-center font-bold mb-4 title'>Usuarios</h1>
      <UsersList users={users} />
    </div>
  );
};

Users.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = ({ usersReducer }) => usersReducer;

const mapDispatchToProps = { getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(Users);
