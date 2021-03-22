import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageError from '../../components/screens/PageError';
import PageLoading from '../../components/screens/PageLoading';
import UserForm from '../../components/UserForm';
import { signIn, resetMessageErrors } from '../../redux/actions';
import { handleChangeForm, resetForm } from '../../redux/actions/usersActions';
import Div from './styles';

/**
 * @typedef {import("../../redux/reducers").FormError} FormError
 * @typedef {import("../../redux/reducers/usersReducer").UserForm} UserForm
 */

/**
 *
 * @param {{
 *  reducer: {
 *    error: string;
 *    loading: boolean;
 *    messageErrors: FormError[];
 *  };
 *  usersReducer: {
 *    error: string;
 *    loading: boolean;
 *    form: UserForm;
 *  };
 *  signIn: signIn;
 *  handleChangeForm: handleChangeForm;
 *  resetForm: resetForm;
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
    handleChangeForm,
    resetForm,
    resetMessageErrors,
  } = props;

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    handleChangeForm({ ...form, [e.target.name]: e.target.value });
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
    resetForm();
    resetMessageErrors();
  };

  if (reducer.loading || usersReducer.loading) return <PageLoading />;
  if (reducer.error || usersReducer.error) return <PageError />;
  return (
    <Div className='container mt-4'>
      <h1>Iniciar sesión</h1>
      <UserForm
        onChange={handleChange}
        formValues={form}
        onSubmit={handleSumbit}
        passwordRequired
        login
      />
      {reducer.messageErrors && (
        <div className='mt-3 text-danger'>
          {reducer.messageErrors.map((obj) => (
            <p key={obj}>{obj.message}</p>
          ))}
        </div>
      )}
      <p className='mt-2'>
        ¿No tienes una cuenta?&nbsp;
        <Link to='/signup' className='text-decoration-none' onClick={handleClick}>
          Registrate
        </Link>
      </p>
    </Div>
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
  resetMessageErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
