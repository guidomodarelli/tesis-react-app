import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Badge from '../components/Badge';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import PageUpload from '../components/PageUpload';
import UserForm from '../components/UserForm';
import {
  handleChangeForm,
  resetForm,
  getAll as getUsers,
} from '../redux/actions/usersActions';
import { signUp } from '../redux/actions';

const UserNew = (props) => {
  const {
    usersReducer: { form, users, currentUser },
    handleChangeForm,
    resetForm,
    signUp,
    history,
    reducer,
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
      setEmailUnique(
        'El correo electronico proporcionado ya existe. Por favor, introduzca uno diferente.',
      );
    } else {
      setUploading(true);
      signUp(form);
      history.push('/login');
    }
  };

  const handleCancel = () => {
    resetForm();
    history.push('/login');
  };

  useEffect(() => {
    !users.length && getUsers();
  }, []);

  if (uploading) return <PageUpload />;
  if (reducer.loading) return <PageLoading />;
  if (reducer.error) return <PageError />;
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
              emailUnique={emailUnique}
              onCancel={handleCancel}
              passwordRequired
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ reducer, usersReducer }) => ({
  reducer,
  usersReducer,
});

const mapDispatchToProps = {
  handleChangeForm,
  resetForm,
  signUp,
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNew);
