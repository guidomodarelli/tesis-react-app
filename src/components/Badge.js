import PropTypes from 'prop-types';
import React from 'react';
import logo from '../assets/images/CALISTEP.png';
import '../styles/components/Badge.scss';
import Gravatar from './Gravatar';
import InstagramAccount from './InstagramAccount';

/**
 *
 * @param {{
 *  email: string;
 *  name: string;
 *  bio: string;
 *  instagram: string;
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
    <div className='Container'>
      <div className='Badge'>
        <div className='Badge__header'>
          <img src={logo} alt='Logo' />
        </div>
        <div className='Badge__content'>
          {' '}
          <Gravatar email={email} />
          <h1 className='Badge__content--name'>{name}</h1>
          <div className='Badge__content--age'>
            <h3>
              {age()}
              {' '}
              años
            </h3>
          </div>
        </div>
        {(bio || instagram) && (
          <div className='Badge__footer'>
            {bio && <p>{bio}</p>}
            {instagram && <InstagramAccount instagram={instagram} />}
          </div>
        )}
      </div>
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
