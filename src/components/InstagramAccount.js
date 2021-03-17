import React from 'react';
import instagramLogo from '../assets/images/Instagram.svg';

const InstagramAccount = (props) => {
  const { instagram } = props;
  return (
    <div className='UserListItem__twitter mb-2 mt-2 me-3'>
      <img src={instagramLogo} alt='Instagram logo' />
      <p className='UserListItem__twitter text-break m-0'>
        @
        {instagram}
      </p>
    </div>
  );
};

export default InstagramAccount;
