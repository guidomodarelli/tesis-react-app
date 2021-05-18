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
import '../styles/components/UserEdit.scss';

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
    <div className='UserEdit'>
      <div className='UserEdit__badge'>
        <Badge
          name={form.name}
          email={form.email}
          birthdate={form.birthdate || new Date().toISOString()}
          bio={form.bio}
          instagram={form.instagram}
        />
      </div>

      <div className='UserEdit__form'>
        <h1 className='title has-text-centered'>Editar usuario</h1>
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
