import React, { useEffect, useState } from 'react';
import Badge from '../components/Badge';
import PageUpload from '../components/PageUpload';
import UserForm from '../components/UserForm';
import api from '../server/api';

const UserEdit = (props) => {
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
  const controller = new AbortController();
  const { signal } = controller;

  const fetchData = () => {
    api(signal)
      .users.findById(userId)
      .then((response) => {
        return response.status === 401 ?
          props.history.push('/login') :
          response.json();
      })
      .then((data) => {
        setValues({
          ...form,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          birthdate: data.birthdate,
        });
        if (data.jobtitle) {
          setValues({
            ...form,
            jobtitle: data.jobtitle,
          });
        }
        if (data.instagram) {
          setValues({
            ...form,
            instagram: data.instagram,
          });
        }
      })
      .catch((error) => setError(error));
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
      const response = await api(signal).users.update(userId, data);
      if (response.status === 200) {
        props.history.push(`/users/${userId}`);
      }
    } catch (error) {
      setError(error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => controller.abort();
  }, []);

  if (uploading) {
    return <PageUpload />;
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEdit;
