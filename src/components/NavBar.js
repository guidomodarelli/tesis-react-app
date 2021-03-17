import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signOut, resetMessageErrors } from '../redux/actions';
import { resetForm } from '../redux/actions/usersActions';

const NavBar = (props) => {
  const { userToken, signOut, resetForm, resetMessageErrors } = props;

  const handleClick = () => {
    resetForm();
    resetMessageErrors();
  };

  return (
    <Navbar expand='md' className='px-2'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Link className='nav-link active' to='/'>
            Inicio
          </Link>
          {userToken && (
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
      {userToken ? (
        <Link
          to='/login'
          className='btn btn-primary text-nowrap'
          onClick={signOut}
        >
          Cerrar sesión
        </Link>
      ) : (
        <Link
          to='/login'
          className='btn btn-primary text-nowrap'
          onClick={handleClick}
        >
          <span>Iniciar sesión</span>
        </Link>
      )}
    </Navbar>
  );
};

NavBar.propTypes = {
  userToken: PropTypes.string,
  signOut: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

const mapStateToProps = ({ reducer }) => reducer;

const mapDispatchToProps = {
  signOut,
  resetForm,
  resetMessageErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
