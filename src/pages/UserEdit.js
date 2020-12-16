import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Badge from '../components/Badge';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import PageUpload from '../components/PageUpload';
import UserForm from '../components/UserForm';
import {
  handleChangeForm,
  putUser,
  resetForm,
  getAll as getUsers,
} from '../redux/actions/usersActions';

const UserEdit = (props) => {
  const {
    match: {
      params: { userId },
    },
    history,
    loading,
    currentUser,
    form,
    handleChangeForm,
    putUser,
    resetForm,
    users,
    error,
    getUsers,
  } = props;

  const [uploading, setUploading] = useState(false);
  const [emailUnique, setEmailUnique] = useState('');

  const handleChange = (e) => handleChangeForm({ ...form, [e.target.name]: e.target.value });

  const emailIsUnique = () => {
    return users
      .filter((el) => el.email !== currentUser.email)
      .find((el) => el.email === form.email);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (emailIsUnique()) {
      setEmailUnique('El correo electronico proporcionado ya existe. Por favor, introduzca uno diferente.');
    } else {
      setUploading(true);
      putUser(userId);
      history.push(`/users/${userId}`);
    }
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
    !users.length && getUsers();
  }, []);

  if (loading || !form) return <PageLoading />;
  if (uploading) return <PageUpload />;
  if (error) return <PageError />;
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
              emailUnique={emailUnique}
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
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
