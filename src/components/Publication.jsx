import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { toggleFavPub } from '../redux/actions/pubsActions';
import { formatNumber } from '../utils/numbers';
import Gravatar from './Gravatar';

/**
 * @typedef {import("../redux/reducers/pubsReducer").SCOPE} SCOPE
 */

/**
 *
 * @param {{
 *  name: string;
 *  createdAt: string;
 *  body: string;
 *  favs: number;
 *  fav: boolean;
 *  scope: SCOPE;
 *  email: string;
 *  toggleFavPub: toggleFavPub;
 *  id: number;
 * }} props
 * @returns
 */
const Publication = (props) => {
  const {
    name = '',
    createdAt = '',
    body = '',
    favs = 0,
    fav = false,
    scope = 'private',
    email = '',
    toggleFavPub,
    id,
  } = props;
  const inputRef = useRef(null);

  return (
    <div className='p-4 mb-3 mx-auto shadow-lg rounded-lg overflow-hidden max-w-sm border border-opacity-20 border-black'>
      <div className='flex items-center'>
        <Gravatar height='50px' width='50px' email={email} />
        <div className='ml-2'>
          <div className='text-break font-bold'>{name}</div>
          <div className='font-bold text-gray-500'>
            {new Date(createdAt).toLocaleString()}
            <span>
              {' '}
              -
              {' '}
              <i
                className={classNames(
                  'fa',
                  scope === 'private' ? 'fa-user' : 'fa-users',
                )}
              />
            </span>
          </div>
        </div>
      </div>
      <div className='text-break mt-4'>{body}</div>
      <div className='ml-2 font-bold'>
        <i className='fa fa-heart mr-1' />
        {formatNumber(favs)}
      </div>
      <div className='flex justify-evenly mt-2'>
        {' '}
        <button
          type='button'
          className='button is-white font-bold text-gray-500'
          onClick={() => toggleFavPub(id, fav)}
        >
          <i className={classNames(fav ? 'fa fa-heart' : 'fa fa-heart-o', 'mr-1')} />
          <span className='whitespace-nowrap'>Me gusta</span>
        </button>
        <button
          type='button'
          className='button is-white'
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <i className='fa fa-comment-o mr-1' />
          Comentar
        </button>
      </div>
      <div className='mt-2'>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextareaAutosize
            className='input resize-none'
            placeholder='Escribe un comentario...'
            ref={inputRef}
            type='text'
            maxRows={6}
          />
          <div className='flex justify-end'>
            {' '}
            <button type='submit' className='button is-link is-outlined mt-2'>
              <i className='fa fa-comment mr-1' />
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

const mapDispatchToProps = {
  toggleFavPub,
};

export default connect(null, mapDispatchToProps)(Publication);
