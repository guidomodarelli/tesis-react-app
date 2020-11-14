import React, { Component } from 'react';

class UserForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSumbit} className=''>
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
          Iniciar sesion
        </button>
        {this.props.error && (
          <p className='text-danger'>{this.props.error.message}</p>
        )}
      </form>
    );
  }
}

export default UserForm;
