import PropTypes from 'prop-types';
import React from 'react';
import logo from '../assets/images/CALISTEP.png';
import '../assets/styles/components/Badge.css';
import Gravatar from './Gravatar';

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
    <div className='Badge'>
      <div className='Badge__header mx-3'>
        <img src={logo} alt='Logo' className='img-fluid m-2' />
      </div>
      <div className='Badge__section-name p-5'>
        <Gravatar
          className='Badge__avatar img-fluid'
          email={email}
          alt='Avatar'
        />
        <h1>{name}</h1>
      </div>
      <div className='Badge__section-age'>
        <h3>
          Edad:
          {' '}
          {age()}
        </h3>
      </div>
      {(bio || instagram) && (
        <div className='Badge__section-info'>
          {bio && <h3>{bio}</h3>}
          {instagram && (
            <div>
              @
              {instagram}
            </div>
          )}
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
