import React, { Component } from 'react';

class UserForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSumbit}>
        <div className='form-group'>
          <label>Nombre</label>
          <input
            onChange={this.props.onChange}
            className='form-control'
            type='text'
            name='firstname'
            value={this.props.formValues.firstname}
          />
        </div>
        <div className='form-group'>
          <label>Apellido</label>
          <input
            onChange={this.props.onChange}
            className='form-control'
            type='text'
            name='lastname'
            value={this.props.formValues.lastname}
          />
        </div>
        <div className='form-group'>
          <label>Correo electronico</label>
          <input
            onChange={this.props.onChange}
            className='form-control'
            type='email'
            name='email'
            value={this.props.formValues.email}
          />
        </div>
        <div className='form-group'>
          <label>Fecha de nacimiento</label>
          <input
            onChange={this.props.onChange}
            className='form-control'
            type='date'
            name='birthdate'
            value={this.props.formValues.birthdate}
          />
        </div>
        <div className='form-group'>
          <label>Titulo profesional</label>
          <input
            onChange={this.props.onChange}
            className='form-control'
            type='text'
            name='jobtitle'
            value={this.props.formValues.jobtitle}
          />
        </div>
        <div className='form-group'>
          <label>Instagram</label>
          <input
            onChange={this.props.onChange}
            className='form-control'
            type='text'
            name='instagram'
            value={this.props.formValues.instagram}
          />
        </div>
        <div className='form-group'>
          <label>Contraseña</label>
          <input
            onChange={this.props.onChange}
            className='form-control'
            type='password'
            name='password'
            value={this.props.formValues.password}
          />
        </div>
        <button
          type='submit'
          onClick={this.handleClick}
          className='btn btn-primary'
        >
          Guardar
        </button>
        {this.props.error && (
          <p className='text-danger'>{this.props.error.message}</p>
        )}
      </form>
    );
  }
}

export default UserForm;
