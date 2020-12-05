import React from 'react';
import '../assets/styles/components/Spinner.css';

const Spinner = () => {
  return (
    <div className='lds-ellipsis'>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
