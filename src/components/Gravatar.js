import md5 from 'md5';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img.attrs(({ height, width }) => ({
  height: height || '80px',
  width: width || '80px',
}))`
  border-radius: 50%;
`;

const Gravatar = (props) => {
  const { email = '', className, height, width } = props;
  const hash = md5(email);
  return (
    <Img
      src={`https://www.gravatar.com/avatar/${hash}?d=retro`}
      alt='Avatar'
      className={className}
      height={height}
      width={width}
    />
  );
};

Gravatar.propTypes = {
  email: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Gravatar;
