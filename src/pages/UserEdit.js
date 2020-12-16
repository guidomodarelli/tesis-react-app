import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Badge from '../components/Badge';
import PageLoading from '../components/PageLoading';
import PageUpload from '../components/PageUpload';
import UserForm from '../components/UserForm';
import { handleChangeForm, putUser, resetForm } from '../redux/actions/usersActions';

const UserEdit = (props) => {
  const {
    match: {
      params: { userId },
    },
    history,
    loading,
    currentUser,
    error,
    form,
    handleChangeForm,
    putUser,
    resetForm,
  } = props;

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => handleChangeForm({ ...form, [e.target.name]: e.target.value });

  const handleSumbit = (e) => {
    e.preventDefault();
    setUploading(true);
    //TODO: Validar que no haya un email repetido
    putUser(userId);
    history.push(`/users/${userId}`);
  };

  const handleCancel = () => {
    resetForm();
    history.push(`/users/${userId}`);
  };

  useEffect(() => {
    const {
      firstname,
      lastname,
      birthdate,
      jobtitle,
      instagram,
      email,
    } = currentUser;
    handleChangeForm({
      firstname,
      lastname,
      birthdate,
      jobtitle,
      instagram,
      email,
      password: '',
    });
  }, []);

  if (loading || !form) return <PageLoading />;
  if (uploading) return <PageUpload />;
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col mt-4 mx-2'>
            <Badge
              firstname={form.firstname}
              lastname={form.lastname}
              email={form.email}
              birthdate={form.birthdate}
              jobtitle={form.jobtitle}
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

const mapStateToProps = ({ usersReducer }) => usersReducer;

const mapDispatchToProps = {
  handleChangeForm,
  putUser,
  resetForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
