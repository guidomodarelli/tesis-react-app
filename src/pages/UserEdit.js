import React, { useEffect, useState } from 'react';
import Badge from '../components/Badge';
import PageLoading from '../components/PageLoading';
import PageUpload from '../components/PageUpload';
import UserForm from '../components/UserForm';
import api from '../api';

const UserEdit = (props) => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    birthdate: '',
    jobtitle: '',
    instagram: '',
    password: '',
  });
  const { match } = props;
  const { params } = match;
  const { userId } = params;

  const fetchData = () => {
    setLoading(true);
    api.get.users
      .findById(userId)
      .then((data) => {
        setValues({
          ...form,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          birthdate: data.birthdate,
          jobtitle: data.jobtitle || '',
          instagram: data.instagram || '',
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        props.history.push('/login');
      });
  };

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
      const dataJson = JSON.stringify(form);
      const data = JSON.parse(dataJson);
      if (!data.password) {
        delete data.password;
      }
      await api.put.users.update(userId, data);
      props.history.push(`/users/${userId}`);
      setUploading(false);
    } catch (error) {
      setError(error);
      setUploading(false);
    }
  };

  const handleCancel = () => {
    props.history.push(`/users/${userId}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <PageLoading />;
  }
  if (uploading) {
    return <PageUpload />;
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
              instagram={form.instagram}
            />
          </div>

          <div className='col mt-4 mb-4'>
            <h1>Editar usuario</h1>
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

export default UserEdit;
