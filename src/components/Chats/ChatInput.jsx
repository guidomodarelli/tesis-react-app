import React from 'react';

const ChatInput = React.forwardRef((props, ref) => {
  const { handleSubmit } = props;
  return (
    <div className='ChatInput'>
      <form className='field has-addons' onSubmit={handleSubmit}>
        <div className='ChatInput__input control'>
          <input
            className='input'
            type='text'
            placeholder='Escribe un mensaje...'
            ref={ref}
          />
        </div>
        <div className='ChatInput__button control'>
          <button className='button is-info' type='submit'>
            <i className='fa fa-send' />
          </button>
        </div>
      </form>
    </div>
  );
});

export default ChatInput;
