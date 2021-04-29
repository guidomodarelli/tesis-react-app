import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut, resetMessageErrors } from '../../redux/actions';
import { resetUserForm } from '../../redux/actions/usersActions';
import 'bulma';

const NavBar = (props) => {
  const { userToken, signOut, resetUserForm, resetMessageErrors } = props;

  /** @type {import("react").MutableRefObject<HTMLElement>} */
  const refNavbarBurger = useRef(null);
  /** @type {import("react").MutableRefObject<HTMLElement>} */
  const refNavbarMenu = useRef(null);

  const toggleActive = () => {
    const isActive = 'is-active';
    if (refNavbarBurger.current.classList.contains(isActive)) {
      refNavbarBurger.current.classList.remove(isActive);
      refNavbarMenu.current.classList.remove(isActive);
    } else {
      refNavbarBurger.current.classList.add(isActive);
      refNavbarMenu.current.classList.add(isActive);
    }
  };

  const handleClick = () => {
    toggleActive();
    if (userToken) {
      signOut();
    } else {
      resetUserForm();
      resetMessageErrors();
    }
  };

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <div
          role='button'
          className='navbar-burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
          tabIndex={0}
          onClick={toggleActive}
          ref={refNavbarBurger}
        >
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </div>
      </div>

      <div id='navbarBasicExample' className='navbar-menu' ref={refNavbarMenu}>
        <div
          className='navbar-start'
          onClick={toggleActive}
          role='button'
          tabIndex={0}
        >
          <Link className='navbar-item' to='/'>
            Inicio
          </Link>
          {userToken && (
            <Link className='navbar-item' to='/users'>
              Usuarios
            </Link>
          )}
          {userToken && (
            <Link className='navbar-item' to='/pubs'>
              Publicaciones
            </Link>
          )}
          {userToken && (
            <Link className='navbar-item' to='/chat'>
              Chat
            </Link>
          )}
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              {!userToken && (
                <Link
                  to='/signup'
                  className='btn btn-primary me-2'
                  onClick={toggleActive}
                >
                  Registrarse
                </Link>
              )}
              <Link
                to='/login'
                className='btn btn-secondary text-nowrap'
                onClick={handleClick}
              >
                {userToken ? <>Cerrar sesión</> : <>Iniciar sesión</>}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ reducer }) => reducer;

const mapDispatchToProps = {
  signOut,
  resetUserForm,
  resetMessageErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
