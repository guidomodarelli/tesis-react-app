import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { handleChangePubForm, postPub } from '../redux/actions/pubsActions';
import '../styles/components/BadgePub.scss';

/**
 * @typedef {import("../redux/reducers").FormError} FormError
 * @typedef {import("../redux/reducers/pubsReducer").StatePubsReducer} StatePubsReducer
 * @typedef {import("../redux/actions/pubsActions").DispatchsPubsReducer} DispatchsPubsReducer
 */

/**
 * @param {{
 *  errors: FormError[]
 * }} props
 * @returns
 */
function ErrorMessages(props) {
  const { errors } = props;
  return (
    <>
      {errors.length !== 0 && (
        <div className='BadgePub__Error'>
          {errors.map((obj) => (
            <p key={obj.message}>
              -
              {' '}
              {obj.message}
            </p>
          ))}
        </div>
      )}
    </>
  );
}

/** @param {StatePubsReducer & DispatchsPubsReducer} props */
function Publicar(props) {
  const { form, handleChangePubForm, postPub, messageErrors } = props;
  const [checked, setChecked] = useState(true);

  /** @param {React.FormEvent<HTMLFormElement>} e */
  const handleSubmit = (e) => {
    e.preventDefault();
    postPub();
  };

  /** @param {React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>} e */
  const handleChange = (e) => {
    if (e.target.name === 'body') {
      handleChangePubForm({ ...form, body: e.target.value });
    } else {
      const newChecked = !checked;
      setChecked(newChecked);
      handleChangePubForm({
        ...form,
        scope: newChecked ? 'private' : 'public',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='BadgePub mb-7 mx-auto shadow-lg rounded-lg overflow-hidden max-w-sm border border-opacity-20 border-black'>
      <ErrorMessages errors={messageErrors} />
      <TextareaAutosize
        type='text'
        className='input'
        maxRows={6}
        placeholder='¿Qué quieres compartir?'
        onChange={handleChange}
        value={form.body}
        name='body'
      />
      <div className='field mt-2'>
        <div className='control'>
          <label className='checkbox'>
            <input
              type='checkbox'
              className='mr-1'
              checked={checked}
              name='scope'
              onChange={handleChange}
            />
            {checked ? 'Privado' : 'Publico'}
          </label>
        </div>
      </div>
      <button type='submit' className='button is-link'>
        Publicar
      </button>
    </form>
  );
}

const mapStateToProps = ({ pubsReducer }) => {
  return pubsReducer;
};

const mapDispatchToProps = {
  handleChangePubForm,
  postPub,
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicar);
