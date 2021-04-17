import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { resetMessageErrors } from '../redux/actions';
import { resetUserForm } from '../redux/actions/usersActions';
import '../styles/components/FormUser.scss';

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
    <form onSubmit={handleSubmit} noValidate className='FormUser'>
      {messageErrors && (
        <div className='FormUser__Error'>
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
          <div className='FormUser__gruop'>
            <label htmlFor='name' className='FormUser__gruop--label'>
              Nombre
            </label>
            <input
              onChange={handleChange}
              className='form-control'
              type='text'
              name='name'
              id='name'
              value={formValues.name}
            />
          </div>
          <div className='FormUser__gruop'>
            <label htmlFor='birthdate' className='FormUser__gruop--label'>
              Fecha de nacimiento
            </label>
            <input
              onChange={handleChange}
              className='form-control'
              type='date'
              name='birthdate'
              id='birthdate'
              value={formValues.birthdate}
            />
          </div>
          <div className='FormUser__gruop'>
            <label htmlFor='bio' className='FormUser__gruop--label'>
              Presentación
            </label>
            <input
              onChange={handleChange}
              className='form-control'
              type='text'
              name='bio'
              id='bio'
              value={formValues.bio}
            />
          </div>
          <div className='FormUser__gruop'>
            <label htmlFor='instagram' className='FormUser__gruop--label'>
              Instagram
            </label>
            <input
              onChange={handleChange}
              className='form-control'
              type='text'
              name='instagram'
              id='instagram'
              value={formValues.instagram}
            />
          </div>
        </>
      )}
      <div className='FormUser__gruop'>
        <label htmlFor='email' className='FormUser__gruop--label'>
          Correo electrónico
        </label>
        <input
          onChange={handleChange}
          className='form-control'
          type='email'
          name='email'
          id='email'
          value={formValues.email}
        />
      </div>
      <div className='FormUser__gruop--last'>
        <label htmlFor='password' className='FormUser__gruop--label'>
          Contraseña
        </label>
        <input
          onChange={handleChange}
          className='form-control'
          type='password'
          name='password'
          id='password'
          value={formValues.password}
        />
      </div>
      <div className='FormUser__buttons'>
        <button type='submit' className='btn btn-primary'>
          {login ? <>Ingresar</> : <>Guardar</>}
        </button>
        {!login && (
          <button
            type='button'
            className='btn btn-danger FormUser__buttons--cancel'
            onClick={handleCancel}
          >
            Cancelar
          </button>
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

export default connect(null, mapDispatchToProps)(UserForm);
