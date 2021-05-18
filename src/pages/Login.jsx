import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageError from '../components/screens/PageError';
import PageLoading from '../components/screens/PageLoading';
import UserForm from '../components/UserForm';
import { signIn, resetMessageErrors } from '../redux/actions';
import { handleChangeUserForm, resetUserForm } from '../redux/actions/usersActions';

/**
 * @typedef {import("../redux/reducers").GlobalState} GlobalState
 */

/**
 *
 * @param {GlobalState & {
 *  signIn: signIn;
 *  handleChangeUserForm: handleChangeUserForm;
 *  resetUserForm: resetUserForm;
 *  resetMessageErrors: resetMessageErrors;
 * }} props
 * @returns
 */
const Login = (props) => {
  const {
    reducer,
    usersReducer,
    usersReducer: { form },
    signIn,
    handleChangeUserForm,
    resetUserForm,
    resetMessageErrors,
  } = props;

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    handleChangeUserForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSumbit = (e) => {
    e.preventDefault();
    signIn({
      email: form.email,
      password: form.password,
    });
  };

  const handleClick = () => {
    resetUserForm();
    resetMessageErrors();
  };

  if (reducer.loading || usersReducer.loading) return <PageLoading />;
  if (reducer.error || usersReducer.error) return <PageError />;
  return (
    <div className='UserEdit flex-col max-w-lg mx-auto mt-4'>
      <h1 className='title'>Iniciar sesión</h1>
      <UserForm
        onChange={handleChange}
        formValues={form}
        onSubmit={handleSumbit}
        passwordRequired
        login
      />
      {reducer.messageErrors && (
        <div className='mt-3 has-text-danger'>
          {reducer.messageErrors.map((obj) => (
            <p key={obj}>{obj.message}</p>
          ))}
        </div>
      )}
      <p className='mt-2'>
        ¿No tienes una cuenta?&nbsp;
        <Link to='/signup' onClick={handleClick}>
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
  handleChangeUserForm,
  resetUserForm,
  resetMessageErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
