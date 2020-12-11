import React from 'react';

const UserForm = (props) => {
  const { onSubmit, onChange, formValues, error } = props;
  return (
    <form onSubmit={onSubmit}>
      <div className='form-group mb-2'>
        <label htmlFor='firstname' className='mb-1'>Nombre</label>
        <input
          onChange={onChange}
          className='form-control'
          type='text'
          name='firstname'
          id='firstname'
          value={formValues.firstname}
        />
      </div>
      <div className='form-group mb-2'>
        <label htmlFor='lastname' className='mb-1'>Apellido</label>
        <input
          onChange={onChange}
          className='form-control'
          type='text'
          name='lastname'
          id='lastname'
          value={formValues.lastname}
        />
      </div>
      <div className='form-group mb-2'>
        <label htmlFor='email' className='mb-1'>Correo electronico</label>
        <input
          onChange={onChange}
          className='form-control'
          type='email'
          name='email'
          id='email'
          value={formValues.email}
        />
      </div>
      <div className='form-group mb-2'>
        <label htmlFor='birthdate' className='mb-1'>Fecha de nacimiento</label>
        <input
          onChange={onChange}
          className='form-control'
          type='date'
          name='birthdate'
          id='birthdate'
          value={formValues.birthdate}
        />
      </div>
      <div className='form-group mb-2'>
        <label htmlFor='jobtitle' className='mb-1'>Titulo profesional</label>
        <input
          onChange={onChange}
          className='form-control'
          type='text'
          name='jobtitle'
          id='jobtitle'
          value={formValues.jobtitle}
        />
      </div>
      <div className='form-group mb-2'>
        <label htmlFor='instagram' className='mb-1'>Instagram</label>
        <input
          onChange={onChange}
          className='form-control'
          type='text'
          name='instagram'
          id='instagram'
          value={formValues.instagram}
        />
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='password' className='mb-1'>Contraseña</label>
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
      <button
        type='button'
        className='btn btn-danger'
        onClick={props.onCancel}
        style={{
          marginLeft: '0.75rem',
        }}
      >
        Cancelar
      </button>
      {error && <p className='text-danger'>{error.message}</p>}
    </form>
  );
};

export default UserForm;
