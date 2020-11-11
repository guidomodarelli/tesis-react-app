import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-calistep-vertical.png';
import api from '../utils/api';
import './styles/NavBar.css';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      error: null,
    };
  }

  componentDidMount() {
    this.handleLogin();
  }

  handleLogin = async () => {
    try {
      const data = await api.loggedIn(localStorage.getItem('token'));
      this.setState({
        loggedIn: data.loggedIn,
        error: null,
      });
    } catch (error) {
      this.setState({
        loggedIn: false,
        error: error,
      });
    }
  };

  render() {
    return (
      <div className='Navbar__header'>
        <Link to='/'>
          <figure className='Navbar__logo'>
            <img src={logo} alt='' />
          </figure>
        </Link>

        <nav>
          <ul>
            <li>
              <Link to='/' className='link'>
                Inicio
              </Link>
            </li>
            <li className='separator'>|</li>
            <li>Galeria</li>
            <li className='separator'>|</li>
            <li>Clases</li>
            <li className='separator'>|</li>
            <li>Preguntas frecuentes</li>
            <li className='separator'>|</li>
            <li>¿Quienes Somos?</li>
            <li className='separator'>|</li>
            <li>Contacto</li>
            {!this.state.loggedIn && (
              <li>
                <Link to='/login' className='btn btn-primary'>
                  Iniciar sesion
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
