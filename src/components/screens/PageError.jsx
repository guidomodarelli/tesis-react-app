import React from 'react';
import ErrorImage from '../../assets/images/error.svg';
import Screen from './Screen';

const PageError = () => (
  <Screen img={ErrorImage} alt='500 Error interno del servidor' />
);

export default PageError;
