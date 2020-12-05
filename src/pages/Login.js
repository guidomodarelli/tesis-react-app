import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import PageLoading from '../components/PageLoading';
import { isLoggedIn } from '../redux/actions';
import { login } from '../redux/actions/usersActions';

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
    if (await props.login(form)) {
      props.history.push('/');
    }
  };

  console.log(props);
  if (props.reducer.loading) {
    return <PageLoading />;
  }
  return (
    <div className='container mt-4' style={{ maxWidth: '25rem' }}>
      <h1>Iniciar sesión</h1>
      <LoginForm
        onChange={handleChange}
        formValues={form}
        onSubmit={handleSumbit}
        error={props.reducer.error}
      />
      <p className='mt-3'>
        ¿No tienes una cuenta?
        {' '}
        <Link to='/signup'>Registrate</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (reducers) => {
  return {
    reducer: reducers.reducer,
    usersReducer: reducers.usersReducer,
  };
};

const mapDispatchToProps = {
  isLoggedIn,
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
