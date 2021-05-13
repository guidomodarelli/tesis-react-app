import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { toggleFavPub } from '../redux/actions/pubsActions';
import { formatNumber } from '../utils/numbers';
import Gravatar from './Gravatar';
import '../styles/components/BadgePubs.scss';

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
    <div className='BadgePubs'>
      <div className='BadgePubs__header'>
        <Gravatar height='50px' width='50px' email={email} />
        <div className='BadgePubs__details'>
          <div className='BadgePubs__details--name'>{name}</div>
          <div className='BadgePubs__details--info'>
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
      <div className='BadgePubs__body'>{body}</div>
      <div className='BadgePubs__likes'>
        <i
          className={classNames('fa', 'fa-heart', 'BadgePubs__likes--heart')}
        />
        {formatNumber(favs)}
      </div>
      <div className='BadgePubs__buttons'>
        {' '}
        <button
          type='button'
          className='btn'
          onClick={() => toggleFavPub(id, fav)}
        >
          <i
            className={classNames(
              'fa',
              fav ? 'fa-heart' : 'fa-heart-o',
            )}
          />
          <span className='BadgePubs__buttons--nowrap'>Me gusta</span>
        </button>
        <button
          type='button'
          className='btn'
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <i className='fa fa-comment-o' />
          Comentar
        </button>
      </div>
      <div className='BadgePubs__comments'>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextareaAutosize
            className='form-control'
            placeholder='Escribe un comentario...'
            ref={inputRef}
            type='text'
            maxRows={6}
          />
          <div className='BadgePubs__comments--add-comment'>
            {' '}
            <button type='submit' className='btn btn-outline-primary'>
              <i className='fa fa-comment' />
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
