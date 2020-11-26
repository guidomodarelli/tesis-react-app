import React from 'react';
import errorImage from '../assets/images/error.svg';

const PageError = () => {
  return (
    <figure className='Badge__Background__Image'>
      <img src={errorImage} alt='500 Internal server error' />
    </figure>
  );
};

export default PageError;
