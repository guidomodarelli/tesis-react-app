import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signOut, resetMessageErrors } from '../redux/actions';
import { resetUserForm } from '../redux/actions/usersActions';

/**
 *
 * @param {{
 *  userToken: string;
 *  signOut: signOut;
 *  resetUserForm: resetUserForm;
 *  resetMessageErrors: resetMessageErrors;
 * }} props
 * @returns
 */
const NavBar = (props) => {
  const { userToken, signOut, resetUserForm, resetMessageErrors } = props;

  const handleClick = () => {
    resetUserForm();
    resetMessageErrors();
  };

  return (
    <Navbar expand='sm' className='px-2'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Link className='nav-link' to='/'>
            Inicio
          </Link>
          {userToken && (
            <Link className='nav-link' to='/users'>
              Usuarios
            </Link>
          )}
          {userToken && (
            <Link className='nav-link' to='/pubs'>
              Publicaciones
            </Link>
          )}
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
  resetUserForm: PropTypes.func.isRequired,
};

const mapStateToProps = ({ reducer }) => reducer;

const mapDispatchToProps = {
  signOut,
  resetUserForm,
  resetMessageErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
