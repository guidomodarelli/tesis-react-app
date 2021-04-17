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
    <div className='InstagramAccount mb-2 mt-2 me-3'>
      <img src={instagramLogo} alt='Instagram logo' />
      <p className='InstagramAccount text-break m-0'>
        @
        {instagram}
      </p>
    </div>
  );
};

export default InstagramAccount;
