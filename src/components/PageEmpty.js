import React from 'react';
import empty__image from '../assets/images/empty.svg';

function PageLoading() {
  return (
    <figure className='BadgeList__empty'>
      <h3>No encontramos ningún usuario</h3>
      <img src={empty__image} alt='No se encontro ninguna insignia' />
    </figure>
  );
}

export default PageLoading;
