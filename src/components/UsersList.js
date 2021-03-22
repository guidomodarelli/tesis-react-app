import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../assets/styles/components/UsersList.css';
import Gravatar from './Gravatar';
import InstagramAccount from './InstagramAccount';
import PageEmpty from './screens/PageEmpty';

/**
 * @typedef {import("../redux/reducers/usersReducer").User} User
 */

const Div = styled.div({
  border: '1px solid rgba(0, 0, 0, 0.16)',
  borderRadius: '8px',
  boxShadow: '0 4px 8px 2px rgba(0, 0, 0, 0.2)',
  marginTop: '1em',
  display: 'flex',
});

const Figure = styled.figure`
  margin: 15px;
`;

/**
 *
 * @param {{
 *  user: User;
 * }} props
 * @returns {JSX.Element}
 */
const UserListItem = (props) => {
  const { user } = props;

  return (
    <Div>
      <Figure>
        <Gravatar email={user.email} />
      </Figure>
      <div className='d-flex flex-column justify-content-evenly'>
        <p className='fw-bold mt-3 mb-0 text-break me-3'>{user.name}</p>
        {user.instagram && (
          <InstagramAccount instagram={user.instagram} />
        )}
        <p className='fs-6 text-break me-3'>{user.bio}</p>
      </div>
    </Div>
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
 * @returns {JSX.Element}
 */
const UsersList = (props) => {
  const { users = [] } = props;
  if (!users.length) {
    return <PageEmpty msg='No encontramos ningún usuario' />;
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
