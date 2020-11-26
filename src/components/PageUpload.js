import React from 'react';
import uploadImage from '../assets/images/upload.svg';

const PageError = () => {
  return (
    <figure className='Badge__Background__Image'>
      <img src={uploadImage} alt='Upload data' />
    </figure>
  );
};

export default PageError;
