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
 *  users: User[]
 * }} props
 */
const MessageList = (props) => {
  const { messages, users, getUsers } = props;

  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
  }, []);

  const getNameCreator = (userID) => {
    const user = users.find((user) => user.id === userID);
    return user.name;
  };

  return (
    <div className='ChatMessageList'>
      {messages.map((el) => (
        <Message
          key={el.createdAt}
          message={el.message}
          creator={getNameCreator(el.creator)}
          time={new Date(el.createdAt)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ usersReducer }) => usersReducer;

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
