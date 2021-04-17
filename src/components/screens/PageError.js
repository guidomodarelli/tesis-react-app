import React from 'react';
import image from '../../assets/images/error.svg';
import '../../styles/components/Screens.scss';

const PageError = () => {
  return (
    <picture className='Screen'>
      <img src={image} alt='500 Internal server error' />
    </picture>
  );
};

export default PageError;
