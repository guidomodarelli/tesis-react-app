import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
  if (!pubs.length) {
    return <PageEmpty msg='No encontramos ninguna publicación' />;
  }
  return (
    <DivContainer>
      <div className='d-flex align-items-baseline justify-content-center mb-4'>
        <h1 className='fw-bold'>Publicaciones</h1>
      </div>
      {pubs.map((pub) => {
        const creator = getCreator(pub.creator);
        return (
          <Publication
            key={pub.id}
            name={creator.name}
            body={pub.body}
            favs={pub.numberOfFavs}
            createdAt={pub.createdAt}
            email={creator.email}
            fav={false}
          />
        );
      })}
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
