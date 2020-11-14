import React from 'react';
import loading__image from '../assets/images/loading.svg';

function PageLoading() {
  return (
    <figure className='Badge__Background__Image'>
      <img src={loading__image} alt='loading gif' />
    </figure>
  );
}

export default PageLoading;
