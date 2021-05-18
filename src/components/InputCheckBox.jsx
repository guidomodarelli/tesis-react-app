import React from 'react';
import classNames from 'classnames';

const InputCheckBox = ({ checked, onChange: handleChange, disabled, name, label }) => {
  return (
    <div className='field'>
      <div className='control'>
        <label className={classNames('checkbox', disabled && 'line-through')}>
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
