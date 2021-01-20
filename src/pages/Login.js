import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import UserForm from '../components/UserForm';
import { signIn } from '../redux/actions';
import { handleChangeForm, resetForm } from '../redux/actions/usersActions';

const Login = (props) => {
  const {
    reducer,
    usersReducer,
    usersReducer: { form },
    signIn,
    handleChangeForm,
    resetForm,
  } = props;

  const handleChange = (e) => {
    handleChangeForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    signIn(form);
  };

  if (reducer.loading || usersReducer.loading) return <PageLoading />;
  if (reducer.error || usersReducer.error) return <PageError />;
  return (
    <div className='container mt-4' style={{ maxWidth: '25rem' }}>
      <h1>Iniciar sesión</h1>
      <UserForm
        onChange={handleChange}
        formValues={form}
        onSubmit={handleSumbit}
        passwordRequired
        login
      />
      {reducer.message && <p className='text-danger'>{reducer.message}</p>}
      <p className='mt-3'>
        ¿No tienes una cuenta?&nbsp;
        <Link to='/signup' className='text-decoration-none' onClick={resetForm}>
          Registrate
        </Link>
      </p>
    </div>
  );
};

const mapStateToProps = ({ reducer, usersReducer }) => ({
  reducer,
  usersReducer,
});

const mapDispatchToProps = {
  signIn,
  handleChangeForm,
  resetForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
