import md5 from 'md5';
import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {{
 *  email: string;
 *  className?: string;
 *  height?: string;
 *  width?: string;
 * }} props
 * @returns
 */
const Gravatar = (props) => {
  const { email = '', height, width, className } = props;
  const hash = md5(email);
  return (
    <picture className={className}>
      <img
        src={`https://www.gravatar.com/avatar/${hash}?d=retro`}
        alt='Avatar'
        className='rounded-full'
        height={height || '80px'}
        width={width || '80px'}
      />
    </picture>
  );
};

Gravatar.propTypes = {
  email: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};

export default Gravatar;
