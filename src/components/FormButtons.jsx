import React from 'react';
import classNames from 'classnames';

const FormButtons = ({ onClick: handleClick, onClose: handleClose, danger = false }) => {
  return (
    <div className='field is-grouped'>
      <div className='control'>
        <button
          type='submit'
          onClick={handleClick}
          className={classNames('button', danger ? 'is-danger' : 'is-link')}
        >
          Confirmar
        </button>
      </div>
      <button
        type='button'
        onClick={handleClose}
        className='button is-link is-light'
      >
        Cancelar
      </button>
    </div>
  );
};

export default FormButtons;
