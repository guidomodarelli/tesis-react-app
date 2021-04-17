import React from 'react';
import instagramLogo from '../assets/images/Instagram.svg';

/**
 *
 * @param {{
 *  instagram: string;
 * }} props
 * @returns
 */
const InstagramAccount = (props) => {
  const { instagram } = props;
  return (
    <div className='instagram'>
      <img src={instagramLogo} alt='Instagram logo' />
      <p className='instagram__acount'>
        @
        {instagram}
      </p>
    </div>
  );
};

export default InstagramAccount;
