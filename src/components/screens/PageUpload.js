import React from 'react';
import uploadImage from '../../assets/images/upload.svg';
import '../../styles/components/Screens.scss';

const PageError = () => {
  return (
    <picture>
      <img src={uploadImage} alt='Upload data' />
    </picture>
  );
};

export default PageError;
