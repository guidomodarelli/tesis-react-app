import PropTypes from 'prop-types';
import React from 'react';
import logo from '../assets/images/CALISTEP.png';
import '../assets/styles/components/Badge.css';
import DivContainer from '../pages/Users/styles';
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
    <DivContainer>
      <div className='Badge'>
        <div className='Badge__header mx-3'>
          <img src={logo} alt='Logo' className='img-fluid m-2' />
        </div>
        <figure className='d-flex justify-content-center pt-3'>
          <Gravatar email={email} />
        </figure>
        <h1 className='text-center text-break m-0 p-3 pt-0'>{name}</h1>
        {/* <div className='Badge__section-name p-2 pb-4' /> */}
        <div className='Badge__section-age'>
          <h3>
            {age()}
            {' '}
            años
          </h3>
        </div>
        {(bio || instagram) && (
          <div className='Badge__section-info'>
            {bio && (
              <p className='text-break m-0 me-3 ms-3 text-center'>{bio}</p>
            )}
            {instagram && <InstagramAccount instagram={instagram} />}
          </div>
        )}
      </div>
    </DivContainer>
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
