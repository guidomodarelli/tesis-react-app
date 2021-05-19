import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../redux/actions/usersActions';
import Message from './Message';

/**
 *
 * @typedef {import("../../redux/reducers/usersReducer").User} User
 * @param {{
 *  messages: {
 *    message: string;
 *    creator: string;
 *    createdAt: string;
 *  }[],
 *  users: User[];
 *  currentUser: User;
 * }} props
 */
const MessageList = (props) => {
  const { messages, users, getUsers, currentUser } = props;

  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
  }, []);

  const getNameCreator = (userID) => {
    const user = users.find((user) => user.id === userID);
    return user?.name;
  };

  return (
    <>
      {messages?.map((el) => {
        const isCurrentUser = currentUser.id === el.creator;
        return (
          <Message
            key={el.createdAt}
            message={el.body}
            creator={getNameCreator(el.creator)}
            time={new Date(el.createdAt)}
            currentUser={isCurrentUser}
          />
        );
      })}
    </>
  );
};

const mapStateToProps = ({ usersReducer }) => usersReducer;

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
