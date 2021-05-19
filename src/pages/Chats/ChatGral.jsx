import * as dotenv from 'dotenv';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ChatInput from '../../components/Chats/ChatInput';
import MessageList from '../../components/Chats/MessageList';
import { getChatsGral, addMsgGralByTag } from '../../redux/actions/chatActions';
import { CHAT_ADD_MESSAGE } from '../../redux/types/chatTypes';

dotenv.config();

const client = new W3CWebSocket(
  `ws://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_WS_PORT}`,
);

const useStyles = makeStyles(() => ({
  height: {
    height: 'calc(100% - 3.25rem)',
  },
}));

const ChatGral = (props) => {
  const { getChatsGral, addMsgGralByTag, general } = props;
  const classes = useStyles();

  const dispatch = useDispatch();

  /** @type {React.LegacyRef<HTMLInputElement>} */
  const refInput = React.createRef();
  /** @type {React.LegacyRef<HTMLDivElement>} */
  const refDiv = React.useRef(null);

  const chatScrollTop = () => {
    if (refDiv.current) {
      refDiv.current.scrollTop = refDiv.current.scrollHeight;
    }
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
    <div className={`${classes.height} flex flex-col items-center`}>
      <div
        className='overflow-y-auto flex flex-col items-start max-w-3xl w-full'
        ref={refDiv}
      >
        <MessageList messages={general.general} />
      </div>
      <ChatInput ref={refInput} handleSubmit={handleSubmit} />
    </div>
  );
};

const mapStateToProps = ({ chatReducer }) => chatReducer;

const mapDispatchToProps = {
  getChatsGral,
  addMsgGralByTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatGral);
