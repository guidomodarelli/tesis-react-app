import React from 'react';

const InputCheckBox = ({ checked, onChange: handleChange, disabled, name, label }) => {
  return (
    <div className='field'>
      <div className='control'>
        <label className='checkbox'>
          <input
            className='mr-2'
            type='checkbox'
            name={name}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
          />
          {label}
        </label>
      </div>
    </div>
  );
};

export default InputCheckBox;
