import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import instagramLogo from '../assets/images/Instagram.svg';
import Gravatar from './Gravatar';
import PageEmpty from './PageEmpty'
import '../assets/styles/components/UsersList.css';

class UserListItem extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className='UserListItem'>
        <figure>
          <Gravatar
            className='UserListItem__avatar'
            email={user.email}
            alt={`${user.firstname} ${user.lastname}`}
          />
        </figure>
        <div className='UserListItem__details'>
          <p className='UserListItem__fullname'>
            {user.firstname} {user.lastname}
          </p>
          <div className='UserListItem__twitter'>
            <img src={instagramLogo} alt='Twitter logo' />
            <p className='UserListItem__twitter text-break pr-3'>
              @{user.instagram || '{Sin cuenta}'}
            </p>
          </div>
          <p className='UserListItem__jobTitle'>{user.jobtitle}</p>
        </div>
      </div>
    );
  }
}

export default class UsersList extends Component {
  render() {
    const users = this.props.users;
    if (!(users instanceof Array) || users.length === 0) {
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
  }
}
