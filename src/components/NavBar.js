import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../redux/actions';

const NavBar = (props) => {
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
      <div
        className='collapse navbar-collapse row justify-content-between ml-1 mr-1'
        id='navbarNav'
      >
        <ul className='navbar-nav'>
          <li className='nav-item active'>
            <Link className='nav-link' to='/'>
              Inicio
              {' '}
              <span className='sr-only'>(current)</span>
            </Link>
          </li>
          {props.loading && (
            <li className='nav-item'>
              <Link className='nav-link' to='/users'>
                Usuarios
              </Link>
            </li>
          )}
          <li className='nav-item'>
            <Link className='nav-link' to='#galery'>
              Galeria
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='#events'>
              Eventos
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='#faq'>
              Preguntas frecuentes
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='#aboutus'>
              ¿Quienes somos?
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='#contact'>
              Contacto
            </Link>
          </li>
        </ul>
        {!props.loading && (
          <Link to='/login' className='btn btn-primary'>
            <span>Iniciar sesión</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  isLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
