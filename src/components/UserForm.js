import React from 'react';

const UserForm = (props) => {
  const { onSubmit, onChange, formValues, error } = props;
  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label htmlFor='firstname'>Nombre</label>
        <input
          onChange={onChange}
          className='form-control'
          type='text'
          name='firstname'
          id='firstname'
          value={formValues.firstname}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='lastname'>Apellido</label>
        <input
          onChange={onChange}
          className='form-control'
          type='text'
          name='lastname'
          id='lastname'
          value={formValues.lastname}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Correo electronico</label>
        <input
          onChange={onChange}
          className='form-control'
          type='email'
          name='email'
          id='email'
          value={formValues.email}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='birthdate'>Fecha de nacimiento</label>
        <input
          onChange={onChange}
          className='form-control'
          type='date'
          name='birthdate'
          id='birthdate'
          value={formValues.birthdate}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='jobtitle'>Titulo profesional</label>
        <input
          onChange={onChange}
          className='form-control'
          type='text'
          name='jobtitle'
          id='jobtitle'
          value={formValues.jobtitle}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='instagram'>Instagram</label>
        <input
          onChange={onChange}
          className='form-control'
          type='text'
          name='instagram'
          id='instagram'
          value={formValues.instagram}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Contraseña</label>
        <input
          onChange={onChange}
          className='form-control'
          type='password'
          name='password'
          id='password'
          value={formValues.password}
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Guardar
      </button>
      {error && <p className='text-danger'>{error.message}</p>}
    </form>
  );
};

export default UserForm;
