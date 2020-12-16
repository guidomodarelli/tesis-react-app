import React, { useState } from 'react';
import { connect } from 'react-redux';
import api from '../api';
import Badge from '../components/Badge';
import PageLoading from '../components/PageLoading';
import PageUpload from '../components/PageUpload';
import UserForm from '../components/UserForm';
import { handleChangeForm, resetForm } from '../redux/actions/usersActions';

const UserNew = (props) => {
  const { loading, form, handleChangeForm, resetForm } = props;

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    handleChangeForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const data = await api.post.signUp(form);
      if (data && data.id) {
        props.history.push('/login');
      }
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    props.history.push('/login');
  };

  if (uploading) return <PageUpload />;
  if (loading) return <PageLoading />;
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
              onCancel={handleCancel}
              passwordRequired
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ usersReducer }) => usersReducer;

const mapDispatchToProps = {
  handleChangeForm,
  resetForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNew);
