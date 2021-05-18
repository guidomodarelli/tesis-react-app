import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className='UserListItem border border-solid border-black border-opacity-10 flex mt-4 rounded-md shadow-md'>
      <Gravatar className='m-4' email={user.email} />
      <div>
        <p className='text-break font-bold mt-4 ml-4 text-lg'>{user.name}</p>
        {user.instagram && <InstagramAccount instagram={user.instagram} />}
        <p className='text-break mr-4 text-base mb-3'>{user.bio}</p>
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
