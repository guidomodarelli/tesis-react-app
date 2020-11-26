import React from 'react';
import loadingImage from '../assets/images/loading.svg';

const PageLoading = () => {
  return (
    <figure className='Badge__Background__Image'>
      <img src={loadingImage} alt='loading gif' />
    </figure>
  );
};

export default PageLoading;
