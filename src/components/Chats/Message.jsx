import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

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
  const { message, creator, time, currentUser } = props;

  return (
    <div
      className={classNames(
        'p-4 border border-solid border-gray-400 rounded-t-3xl mx-4 mb-2 max-w-xs min-w-min',
        currentUser
          ? 'self-end rounded-br-sm rounded-bl-3xl'
          : 'bg-blue-300 rounded-tl-sm rounded-b-3xl',
      )}
    >
      <div className='font-bold'>{creator}</div>
      <div className='flex justify-end'>
        <div className='text-lg text-left mr-2'>{message}</div>
        <div className='text-left italic text-xs flex items-center'>
          {getTimeMessage(time)}
        </div>
      </div>
    </div>
  );
};

export default connect()(Message);
