import React from 'react';
import image from '../../assets/images/error.svg';
import { Figure, Img } from './styles';

const PageError = () => {
  return (
    <Figure>
      <Img src={image} alt='500 Internal server error' />
    </Figure>
  );
};

export default PageError;
