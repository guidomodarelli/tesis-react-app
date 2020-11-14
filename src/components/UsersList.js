import React, { Component } from 'react';
import Gravatar from './Gravatar';
import instagramLogo from '../assets/images/Instagram.svg';
// import { Link } from 'react-router-dom';
import './styles/UsersList.css'

class UserListItem extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className='UserListItem'>
        <figure>
          <Gravatar
            className='UserListItem__avatar'
            email={user.email}
            alt={`${user.firstName} ${user.lastName}`}
          />
        </figure>
        <div className='UserListItem__details'>
          <p className='UserListItem__fullname'>
            {user.firstName} {user.lastName}
          </p>
          <div className='UserListItem__twitter'>
            <img src={instagramLogo} alt='Twitter logo' />
            <p className='UserListItem__twitter text-break pr-3'>@{user.instagram}</p>
          </div>
          <p className='UserListItem__jobTitle'>{user.jobTitle}</p>
        </div>
      </div>
    );
  }
}

export default class UsersList extends Component {
  render() {
    const users = this.props.users;
    return (
        <ul className='list-unstyled'>
          {users.map((user) => {
            return (
              <li key={user.id}>
                {/* <Link
                  className='text-reset text-decoration-none'
                  to={`/badges/${user.id}`}
                > */}
                  <UserListItem user={user} />
                {/* </Link> */}
              </li>
            );
          })}
        </ul>
    );
  }
}
