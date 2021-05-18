import React from 'react';
import PropTypes from 'prop-types';

const Screen = ({ img, alt, msg }) => {
  return (
    <picture className='h-full flex items-center justify-center flex-col mt-4'>
      {msg && <h3 className='subtitle text-center'>{msg}</h3>}
      <img className='max-h-96' src={img} alt={alt} />
    </picture>
  );
};

Screen.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  msg: PropTypes.string,
};

export default Screen;
