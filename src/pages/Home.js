import React from 'react';
import calistep from '../assets/images/logo-calistep-step-by-step.svg';

const Porfolio = () => (
  <section className='container'>
    <p className='text-center'>
      Para transcurrir el camino de la calistenia tienes que ser físicamente
      fuerte, flexible, ágil y resistente, mentalmente paciente y constante. Es
      difícil transcurrirlo solo, y para eso estamos nosotros, para ayudarte a
      vos a que puedas cumplir tus objetivos de manera exitosa.
    </p>
    <h3 className='text-center'>¿Cómo podemos ayudarte?</h3>
    <div className='m-0'>
      <ul>
        <li>
          Planificaciones de entrenamiento de calistenia personalizadas, con
          videos de cada ejercicio
        </li>
        <li>Clases online vía video llamada</li>
        <li>Seguimiento por WhatsApp</li>
        <li>
          Conexión entre alumnos de
          <span className='calistep'>Calistep</span>, para que puedas compartir
          progresos, ideas, dudas y que te sientas parte de esta comunidad
        </li>
      </ul>
    </div>
  </section>
);

const Promotion = () => (
  <section className='container'>
    <h3 className='text-center'>
      ¡Aprovecha tu semana <span>gratis</span>!
    </h3>
    <p className='text-center'>
      Dale clic al botón antes de que se termine el tiempo, y
      <br />
      ¡Súmate a <span className='calistep'>Calistep</span> ahora mismo!
    </p>
  </section>
);

const Home = () => (
  <div className='container'>
    <img
      className='img-fluid p-4'
      src={calistep}
      alt='logo calistep step by step'
    />
    <Porfolio />
    <Promotion />
  </div>
);

export default Home;
