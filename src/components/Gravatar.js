import md5 from 'md5';
import React from 'react';
import PropTypes from 'prop-types';

const Gravatar = (props) => {
  const { email = '', className } = props;
  const hash = md5(email);
  return (
    <img
      className={className}
      src={`https://www.gravatar.com/avatar/${hash}?d=robohash`}
      alt='Avatar'
    />
  );
};

Gravatar.propTypes = {
  email: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Gravatar;
