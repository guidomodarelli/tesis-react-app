import React from 'react';
import logo from '../assets/images/CALISTEP.png';
import '../assets/styles/components/Badge.css';
import Gravatar from './Gravatar';

const Badge = (props) => {
  const { email, firstname, lastname, birthdate, jobtitle, instagram } = props;

  const calcularEdad = () => {
    const hoy = new Date();
    const cumpleanos = new Date(birthdate);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  };

  return (
    <div className='Badge'>
      <div className='Badge__header mx-3'>
        <img src={logo} alt='Logo' className='img-fluid m-2' />
      </div>
      <div className='Badge__section-name p-5'>
        <Gravatar
          className='Badge__avatar img-fluid'
          email={email}
          alt='Avatar'
        />
        <h1>
          {firstname}
          <br />
          {lastname}
        </h1>
      </div>
      <div className='Badge__section-age'>
        <h3>
          Edad:
          {' '}
          {calcularEdad()}
        </h3>
      </div>
      {(jobtitle || instagram) && (
        <div className='Badge__section-info'>
          {jobtitle && <h3>{jobtitle}</h3>}
          {instagram && (
            <div>
              @
              {instagram}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Badge;
