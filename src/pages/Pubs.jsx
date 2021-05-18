import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Publicar from '../components/Publicar';
import Publication from '../components/Publication';
import PageEmpty from '../components/screens/PageEmpty';
import PageError from '../components/screens/PageError';
import PageLoading from '../components/screens/PageLoading';
import { getPubs, getPubsNextPage, emptyMessageErrors } from '../redux/actions/pubsActions';
import { getUsers } from '../redux/actions/usersActions';

/**
 * @typedef {import("../redux/reducers/usersReducer").User} User
 * @typedef {import("../redux/reducers").GlobalState} GlobalState
 * @typedef {import("../redux/actions").GlobalDispatchs} GlobalDispatchs
 */

/**
 *
 * @param {GlobalState & GlobalDispatchs} props
 * @returns
 */
const Pubs = (props) => {
  const {
    pubsReducer,
    usersReducer,
    pubsReducer: { pubs, page, pages },
    usersReducer: { users, currentUser },
    getPubs,
    getUsers,
    getPubsNextPage,
    emptyMessageErrors,
  } = props;

  useEffect(() => {
    emptyMessageErrors();
    if (!pubs.length) {
      getPubs();
    }
    if (!users.length) {
      getUsers();
    }
  }, []);

  /**
   *
   * @param {string} userId
   * @returns {User | {}}
   */
  const getCreator = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      return user;
    }
    return {};
  };

  function handleClick() {
    getPubsNextPage();
  }

  if (pubsReducer.loading || usersReducer.loading) return <PageLoading />;
  if (pubsReducer.error || usersReducer.error) return <PageError />;
  return (
    <div className='w-full max-w-xl mx-auto px-4 mt-4 pb-4'>
      <h1 className='text-center font-bold mb-4 title'>Publicaciones</h1>
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
        <div className='flex justify-center'>
          <button
            type='button'
            className='button is-link is-light'
            onClick={handleClick}
          >
            Cargar más...
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ pubsReducer, usersReducer }) => {
  return {
    pubsReducer,
    usersReducer,
  };
};

const mapDispatchToProps = {
  getPubs,
  getUsers,
  getPubsNextPage,
  emptyMessageErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pubs);
