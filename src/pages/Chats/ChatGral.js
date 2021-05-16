import * as dotenv from 'dotenv';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ChatInput from '../../components/Chats/ChatInput';
import MessageList from '../../components/Chats/MessageList';
import '../../styles/components/Chat.scss';
import { getChatsGral } from '../../redux/actions/chatActions';

dotenv.config();

const client = new W3CWebSocket(
  `ws://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_WS_PORT}`,
);

const ChatGral = (props) => {
  const {
    usersReducer: { currentUser },
    getChatsGral,
    chatReducer: { general },
  } = props;

  /** @type {React.LegacyRef<HTMLInputElement>} */
  const refInput = useRef(null);
  /** @type {React.LegacyRef<HTMLDivElement>} */
  const refDiv = useRef(null);
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    getChatsGral();
    client.onopen = () => {
      console.info('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      // const dataFromServer = JSON.parse(message.data);
      // setMessages((messages) => messages.concat(dataFromServer));
      refDiv.current.scrollTop = refDiv.current?.scrollHeight;
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
    refInput.current.focus();
  };

  return (
    <>
      <div className='Chat' ref={refDiv}>
        <MessageList messages={general.general} />
      </div>
      <ChatInput ref={refInput} handleSubmit={handleSubmit} />
    </>
  );
};

const mapStateToProps = ({ usersReducer, chatReducer }) => ({
  usersReducer,
  chatReducer,
});

const mapDispatchToProps = {
  getChatsGral,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatGral);
