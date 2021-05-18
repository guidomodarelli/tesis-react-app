import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Screens.scss';

const Screen = ({ img, alt, msg }) => {
  return (
    <picture className='Screen'>
      {msg && <h3 className='subtitle'>{msg}</h3>}
      <img src={img} alt={alt} />
    </picture>
  );
};

Screen.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  msg: PropTypes.string,
};

export default Screen;
