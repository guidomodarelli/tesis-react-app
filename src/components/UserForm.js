import PropTypes from 'prop-types';
import React from 'react';

/**
 *
 * @param {Record<string, {
 *  onCancel: (event) => {},
 *  onSubmit: () => {},
 *  onChange: () => {},
 * }>} props
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
  } = props;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {messageErrors && (
        <div className='mt-3 mb-3 text-danger'>
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
          <div className='form-group mb-2'>
            <label htmlFor='name' className='mb-1'>
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
          <div className='form-group mb-2'>
            <label htmlFor='birthdate' className='mb-1'>
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
          <div className='form-group mb-2'>
            <label htmlFor='bio' className='mb-1'>
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
          <div className='form-group mb-2'>
            <label htmlFor='instagram' className='mb-1'>
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
      <div className='form-group mb-2'>
        <label htmlFor='email' className='mb-1'>
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
      <div className='form-group mb-3'>
        <label htmlFor='password' className='mb-1'>
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
      <div className='d-flex'>
        <button type='submit' className='btn btn-primary'>
          {login ? <>Iniciar sesión</> : <>Guardar</>}
        </button>
        {!login && (
          <button
            type='button'
            className='btn btn-danger ms-2'
            onClick={onCancel}
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

export default UserForm;
