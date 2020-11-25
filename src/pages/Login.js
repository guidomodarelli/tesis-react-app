/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import PageLoading from '../components/PageLoading';
import api from '../server/api';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setValues] = useState({
    email: '',
    password: '',
  });
  const controller = new AbortController();
  const signal = controller.signal;

  const handleChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api(signal).users.login(form);
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        props.history.push('/');
      } else {
        console.error(data);
        localStorage.removeItem('token');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setLoading(true);
    api(signal)
      .loggedIn()
      .then((response) => {
        if (response.status === 200) {
          props.history.push('/');
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleLogin();
    return () => controller.abort();
  }, []);

  if (loading) {
    return <PageLoading />;
  }
  return (
    <div className='container mt-4' style={{ maxWidth: '25rem' }}>
      <h1>Iniciar sesión</h1>
      <LoginForm
        onChange={handleChange}
        formValues={form}
        onSumbit={handleSumbit}
        error={error}
      />
      <p className='mt-3'>
        ¿No tienes una cuenta? <Link to='/signup'>Registrate</Link>
      </p>
    </div>
  );
};

export default Login;
