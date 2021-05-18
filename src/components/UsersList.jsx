import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/UsersList.scss';
import Gravatar from './Gravatar';
import InstagramAccount from './InstagramAccount';
import PageEmpty from './screens/PageEmpty';

/**
 * @typedef {import("../redux/reducers/usersReducer").User} User
 */

/**
 *
 * @param {{
 *  user: User;
 * }} props
 */
const UserListItem = (props) => {
  const { user } = props;

  return (
    <div className='UserListItem'>
      <Gravatar email={user.email} />
      <div className='UserListItem__details'>
        <p className='UserListItem__details--name'>{user.name}</p>
        {user.instagram && <InstagramAccount instagram={user.instagram} />}
        <p className='UserListItem__details--bio mb-3'>{user.bio}</p>
      </div>
    </div>
  );
};

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
};

/**
 *
 * @param {{
 *  users: User[];
 * }} props
 */
const UsersList = (props) => {
  const { users = [] } = props;
  if (!users.length) {
    return <PageEmpty msg='No encontramos ningún usuario' />;
  }
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link className='UserList__link' to={`/users/${user.id}`}>
            <UserListItem user={user} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UsersList;
