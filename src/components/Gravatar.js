import md5 from 'md5';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  border-radius: 50%;
`;

const Gravatar = (props) => {
  const { email = '' } = props;
  const hash = md5(email);
  return (
    <Img
      src={`https://www.gravatar.com/avatar/${hash}?d=retro`}
      alt='Avatar'
    />
  );
};

Gravatar.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Gravatar;
