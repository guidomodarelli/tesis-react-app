import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { resetMessageErrors } from '../redux/actions';
import { resetUserForm } from '../redux/actions/usersActions';

/**
 * @typedef {import('../redux/reducers/usersReducer').UserForm} UserFormType
 * @typedef {import("../redux/reducers").FormError} FormError
 */

/**
 *
 * @param {{
 *  onCancel: function(): void;
 *  onSubmit: function(): void;
 *  onChange: function(): void;
 *  formValues: UserFormType;
 *  login: boolean;
 *  messageErrors: FormError[];
 *  resetUserForm: resetUserForm;
 *  resetMessageErrors: resetMessageErrors;
 * }} props
 * @returns
 */
const UserForm = (props) => {
  const {
    onCancel,
    onSubmit: handleSubmit,
    onChange: handleChange,
    formValues,
    login,
    messageErrors,
    resetUserForm,
    resetMessageErrors,
  } = props;

  const handleCancel = () => {
    resetUserForm();
    resetMessageErrors();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {messageErrors && (
        <div className='has-text-danger my-2'>
          {messageErrors.map((obj) => (
            <p key={obj.message}>
              -
              {' '}
              {obj.message}
            </p>
          ))}
        </div>
      )}
      {!login && (
        <>
          <div className='field'>
            <label className='label'>
              <div className='control'>
                Nombre
                <input
                  onChange={handleChange}
                  className='input'
                  type='text'
                  name='name'
                  value={formValues.name}
                />
              </div>
            </label>
          </div>
          <div className='field'>
            <label className='label'>
              Fecha de nacimiento
              <div className='control'>
                <input
                  onChange={handleChange}
                  className='input'
                  type='date'
                  name='birthdate'
                  value={formValues.birthdate}
                />
              </div>
            </label>
          </div>
          <div className='field'>
            <label className='label'>
              Presentación
              <div className='control'>
                <input
                  onChange={handleChange}
                  className='input'
                  type='text'
                  name='bio'
                  value={formValues.bio}
                />
              </div>
            </label>
          </div>
          <div className='field'>
            <label className='label'>
              Instagram
              <div className='control'>
                <input
                  onChange={handleChange}
                  className='input'
                  type='text'
                  name='instagram'
                  value={formValues.instagram}
                />
              </div>
            </label>
          </div>
        </>
      )}
      <div className='field'>
        <label className='label'>
          Correo electrónico
          <div className='control'>
            <input
              onChange={handleChange}
              className='input'
              type='email'
              name='email'
              value={formValues.email}
            />
          </div>
        </label>
      </div>
      <div className='field'>
        <label className='label'>
          Contraseña
          <div className='control'>
            <input
              onChange={handleChange}
              className='input'
              type='password'
              name='password'
              value={formValues.password}
            />
          </div>
        </label>
      </div>
      <div className='field is-grouped'>
        <div className='control'>
          <button type='submit' className='button is-link'>
            {login ? <>Ingresar</> : <>Guardar</>}
          </button>
        </div>
        {!login && (
          <div className='control'>
            <button
              type='button'
              className='button is-link is-light'
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

UserForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
  login: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
  resetUserForm,
  resetMessageErrors,
};

// @ts-ignore
export default connect(null, mapDispatchToProps)(UserForm);
