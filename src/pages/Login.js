import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import PageLoading from '../components/PageLoading';
import { signIn } from '../redux/actions';

const Login = (props) => {
  const [form, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (await props.signIn(form)) {
      props.history.push('/users');
    }
  };

  if (props.loading) {
    return <PageLoading />;
  }
  return (
    <div className='container mt-4' style={{ maxWidth: '25rem' }}>
      <h1>Iniciar sesión</h1>
      <LoginForm
        onChange={handleChange}
        formValues={form}
        onSubmit={handleSumbit}
        error={props.error}
      />
      <p className='mt-3'>
        ¿No tienes una cuenta?
        {' '}
        <Link to='/signup' className='text-decoration-none'>Registrate</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (reducers) => {
  return {
    loading: reducers.reducer.loading,
    error: reducers.reducer.error,
  };
};

const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
