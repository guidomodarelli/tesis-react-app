import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { handleChangeFormPub, postPub } from '../redux/actions/pubsActions';

/**
 * @typedef {import("../redux/reducers").FormError} FormError
 * @typedef {import('../redux/reducers/usersReducer').UserForm} UserForm
 * @typedef {import("../redux/reducers/pubsReducer").PubForm} PubForm
 */

/**
 *
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
        <div className='text-danger'>
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

/**
 *
 * @param {{
 *  form: UserForm;
 *  handleChangeFormPub: (form: PubForm) => (dispatch: Dispatch) => Promise<void>;
 *  postPub: () => (dispatch: Dispatch, getState: function(): {}) => Promise<void>;
 *  messageErrors: FormError[];
 * }} props
 * @returns
 */
function Publicar(props) {
  const { form, handleChangeFormPub, postPub, messageErrors } = props;
  const [checked, setChecked] = useState(true);
  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    postPub();
  };

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    if (e.target.name === 'body') {
      handleChangeFormPub({ ...form, body: e.target.value });
    } else {
      const newChecked = !checked;
      setChecked(newChecked);
      handleChangeFormPub({
        ...form,
        scope: newChecked ? 'private' : 'public',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='Badge p-3 mb-4 d-flex flex-column'>
      <ErrorMessages errors={messageErrors} />
      <TextareaAutosize
        type='text'
        className='form-control resize-none'
        maxRows={6}
        placeholder='¿Qué quieres compartir?'
        onChange={handleChange}
        value={form.body}
        name='body'
      />
      <div className='mt-2 form-check'>
        <input
          type='checkbox'
          className='form-check-input'
          id='scope'
          checked={checked}
          name='scope'
          onChange={handleChange}
        />
        <label htmlFor='scope' className='form-check-label'>
          {checked ? 'Privado' : 'Publico'}
        </label>
      </div>
      <button type='submit' className='btn btn-primary mt-2'>
        Publicar
      </button>
    </form>
  );
}

const mapStateToProps = ({ pubsReducer }) => {
  return pubsReducer;
};

const mapDispatchToProps = {
  handleChangeFormPub,
  postPub,
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicar);