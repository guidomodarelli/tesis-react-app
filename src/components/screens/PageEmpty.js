import React from 'react';
import emptyImage from '../../assets/images/empty.svg';
import { Figure, Img } from './styles';

const PageLoading = () => {
  return (
    <Figure className='flex-column'>
      <h3>No encontramos ningún usuario</h3>
      <Img src={emptyImage} alt='No se encontro ninguna insignia' />
    </Figure>
  );
};

export default PageLoading;
