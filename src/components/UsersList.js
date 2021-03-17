import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import instagramLogo from '../assets/images/Instagram.svg';
import '../assets/styles/components/UsersList.css';
import Gravatar from './Gravatar';
import PageEmpty from './screens/PageEmpty';

const Div = styled.div({
  border: '1px solid rgba(0, 0, 0, 0.16)',
  borderRadius: '8px',
});

const UserListItem = (props) => {
  const { user } = props;

  return (
    <Div className='UserListItem'>
      <figure>
        <Gravatar
          className='UserListItem__avatar'
          email={user.email}
          alt={user.name}
        />
      </figure>
      <div className='UserListItem__details'>
        <p className='UserListItem__fullname'>{user.name}</p>
        {user.instagram && (
          <div className='UserListItem__twitter'>
            <img src={instagramLogo} alt='Twitter logo' />
            <p className='UserListItem__twitter text-break pr-3'>
              @
              {user.instagram}
            </p>
          </div>
        )}
        <p className='UserListItem__jobTitle'>{user.bio}</p>
      </div>
    </Div>
  );
};

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
};

const UsersList = (props) => {
  const { users = [] } = props;
  if (!users.length) {
    return <PageEmpty />;
  }
  return (
    <ul className='list-unstyled'>
      {users.map((user) => {
        return (
          <li key={user.id}>
            <Link
              className='text-reset text-decoration-none'
              to={`/users/${user.id}`}
            >
              <UserListItem user={user} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UsersList;
