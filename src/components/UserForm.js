import classNames from 'classnames';
import React, { useState } from 'react';

const MsgInputError = (props) => {
  const { msg, validated } = props;

  const setFeedbackMsg = (value) => {
    return classNames(
      'd-block',
      validated && (value ? 'invalid-feedback' : 'valid-feedback'),
    );
  };

  return (
    <div className={setFeedbackMsg(msg)}>
      {validated && (msg || 'Correcto!')}
    </div>
  );
};

const UserForm = (props) => {
  const { onCancel } = props;

  const [validated, setValidated] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstname: null,
    lastname: null,
    email: null,
    birthdate: null,
    jobtitle: null,
    instagram: null,
    password: null,
  });
  const { onSubmit, onChange, formValues, passwordRequired, login } = props;
  const {
    firstname,
    lastname,
    email,
    birthdate,
    jobtitle,
    instagram,
    password,
  } = formErrors;

  const REGEX = {
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    /*
     * Valida que contenga al menos un número y una
     * letra mayúscula y minúscula, y al menos 8 caracteres o más.
     */
    name: /^[A-Z][a-z]{2,24}$/,
    /*
     * Valida que la primer letra sea mayúscula, seguido
     * de todas letras minúsculas con un minimo de 3
     * caracteres y un maximo de 25.
     */
    email: /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/,
    date: /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])(T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?)?$/,
    instagramAccount: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/i,
  };

  const MessageError = {
    minYear: (year) => `El año debe ser inferior a ${year}.`,
    maxYear: (year) => `El año debe ser superior a ${year}.`,
    name: (name) => `El ${name} debe contener letras mayúsculas o minúsculas con excepción de la primera que debe ser mayúscula, y con una longitud de entre 3 y 25 caracteres.`,
    password:
      'La contraseña debe contener al menos un número y una letra mayúscula y minúscula, con al menos 8 caracteres o más.',
    required: 'Este campo es requerido',
    valid: (field) => `Este campo deberia ser un/a ${field} valido/a`,
  };

  const handleFieldsRequired = (formErrors) => {
    let _hasErrors = false;
    if (!login) {
      if (!formValues.firstname) {
        formErrors.firstname = MessageError.required;
        _hasErrors = true;
      }
      if (!formValues.lastname) {
        formErrors.lastname = MessageError.required;
        _hasErrors = true;
      }
      if (!formValues.birthdate) {
        formErrors.birthdate = MessageError.required;
        _hasErrors = true;
      }
    }
    if (!formValues.email) {
      formErrors.email = MessageError.required;
      _hasErrors = true;
    }
    if (passwordRequired && !formValues.password) {
      formErrors.password = MessageError.required;
      _hasErrors = true;
    }
    return _hasErrors;
  };

  const validDate = (birthdate) => {
    const today = new Date();
    const age = today;
    const minYear = today.getFullYear() - 10;
    age.setFullYear(minYear);
    if (birthdate > age) {
      return MessageError.minYear(minYear);
    }
    const maxYear = today.getFullYear() - 80;
    age.setFullYear(maxYear);
    if (birthdate < age) {
      return MessageError.maxYear(maxYear);
    }
    return '';
  };

  const hasErrors = () => {
    let _hasErrors = false;
    const formErrors = {};
    if (handleFieldsRequired(formErrors)) {
      _hasErrors = true;
    }
    if (!login) {
      if (formValues.firstname && !REGEX.name.test(formValues.firstname)) {
        formErrors.firstname = MessageError.name('nombre');
        _hasErrors = true;
      }
      if (formValues.lastname && !REGEX.name.test(formValues.lastname)) {
        formErrors.lastname = MessageError.name('apellido');
        _hasErrors = true;
      }
      if (formValues.birthdate) {
        if (!REGEX.date.test(formValues.birthdate)) {
          formErrors.birthdate = MessageError.valid('fecha');
          _hasErrors = true;
        } else {
          const msg = validDate(new Date(formValues.birthdate));
          if (msg) {
            formErrors.birthdate = msg;
            _hasErrors = true;
          }
        }
      }
      if (
        formValues.instagram &&
        !REGEX.instagramAccount.test(formValues.instagram)
      ) {
        formErrors.instagram = MessageError.valid('cuenta de instagram');
        _hasErrors = true;
      }
    }
    if (formValues.email && !REGEX['email'].test(formValues.email)) {
      formErrors.email = `${MessageError.valid('email')} (usuario@ejemplo.com)`;
      _hasErrors = true;
    }
    if (formValues.password && !REGEX.password.test(formValues.password)) {
      formErrors.password = MessageError.password;
      _hasErrors = true;
    }
    if (_hasErrors) setFormErrors(formErrors);
    return _hasErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!hasErrors()) {
      onSubmit(event);
    }
    setValidated(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'firstname':
      case 'lastname':
      case 'jobtitle':
        event.target.value =
          value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
        break;
      case 'email':
      case 'instagram':
        event.target.value = value.toLowerCase();
        break;
    }
    onChange(event);
  };

  const setClassNamesInput = (value) => {
    return classNames(
      'form-control',
      validated && (value ? 'is-invalid' : 'is-valid'),
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {!login && (
        <>
          <div className='form-group mb-2'>
            <label htmlFor='firstname' className='mb-1'>
              Nombre
            </label>
            <input
              onChange={handleChange}
              className={setClassNamesInput(firstname)}
              type='text'
              name='firstname'
              id='firstname'
              value={formValues.firstname}
            />
            <MsgInputError msg={firstname} validated={validated} />
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='lastname' className='mb-1'>
              Apellido
            </label>
            <input
              onChange={handleChange}
              className={setClassNamesInput(lastname)}
              type='text'
              name='lastname'
              id='lastname'
              value={formValues.lastname}
            />
            <MsgInputError msg={lastname} validated={validated} />
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='birthdate' className='mb-1'>
              Fecha de nacimiento
            </label>
            <input
              onChange={handleChange}
              className={setClassNamesInput(birthdate)}
              type='date'
              name='birthdate'
              id='birthdate'
              value={formValues.birthdate}
            />
            <MsgInputError msg={birthdate} validated={validated} />
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='jobtitle' className='mb-1'>
              Titulo profesional
            </label>
            <input
              onChange={handleChange}
              className={setClassNamesInput(jobtitle)}
              type='text'
              name='jobtitle'
              id='jobtitle'
              value={formValues.jobtitle}
            />
            <MsgInputError msg={jobtitle} validated={validated} />
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='instagram' className='mb-1'>
              Instagram
            </label>
            <input
              onChange={handleChange}
              className={setClassNamesInput(instagram)}
              type='text'
              name='instagram'
              id='instagram'
              value={formValues.instagram}
            />
            <MsgInputError msg={instagram} validated={validated} />
          </div>
        </>
      )}
      <div className='form-group mb-2'>
        <label htmlFor='email' className='mb-1'>
          Correo electronico
        </label>
        <input
          onChange={handleChange}
          className={setClassNamesInput(email)}
          type='email'
          name='email'
          id='email'
          value={formValues.email}
        />
        <MsgInputError msg={email} validated={validated} />
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='password' className='mb-1'>
          Contraseña
        </label>
        <input
          onChange={handleChange}
          className={setClassNamesInput(password)}
          type='password'
          name='password'
          id='password'
          value={formValues.password}
        />
        <MsgInputError msg={password} validated={validated} />
      </div>
      <div className='d-flex'>
        <button type='submit' className='btn btn-primary'>
          {login ? <>Iniciar sesión</> : <>Guardar</>}
        </button>
        {!login && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={onCancel}
            style={{
              marginLeft: '0.75rem',
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
