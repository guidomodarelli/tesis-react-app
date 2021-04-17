import React from 'react';
import loadingImage from '../../assets/images/loading.svg';
import '../../styles/components/Screens.scss';

const PageLoading = () => {
  return (
    <picture className='Screen'>
      <img src={loadingImage} alt='loading gif' />
    </picture>
  );
};

export default PageLoading;
