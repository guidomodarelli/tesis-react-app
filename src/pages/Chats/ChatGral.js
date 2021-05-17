import * as dotenv from 'dotenv';
import React, { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ChatInput from '../../components/Chats/ChatInput';
import MessageList from '../../components/Chats/MessageList';
import '../../styles/components/Chat.scss';
import { getChatsGral, addMsgGralByTag } from '../../redux/actions/chatActions';
import { CHAT_ADD_MESSAGE } from '../../redux/types/chatTypes';

dotenv.config();

const client = new W3CWebSocket(
  `ws://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_WS_PORT}`,
);

const ChatGral = (props) => {
  const { getChatsGral, addMsgGralByTag, general } = props;

  const dispatch = useDispatch();

  /** @type {React.LegacyRef<HTMLInputElement>} */
  const refInput = useRef(null);
  /** @type {React.LegacyRef<HTMLDivElement>} */
  const refDiv = useRef(null);

  const chatScrollTop = () => {
    refDiv.current.scrollTop = refDiv.current?.scrollHeight;
  };

  useEffect(() => {
    if (!general.general.length) {
      getChatsGral().then(() => {
        setTimeout(() => {
          chatScrollTop();
        }, 50);
      });
    } else {
      chatScrollTop();
    }
    client.onopen = () => {
      console.info('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const msg = JSON.parse(message.data);
      dispatch({
        type: CHAT_ADD_MESSAGE,
        payload: { message: msg },
      });
      chatScrollTop();
    };
  }, []);

  /** @param {React.FormEvent<HTMLFormElement>} event */
  const handleSubmit = (event) => {
    event.preventDefault();
    const tag = 'general';
    const message = refInput.current.value;
    addMsgGralByTag(tag, message).then((msg) => {
      client.send(JSON.stringify(msg));
      chatScrollTop();
    });
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

const mapStateToProps = ({ chatReducer }) => chatReducer;

const mapDispatchToProps = {
  getChatsGral,
  addMsgGralByTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatGral);
