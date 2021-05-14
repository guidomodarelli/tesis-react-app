import * as dotenv from 'dotenv';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ChatInput from '../../components/Chats/ChatInput';
import MessageList from '../../components/Chats/MessageList';
import '../../styles/components/Chat.scss';

dotenv.config();

const {
  REACT_APP_SERVER_HOST: host,
  REACT_APP_SERVER_WEBSOCKET_PORT: port,
} = process.env;
const client = new W3CWebSocket(`ws://${host}:${port}`);

const ChatGral = (props) => {
  const { currentUser } = props;
  /** @type {React.MutableRefObject<HTMLInputElement>} */
  const refInput = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    client.onopen = () => {
      console.info('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      setMessages((messages) => [...messages, dataFromServer]);
    };
  }, []);

  /** @param {React.FormEvent<HTMLFormElement>} event */
  const handleSubmit = (event) => {
    event.preventDefault();
    client.send(
      JSON.stringify({
        creator: currentUser.id,
        message: refInput.current.value,
        createdAt: new Date(),
      }),
    );
    refInput.current.value = '';
  };

  return (
    <div className='Chat'>
      <MessageList messages={messages} />
      <ChatInput ref={refInput} handleSubmit={handleSubmit} />
    </div>
  );
};

const mapStateToProps = ({ usersReducer }) => usersReducer;

export default connect(mapStateToProps, null)(ChatGral);