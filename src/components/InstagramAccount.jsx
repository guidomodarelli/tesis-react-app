import React from 'react';
import instagramLogo from '../assets/images/Instagram.svg';
import '../styles/components/InstagramAccount.scss';

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
    <div className='InstagramAccount'>
      <img src={instagramLogo} alt='Instagram logo' />
      <p className='InstagramAccount__perfil'>
        @
        {instagram}
      </p>
    </div>
  );
};

export default InstagramAccount;
