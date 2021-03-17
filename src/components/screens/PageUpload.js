import React from 'react';
import uploadImage from '../../assets/images/upload.svg';
import { Figure, Img } from './styles';

const PageError = () => {
  return (
    <Figure>
      <Img src={uploadImage} alt='Upload data' />
    </Figure>
  );
};

export default PageError;
