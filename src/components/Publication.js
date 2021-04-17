import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { toggleFavPub } from '../redux/actions/pubsActions';
import { formatNumber } from '../utils';
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
 *  id: string;
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
    <div className='Badge p-3 mb-4'>
      <div className='d-flex align-items-center'>
        <Gravatar height='50px' width='50px' email={email} />
        <div className='ms-2'>
          <div className='fw-bold text-break'>{name}</div>
          <div className='text-secondary fw-bold'>
            {new Date(createdAt).toLocaleString()}
            <span>
              {' '}
              -
              {' '}
              <i className={classNames('fa', scope === 'private' ? 'fa-user' : 'fa-users')} />
            </span>
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
          onClick={() => toggleFavPub(id, fav)}
        >
          <i
            className={classNames(
              'fa',
              fav ? 'fa-heart' : 'fa-heart-o',
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextareaAutosize
            className='form-control textArea'
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

const mapDispatchToProps = {
  toggleFavPub,
};

export default connect(null, mapDispatchToProps)(Publication);
