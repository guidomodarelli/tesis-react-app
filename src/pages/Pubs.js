import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Publicar from '../components/Publicar';
import Publication from '../components/Publication';
import PageEmpty from '../components/screens/PageEmpty';
import PageError from '../components/screens/PageError';
import PageLoading from '../components/screens/PageLoading';
import { getAllPubs, getNextPage } from '../redux/actions/pubsActions';
import { getAll as getAllUsers } from '../redux/actions/usersActions';
import DivContainer from './Users/styles';

/**
 *
 * @typedef {import('../redux/reducers/pubsReducer').Publication} Publication
 * @typedef {import("../redux/reducers/usersReducer").User} User
 */

/**
 *
 * @param {{
 *  pubsReducer: {
 *    pubs: Publication[];
 *    page: number;
 *    pages: number;
 *    loading: boolean;
 *    error: string;
 *  };
 *  usersReducer: {
 *    users: User[];
 *    currentUser: User;
 *    loading: boolean;
 *    error: string;
 *  };
 *  getAllPubs: getAllPubs;
 *  getAllUsers: getAllUsers;
 *  getNextPage: getNextPage;
 * }} props
 * @returns
 */
const Pubs = (props) => {
  const {
    pubsReducer,
    usersReducer,
    pubsReducer: { pubs, page, pages },
    usersReducer: { users, currentUser },
    getAllPubs,
    getAllUsers,
    getNextPage,
  } = props;

  useEffect(() => {
    if (!pubs.length) {
      getAllPubs();
    }
    if (!users.length) {
      getAllUsers();
    }
  }, []);

  /**
   *
   * @param {string} userId
   * @returns {User}
   */
  const getCreator = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      return user;
    }
    return '';
  };

  function handleClick() {
    getNextPage();
  }

  if (pubsReducer.loading || usersReducer.loading) return <PageLoading />;
  if (pubsReducer.error || usersReducer.error) return <PageError />;
  return (
    <DivContainer>
      <h1 className='text-center fw-bold mb-4'>Publicaciones</h1>
      <Publicar />
      {pubs.length ? (
        pubs.map((pub) => {
          const user = getCreator(pub.creator);
          const { favUsers } = pub;
          return (
            <Publication
              key={pub.id}
              id={pub.id}
              name={user.name}
              body={pub.body}
              favs={pub.favs}
              createdAt={pub.createdAt}
              email={user.email}
              scope={pub.scope}
              fav={favUsers ? favUsers.includes(currentUser.id) : false}
            />
          );
        })
      ) : (
        <PageEmpty msg='No encontramos ninguna publicación' />
      )}
      {page < pages && (
        <div className='d-flex justify-content-center'>
          <button
            type='button'
            className='btn btn-outline-secondary'
            onClick={handleClick}
          >
            Cargar más...
          </button>
        </div>
      )}
    </DivContainer>
  );
};

const mapStateToProps = ({ pubsReducer, usersReducer }) => {
  return {
    pubsReducer,
    usersReducer,
  };
};

const mapDispatchToProps = {
  getAllPubs,
  getAllUsers,
  getNextPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pubs);
