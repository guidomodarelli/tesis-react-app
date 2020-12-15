import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import UserForm from '../components/UserForm';
import { handleChangeSingIn, signIn } from '../redux/actions';

const Login = (props) => {
  const { reducer: { loading, error, form }, signIn, handleChangeSingIn } = props;

  const handleChange = (e) => {
    handleChangeSingIn({ ...form, [e.target.name]: e.target.value });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    signIn(form);
  };

  if (error) return <PageError />;
  if (loading) return <PageLoading />;
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
      <p className='mt-3'>
        ¿No tienes una cuenta?&nbsp;
        <Link to='/signup' className='text-decoration-none'>
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
  handleChangeSingIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
