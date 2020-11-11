import React from 'react';
import './styles/Home.css';
import image__calistep from '../assets/images/logo-calistep-step-by-step.svg';

function Porfolio() {
  return (
    <section className='portfolio'>
      <p className='portfolio-description'>
        Para transcurrir el camino de la calistenia tienes que ser físicamente
        fuerte, flexible, ágil y resistente, mentalmente paciente y constante.
        Es difícil transcurrirlo solo, y para eso estamos nosotros, para
        ayudarte a vos a que puedas cumplir tus objetivos de manera exitosa.
      </p>
      <h3 className='portfolio-title'>¿Cómo podemos ayudarte?</h3>
      <ul className='portfolio-list'>
        <li className='portfolio-list-item'>
          Planificaciones de entrenamiento de calistenia personalizadas, con
          videos de cada ejercicio
        </li>
        <li className='portfolio-list-item'>Clases online vía video llamada</li>
        <li className='portfolio-list-item'>Seguimiento por WhatsApp</li>
        <li className='portfolio-list-item'>
          Conexión entre alumnos de
          <span className='calistep'>Calistep</span>, para que puedas compartir
          progresos, ideas, dudas y que te sientas parte de esta comunidad
        </li>
      </ul>
    </section>
  );
}

function Promotion() {
  return (
    <section className='promotion'>
      <h3 className='promotion-title'>
        ¡Aprovecha tu semana <span>gratis</span>!
      </h3>
      <p className='promotion-description'>
        Dale clic al botón antes de que se termine el tiempo, y
        <br />
        ¡Súmate a <span className='calistep'>Calistep</span> ahora mismo!
      </p>
    </section>
  );
}

function Home() {
  return (
    <div className='HomeContainer'>
      <div className='Home'>
        <img className='Home__image__ppal' src={image__calistep} alt='' />
        <Porfolio />
        <Promotion />
      </div>
    </div>
  );
}

export default Home;
