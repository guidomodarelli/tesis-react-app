import React, { useEffect, useState } from 'react';
import Badge from '../components/Badge';
import PageLoading from '../components/PageLoading';
import PageUpload from '../components/PageUpload';
import UserForm from '../components/UserForm';
import api from '../api';

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
      const data = await api.post.signUp(form);
      if (data && data.id) {
        props.history.push('/login');
      }
      setUploading(false);
    } catch (error) {
      setError(error);
      setUploading(false);
    }
  };

  const handleLogin = () => {
    setLoading(true);
    api.get
      .loggedIn()
      .then((data) => {
        if (data.loggedIn) {
          return props.history.push('/');
        }
        return setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleCancel = () => {
    props.history.push('/login');
  };

  useEffect(() => {
    handleLogin();
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
          <div className='col mt-4 mx-2'>
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
              onSubmit={handleSumbit}
              error={error}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNew;
