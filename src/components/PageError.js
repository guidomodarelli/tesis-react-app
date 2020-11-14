import React from 'react';
import error__image from '../assets/images/error.svg';

function PageError() {
  return (
    <figure className='Badge__Background__Image'>
      <img src={error__image} alt='500 Internal server error' />
    </figure>
  );
}

export default PageError;
