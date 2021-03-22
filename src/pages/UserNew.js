import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Badge from '../components/Badge';
import PageError from '../components/screens/PageError';
import PageLoading from '../components/screens/PageLoading';
import PageUpload from '../components/screens/PageUpload';
import UserForm from '../components/UserForm';
import { signUp } from '../redux/actions';
import {
  getAll as getUsers, handleChangeForm,
} from '../redux/actions/usersActions';

/**
 * @typedef {import("../redux/reducers/usersReducer").UserForm} UserForm
 * @typedef {import("../redux/reducers/usersReducer").User} User
 * @typedef {import("../redux/reducers").FormError} FormError
 */

/**
 *
 * @param {{
 *  usersReducer: {
 *    form: UserForm,
 *    users: User[];
 *    uploading: boolean;
 *  };
 *  history: unknown[];
 *  reducer: {
 *    loading: boolean;
 *    error: string;
 *    messageErrors: FormError;
 *  };
 *  handleChangeForm: handleChangeForm;
 *  signUp: signUp;
 *  getUsers: getUsers;
 * }} props
 * @returns
 */
const UserNew = (props) => {
  const {
    usersReducer: { form, users, uploading },
    handleChangeForm,
    signUp,
    history,
    reducer,
    getUsers,
  } = props;
  const handleChange = (e) => handleChangeForm({ ...form, [e.target.name]: e.target.value });

  const handleSumbit = (e) => {
    e.preventDefault();
    signUp(form, history);
  };

  const handleCancel = () => {
    history.push('/login');
  };

  const fetchUsers = () => {
    if (!users.length) {
      getUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
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
              name={form.name || 'Nombre'}
              email={form.email || ''}
              birthdate={form.birthdate || new Date().toISOString()}
              bio={form.bio || 'Presentación'}
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
              login={false}
              messageErrors={reducer.messageErrors}
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
  signUp,
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNew);
