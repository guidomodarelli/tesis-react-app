import React from 'react';

const LoginForm = (props) => {
  const { onSubmit, onChange, formValues, error } = props;
  return (
    <form onSubmit={onSubmit} className=''>
      <div className='form-group'>
        <label htmlFor='emailInput'>Correo electronico</label>
        <input
          onChange={onChange}
          className='form-control'
          type='email'
          name='email'
          id='emailInput'
          value={formValues.email}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='passInput'>Contraseña</label>
        <input
          onChange={onChange}
          className='form-control'
          type='password'
          name='password'
          id='passInput'
          value={formValues.password}
        />
      </div>
      <button
        type='submit'
        className='btn btn-primary'
      >
        Iniciar sesion
      </button>
      {error && <p className='text-danger'>{error.message}</p>}
    </form>
  );
};

export default LoginForm;
