import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Badge from '../components/Badge';
import PageError from '../components/screens/PageError';
import PageLoading from '../components/screens/PageLoading';
import PageUpload from '../components/screens/PageUpload';
import UserForm from '../components/UserForm';
import {
  getUsers,
  handleChangeUserForm,
  putUser,
} from '../redux/actions/usersActions';

/**
 *
 * @typedef {import("../redux/reducers/usersReducer").User} User
 * @typedef {import("../redux/reducers/usersReducer").UserForm} UserForm
 * @typedef {import("../redux/reducers").FormError} FormError
 */

/**
 *
 * @param {{
 *  match: {
 *    params: {
 *      userId: string;
 *    };
 *  };
 *  history: unknown[];
 *  loading: boolean;
 *  currentUser: User;
 *  form: UserForm;
 *  users: User[];
 *  error: string;
 *  uploading: boolean;
 *  messageErrors: FormError[];
 *  handleChangeUserForm: handleChangeUserForm;
 *  putUser: putUser;
 *  getUsers: getUsers;
 * }} props
 * @returns
 */
const UserEdit = (props) => {
  const {
    match: {
      params: { userId },
    },
    history,
    loading,
    currentUser,
    form,
    handleChangeUserForm,
    putUser,
    users,
    error,
    getUsers,
    uploading,
    messageErrors,
  } = props;

  const handleChange = (e) => handleChangeUserForm({ ...form, [e.target.name]: e.target.value });

  const handleSumbit = (e) => {
    e.preventDefault();
    putUser(userId, history);
  };

  const handleCancel = () => {
    history.push(`/users/${userId}`);
  };

  useEffect(() => {
    const { name, birthdate, bio, instagram, email } = currentUser;
    handleChangeUserForm({
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
              messageErrors={messageErrors}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ usersReducer, reducer: { messageErrors } }) => ({
  ...usersReducer,
  messageErrors,
});

const mapDispatchToProps = {
  handleChangeUserForm,
  putUser,
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
