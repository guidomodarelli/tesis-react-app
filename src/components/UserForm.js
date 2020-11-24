import React from 'react';

function UserForm(props) {
  return (
    <form onSubmit={props.onSumbit}>
      <div className='form-group'>
        <label>Nombre</label>
        <input
          onChange={props.onChange}
          className='form-control'
          type='text'
          name='firstname'
          value={props.formValues.firstname}
        />
      </div>
      <div className='form-group'>
        <label>Apellido</label>
        <input
          onChange={props.onChange}
          className='form-control'
          type='text'
          name='lastname'
          value={props.formValues.lastname}
        />
      </div>
      <div className='form-group'>
        <label>Correo electronico</label>
        <input
          onChange={props.onChange}
          className='form-control'
          type='email'
          name='email'
          value={props.formValues.email}
        />
      </div>
      <div className='form-group'>
        <label>Fecha de nacimiento</label>
        <input
          onChange={props.onChange}
          className='form-control'
          type='date'
          name='birthdate'
          value={props.formValues.birthdate}
        />
      </div>
      <div className='form-group'>
        <label>Titulo profesional</label>
        <input
          onChange={props.onChange}
          className='form-control'
          type='text'
          name='jobtitle'
          value={props.formValues.jobtitle}
        />
      </div>
      <div className='form-group'>
        <label>Instagram</label>
        <input
          onChange={props.onChange}
          className='form-control'
          type='text'
          name='instagram'
          value={props.formValues.instagram}
        />
      </div>
      <div className='form-group'>
        <label>Contraseña</label>
        <input
          onChange={props.onChange}
          className='form-control'
          type='password'
          name='password'
          value={props.formValues.password}
        />
      </div>
      <button
        type='submit'
        className='btn btn-primary'
      >
        Guardar
      </button>
      {props.error && (
        <p className='text-danger'>{props.error.message}</p>
      )}
    </form>
  );
}

export default UserForm;
