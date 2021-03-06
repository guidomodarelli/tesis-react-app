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

  const innerHandleSubmit = (e) => {
    setDisabled(true);
    handleSubmit(e);
  };

  return (
    <div className='flex justify-center'>
      <form className='field has-addons' onSubmit={innerHandleSubmit}>
        <div className='mb-2 control'>
          <input
            className='input'
            type='text'
            placeholder='Escribe un mensaje...'
            onChange={handleChange}
            ref={ref}
          />
        </div>
        <div className='mr-1 control'>
          <button className='button is-info' type='submit' disabled={disabled}>
            <i className='fa fa-send' />
          </button>
        </div>
      </form>
    </div>
  );
});

export default ChatInput;
