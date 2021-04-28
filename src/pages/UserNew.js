import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Badge from '../components/Badge';
import PageError from '../components/screens/PageError';
import PageLoading from '../components/screens/PageLoading';
import PageUpload from '../components/screens/PageUpload';
import UserForm from '../components/UserForm';
import { signUp } from '../redux/actions';
import {
  getUsers, handleChangeUserForm,
} from '../redux/actions/usersActions';
import '../styles/components/UserEdit.scss';

/**
 * @typedef {import("../redux/reducers").GlobalState} GlobalState
 */

/**
 *
 * @param {GlobalState & {
 *  history: unknown[];
 *  handleChangeUserForm: handleChangeUserForm;
 *  signUp: signUp;
 *  getUsers: getUsers;
 * }} props
 * @returns
 */
const UserNew = (props) => {
  const {
    usersReducer: { form, users, uploading },
    handleChangeUserForm,
    signUp,
    history,
    reducer,
    getUsers,
  } = props;
  const handleChange = (e) => handleChangeUserForm({ ...form, [e.target.name]: e.target.value });

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
    <div className='UserEdit'>
      <div className='UserEdit__badge'>
        <Badge
          name={form.name || 'Nombre'}
          email={form.email || ''}
          birthdate={form.birthdate || new Date().toISOString()}
          bio={form.bio}
          instagram={form.instagram}
        />
      </div>

      <div className='UserEdit__form'>
        <h1 className='UserEdit__form--title'>Nuevo usuario</h1>
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

  );
};

const mapStateToProps = ({ reducer, usersReducer }) => ({
  reducer,
  usersReducer,
});

const mapDispatchToProps = {
  handleChangeUserForm,
  signUp,
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNew);
