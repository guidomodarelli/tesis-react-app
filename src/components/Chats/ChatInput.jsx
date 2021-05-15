import React, { useState } from 'react';

const ChatInput = React.forwardRef((props, ref) => {
  const { handleSubmit } = props;
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    if (!e.target.value) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  return (
    <div className='ChatInput'>
      <form className='field has-addons' onSubmit={handleSubmit}>
        <div className='ChatInput__input control'>
          <input
            className='input'
            type='text'
            placeholder='Escribe un mensaje...'
            onChange={handleChange}
            ref={ref}
          />
        </div>
        <div className='ChatInput__button control'>
          <button className='button is-info' type='submit' disabled={disabled}>
            <i className='fa fa-send' />
          </button>
        </div>
      </form>
    </div>
  );
});

export default ChatInput;
