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
    <div className='text-blue-400 flex items-center my-2 mr-4'>
      <img className='h-5 mr-1' src={instagramLogo} alt='Instagram logo' />
      <p className='text-break m-0'>
        @
        {instagram}
      </p>
    </div>
  );
};

export default InstagramAccount;
