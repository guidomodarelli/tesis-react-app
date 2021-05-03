import React from 'react';
import { connect } from 'react-redux';

/**
 * @param {Date} time
 * @returns {string}
 */
function getTimeMessage(time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  return `${hours >= 10 ? hours : `0${hours}`}:${
    minutes >= 10 ? minutes : `0${minutes}`
  }`;
}

const Message = (props) => {
  const { message, creator, time } = props;

  return (
    <div className='ChatMessage'>
      <div className='ChatMessage__creator'>{creator}</div>
      <div className='ChatMessage__message'>
        <div className='ChatMessage__message--body'>{message}</div>
        <div className='ChatMessage__message--time'>{getTimeMessage(time)}</div>
      </div>
    </div>
  );
};

export default connect()(Message);
