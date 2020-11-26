import React from 'react';
import emptyImage from '../assets/images/empty.svg';

const PageLoading = () => {
  return (
    <figure className='BadgeList__empty'>
      <h3>No encontramos ningún usuario</h3>
      <img src={emptyImage} alt='No se encontro ninguna insignia' />
    </figure>
  );
};

export default PageLoading;
