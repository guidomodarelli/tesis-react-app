import React from 'react';
import Publication from '../components/Publication';
import DivContainer from './Users/styles';

const Pubs = () => {
  return (
    <DivContainer>
      <div className='d-flex align-items-baseline justify-content-center mb-4'>
        <h1 className='fw-bold'>Publicaciones</h1>
      </div>
      <Publication />
      <Publication />
      <Publication />
      <Publication />
    </DivContainer>
  );
};

export default Pubs;
