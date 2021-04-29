import * as dotenv from 'dotenv';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import '../styles/components/Chat.scss';

dotenv.config();

const {
  REACT_APP_SERVER_HOST: host,
  REACT_APP_SERVER_WEBSOCKET_PORT: port,
} = process.env;
const client = new W3CWebSocket(`ws://${host}:${port}`);

const ChatGral = (props) => {
  const { currentUser } = props;
  const refInput = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    client.onopen = () => {
      console.info('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      setMessages([...messages, dataFromServer]);
    };
  }, []);

  /** @param {React.FormEvent<HTMLFormElement>} event */
  const handleSubmit = (event) => {
    event.preventDefault();
    client.send(
      JSON.stringify({
        creator: currentUser.id,
        message: refInput.current.value,
      }),
    );
  };

  return (
    <div className='Chat'>
      <div>{messages.map((el) => el.message)}</div>
      <div className='Chat__form'>
        <form className='field has-addons' onSubmit={handleSubmit}>
          <div className='Chat__form--input control'>
            <input
              className='input'
              type='text'
              placeholder='Escribe un mensaje...'
              ref={refInput}
            />
          </div>
          <div className='Chat__form--button control'>
            <button className='button is-info' type='submit'>
              <i className='fa fa-send' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ usersReducer }) => usersReducer;

export default connect(mapStateToProps, null)(ChatGral);
