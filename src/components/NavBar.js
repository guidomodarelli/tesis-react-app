import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Link className='nav-link active' to='/'>
            Inicio
          </Link>
          {props.userToken && (
            <Link className='nav-link' to='/users'>
              Usuarios
            </Link>
          )}
          <Link className='nav-link' to='#galery'>
            Galeria
          </Link>
          <Link className='nav-link' to='#events'>
            Eventos
          </Link>
          <Link className='nav-link' to='#faq'>
            Preguntas frecuentes
          </Link>
          <Link className='nav-link' to='#aboutus'>
            ¿Quienes somos?
          </Link>
          <Link className='nav-link' to='#contact'>
            Contacto
          </Link>
        </Nav>
      </Navbar.Collapse>
      {props.userToken ? (
        <Link to='/login' className='btn btn-primary'>
          <span>Cerrar sesión</span>
        </Link>
      ) : (
        <Link to='/login' className='btn btn-primary'>
          <span>Iniciar sesión</span>
        </Link>
      )}
    </Navbar>
  );
};

const mapStateToProps = (reducers) => {
  return {
    loading: reducers.reducer.loading,
    error: reducers.reducer.error,
    userToken: reducers.reducer.userToken,
  };
};

export default connect(mapStateToProps)(NavBar);
