import PropTypes from 'prop-types';
import React from 'react';
import logo from '../assets/images/logo-calistep.png';
import Gravatar from './Gravatar';
import InstagramAccount from './InstagramAccount';

/**
 *
 * @param {{
 *  email: string;
 *  name: string;
 *  bio: string;
 *  instagram: string;
 *  birthdate: string;
 * }} props
 * @returns
 */
const Badge = (props) => {
  const { email, name, bio, instagram } = props;

  const age = () => {
    const today = new Date();
    const birthdate = new Date(props.birthdate);
    let edad = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      edad--;
    }
    return edad;
  };

  return (
    <div className='mb-6 shadow-lg rounded-lg overflow-hidden max-w-sm border border-opacity-20 border-black'>
      <picture className='mx-1 h-20 flex justify-center py-2'>
        <img className='m-2' src={logo} alt='Logo' />
      </picture>
      <Gravatar className='py-4 flex justify-center' email={email} />
      <h3 className='break-all text-center m-0 pt-0 pb-4 pr-4 pl-4 text-2xl'>{name}</h3>
      <p className='flex justify-center mb-2 text-md'>
        {age()}
        {' '}
        años
      </p>
      {(bio || instagram) && (
        <div className='flex justify-center flex-col items-center py-2 bg-gray-100'>
          {bio && <p className='break-all mx-4 text-center'>{bio}</p>}
          {instagram && <InstagramAccount instagram={instagram} />}
        </div>
      )}
    </div>
  );
};

Badge.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  birthdate: PropTypes.string.isRequired,
  bio: PropTypes.string,
  instagram: PropTypes.string,
};

export default Badge;
