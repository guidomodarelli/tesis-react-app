import React from 'react';
import emptyImage from '../../assets/images/empty.svg';
import Screen from './Screen';

const PageEmpty = ({ msg }) => (
  <Screen img={emptyImage} alt='Acá no hay nada' msg={msg} />
);

export default PageEmpty;
