import md5 from 'md5';
import React from 'react';

function Gravatar(props) {
  const { email, className } = props;
  const hash = md5(email);
  return (
    <img
      className={className}
      src={`https://www.gravatar.com/avatar/${hash}?d=robohash`}
      alt='Avatar'
    />
  );
}

export default Gravatar;
