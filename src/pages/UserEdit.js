import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Badge from '../components/Badge';
import PageError from '../components/screens/PageError';
import PageLoading from '../components/screens/PageLoading';
import PageUpload from '../components/screens/PageUpload';
import UserForm from '../components/UserForm';
import {
  getAll as getUsers, handleChangeForm,
  putUser,
  resetForm,
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
    uploading,
  } = props;

  const handleChange = (e) => handleChangeForm({ ...form, [e.target.name]: e.target.value });

  const handleSumbit = (e) => {
    e.preventDefault();
    putUser(userId);
    history.push(`/users/${userId}`);
  };

  const handleCancel = () => {
    resetForm();
    history.push(`/users/${userId}`);
  };

  useEffect(() => {
    const {
      name,
      birthdate,
      bio,
      instagram,
      email,
    } = currentUser;
    handleChangeForm({
      ...form,
      name,
      birthdate,
      bio: bio || '',
      instagram: instagram || '',
      email,
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
              name={form.name}
              email={form.email}
              birthdate={form.birthdate || new Date().toISOString()}
              bio={form.bio}
              instagram={form.instagram}
            />
          </div>

          <div className='col mt-4 mb-4'>
            <h1>Editar usuario</h1>
            <UserForm
              onChange={handleChange}
              formValues={form}
              onSubmit={handleSumbit}
              onCancel={handleCancel}
              login={false}
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
