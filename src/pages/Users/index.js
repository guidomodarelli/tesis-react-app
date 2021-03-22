import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PageError from '../../components/screens/PageError';
import PageLoading from '../../components/screens/PageLoading';
import UsersList from '../../components/UsersList';
import { getAll as getUsers } from '../../redux/actions/usersActions';
import DivContainer from './styles';

/**
 *
 * @typedef {import("../../redux/reducers/usersReducer").User} User
 */

/**
 *
 * @param {{
 *  loading: boolean;
 *  error: string;
 *  users: User[];
 *  getUsers: getUsers;
 * }} props
 * @returns
 */
const Users = (props) => {
  const { loading, error, users, getUsers } = props;

  useEffect(() => getUsers(), []);

  if (error) return <PageError />;
  if (loading) return <PageLoading />;
  return (
    <DivContainer>
      <h1 className='text-center fw-bold mb-4'>Usuarios</h1>
      <UsersList users={users} />
    </DivContainer>
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
