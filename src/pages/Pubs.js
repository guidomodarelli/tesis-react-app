import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Publicar from '../components/Publicar';
import Publication from '../components/Publication';
import PageEmpty from '../components/screens/PageEmpty';
import PageError from '../components/screens/PageError';
import PageLoading from '../components/screens/PageLoading';
import { getAllPubs } from '../redux/actions/pubsActions';
import { getAll as getAllUsers } from '../redux/actions/usersActions';
import DivContainer from './Users/styles';

const Pubs = (props) => {
  const {
    pubsReducer,
    usersReducer,
    pubsReducer: { pubs },
    usersReducer: { users },
    getAllPubs,
    getAllUsers,
  } = props;

  useEffect(() => {
    if (!pubs.lenght) {
      getAllPubs();
    }
    if (!users.lenght) {
      getAllUsers();
    }
  }, []);

  const getCreator = (creator) => {
    const user = users.find((user) => user.id === creator);
    if (user) {
      return user;
    }
    return '';
  };

  if (pubsReducer.loading || usersReducer.loading) return <PageLoading />;
  if (pubsReducer.error || usersReducer.error) return <PageError />;
  return (
    <DivContainer>
      <h1 className='text-center fw-bold mb-4'>Publicaciones</h1>
      <Publicar />
      {pubs.length ? (
        pubs.map((pub) => {
          const creator = getCreator(pub.creator);
          return (
            <Publication
              key={pub.id}
              name={creator.name}
              body={pub.body}
              favs={pub.favs}
              createdAt={pub.createdAt}
              email={creator.email}
              scope={pub.scope}
              fav={false}
            />
          );
        })
      ) : (
        <PageEmpty msg='No encontramos ninguna publicación' />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Pubs);
