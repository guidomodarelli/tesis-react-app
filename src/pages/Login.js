import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import UserForm from '../components/UserForm';
import { handleChangeSingIn, signIn } from '../redux/actions';

const Login = (props) => {
  const { loading, form, error } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    props.handleChangeSingIn({
      ...props.form,
      [name]: value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (await props.signIn(props.form)) {
      props.history.push('/users');
    }
  };

  if (error) {
    return <PageError />;
  }
  if (loading) {
    return <PageLoading />;
  }
  return (
    <div className='container mt-4' style={{ maxWidth: '25rem' }}>
      <h1>Iniciar sesión</h1>
      <UserForm
        onChange={handleChange}
        formValues={form}
        onSubmit={handleSumbit}
        error={error}
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

const mapStateToProps = (reducers) => {
  return {
    loading: reducers.reducer.loading,
    error: reducers.reducer.error,
    form: reducers.reducer.form,
  };
};

const mapDispatchToProps = {
  signIn,
  handleChangeSingIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
