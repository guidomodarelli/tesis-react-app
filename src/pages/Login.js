import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import PageLoading from '../components/PageLoading';
import api from '../utils/api';

class UserNew extends Component {
  state = {
    loading: false,
    error: null,
    form: {
      email: '',
      password: '',
    },
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSumbit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    try {
      const response = await api.users.login(this.state.form);
      this.setState({ loading: false, error: null });
      if (response.success !== false) {
        localStorage.setItem('token', response.token);
        this.props.history.push('/');
      }
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }
    return (
      <div className='container mt-4' style={{maxWidth: '25rem'}}>
        <h1>Iniciar sesión</h1>
        <LoginForm
          onChange={this.handleChange}
          formValues={this.state.form}
          onSumbit={this.handleSumbit}
          error={this.state.error}
        />
        <p className='mt-3'>
          ¿No tienes una cuenta? <Link to='/signup'>Registrate</Link>
        </p>
      </div>
    );
  }
}

export default UserNew;
