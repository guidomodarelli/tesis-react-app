import React from 'react';
import loadingImage from '../../assets/images/loading.svg';
import { Figure, Img } from './styles';

const PageLoading = () => {
  return (
    <Figure>
      <Img src={loadingImage} alt='loading gif' />
    </Figure>
  );
};

export default PageLoading;
