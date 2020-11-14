import React, { Component } from 'react';

import './styles/Badge.css';
import logo from '../assets/images/CALISTEP.png';
import Gravatar from './Gravatar';

export default class Badge extends Component {
  render() {
    const {
      email,
      firstname,
      lastname,
      edad,
      jobtitle,
      instagram,
    } = this.props;
    return (
      <div className='Badge'>
        <div className='Badge__header'>
          <img src={logo} alt='Logo' className='img-fluid m-2' />
        </div>
        <div className='Badge__section-name p-5'>
          <Gravatar className='Badge__avatar img-fluid' email={email} alt='Avatar' />
          <h1>
            {firstname} <br /> {lastname}
          </h1>
        </div>
        <div className='Badge__section-age'>
          <h3>Edad: {edad}</h3>
        </div>
        <div className='Badge__section-info'>
          <h3>{jobtitle}</h3>
          <div>@{instagram}</div>
        </div>
      </div>
    );
  }
}
