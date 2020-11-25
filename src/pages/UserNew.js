/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Badge from '../components/Badge';
import PageLoading from '../components/PageLoading';
import PageUpload from '../components/PageUpload';
import UserForm from '../components/UserForm';
import api from '../server/api';

const UserNew = (props) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [form, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    birthdate: '',
    jobtitle: '',
    instagram: '',
    password: '',
  });
  const controller = new AbortController()
  const signal = controller.signal;

  const handleChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    try {
      const response = await api(signal).users.create(form);
      if (response.status === 201) {
        props.history.push('/login');
      }
    } catch (error) {
      setError(error);
    } finally {
      setUploading(false);
    }
  };

  const handleLogin = () => {
    setLoading(true);
    api(signal).loggedIn()
    .then(response => {
      if (response.status === 200) {
        props.history.push('/');
      }
    })
    .catch(error => setError(error))
    .finally(() => setLoading(false))
  };

  useEffect(() => {
    handleLogin();
    return () => controller.abort();
  }, []);

  if (uploading) {
    return <PageUpload />;
  }
  if (loading) {
    return <PageLoading />;
  }
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col mt-4'>
            <Badge
              firstname={form.firstname || 'Nombre'}
              lastname={form.lastname || 'Apellido'}
              email={form.email || 'calistep@gmail.com'}
              birthdate={form.birthdate || '2008-01-25'}
              jobtitle={form.jobtitle || 'Titulo profesional'}
              instagram={form.instagram || 'cuenta_intagram'}
            />
          </div>

          <div className='col mt-4 mb-4'>
            <h1>Nuevo usuario</h1>
            <UserForm
              onChange={handleChange}
              formValues={form}
              onSumbit={handleSumbit}
              error={error}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNew;
