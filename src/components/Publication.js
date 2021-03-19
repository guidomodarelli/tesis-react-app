import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import Gravatar from './Gravatar';

const Publication = () => {
  const [like, setLike] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = useState(new Date());
  const inputRef = useRef(null);

  return (
    <div className='Badge p-3 mb-4'>
      <div className='d-flex align-items-center'>
        <Gravatar height='50px' width='50px' />
        <div className='ms-2'>
          <div className='fw-bold'>Anne Henderson</div>
          <div className='text-secondary fw-bold'>{date.toLocaleString()}</div>
        </div>
      </div>
      <div className='mt-3'>
        Donec iaculis rhoncus vehicula. Mauris id euismod libero. Vestibulum
        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
        curae; Nam condimentum dolor sit amet varius iaculis. Aliquam euismod
        turpis purus, non euismod leo euismod non est.
      </div>
      <div className='mt-2'>
        <i className={classNames('fa', 'fa-heart', 'me-1')} />
        <span className='fw-bold'>1k</span>
      </div>
      <div className='d-flex justify-content-evenly mt-2'>
        {' '}
        <button
          type='button'
          className='btn text-secondary fw-bold'
          onClick={() => {
            setLike(!like);
          }}
        >
          <i
            className={classNames(
              'fa',
              like ? 'fa-heart' : 'fa-heart-o',
              'me-1',
            )}
          />
          <span className='text-nowrap'>Me gusta</span>
        </button>
        <button
          type='button'
          className='btn text-secondary fw-bold'
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <i className='fa fa-comment-o me-1' />
          Comentar
        </button>
      </div>
      <div className='mt-2'>
        <input
          type='text'
          className='form-control'
          placeholder='Escribe un comentario...'
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default Publication;
