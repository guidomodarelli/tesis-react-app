import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import '../assets/styles/components/Publication.css';
import TextareaAutosize from 'react-textarea-autosize';
import { formatNumber } from '../utils';
import Gravatar from './Gravatar';

const Publication = (props) => {
  const {
    name = '',
    createdAt = '',
    body = '',
    favs = 0,
    fav = false,
    email = '',
  } = props;
  const [like, setLike] = useState(fav);
  const inputRef = useRef(null);

  return (
    <div className='Badge p-3 mb-4'>
      <div className='d-flex align-items-center'>
        <Gravatar height='50px' width='50px' email={email} />
        <div className='ms-2'>
          <div className='fw-bold text-break'>{name}</div>
          <div className='text-secondary fw-bold'>
            {new Date(createdAt).toLocaleString()}
          </div>
        </div>
      </div>
      <div className='mt-3 text-break'>{body}</div>
      <div className='mt-2'>
        <i className={classNames('fa', 'fa-heart', 'me-1')} />
        <span className='fw-bold'>{formatNumber(favs)}</span>
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
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <TextareaAutosize
            className='form-control resize-none'
            placeholder='Escribe un comentario...'
            ref={inputRef}
            type='text'
            maxRows={6}
          />
          <div className='d-flex justify-content-end'>
            {' '}
            <button type='submit' className='btn btn-outline-primary mt-2'>
              <i className='fa fa-comment me-1' />
              Agregar comentario
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

Publication.propTypes = {
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  favs: PropTypes.number.isRequired,
  fav: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};

export default Publication;
