import React, { Component } from 'react';

import './styles/Badge.css';
import logo from '../assets/images/CALISTEP.png';
import Gravatar from './Gravatar';

export default class Badge extends Component {
  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }

  render() {
    const {
      email,
      firstname,
      lastname,
      birthdate,
      jobtitle,
      instagram,
    } = this.props;
    return (
      <div className='Badge'>
        <div className='Badge__header'>
          <img src={logo} alt='Logo' className='img-fluid m-2' />
        </div>
        <div className='Badge__section-name p-5'>
          <Gravatar
            className='Badge__avatar img-fluid'
            email={email}
            alt='Avatar'
          />
          <h1>
            {firstname} <br /> {lastname}
          </h1>
        </div>
        <div className='Badge__section-age'>
          <h3>Edad: {this.calcularEdad(birthdate)}</h3>
        </div>
        {(jobtitle || instagram) && (
          <div className='Badge__section-info'>
            <h3>{jobtitle}</h3>
            {instagram && <div>@{instagram}</div>}
          </div>
        )}
      </div>
    );
  }
}
