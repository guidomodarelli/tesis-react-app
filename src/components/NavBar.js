import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>
                Inicio <span className='sr-only'>(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='#'>
                Galeria
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='#'>
                Eventos
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='#'>
                Preguntas frecuentes
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='#'>
                ¿Quienes somos?
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='#'>
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
