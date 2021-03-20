import React from 'react';
import PropTypes from 'prop-types';
import emptyImage from '../../assets/images/empty.svg';
import { Figure, Img } from './styles';

const PageEmpty = (props) => {
  const { msg } = props;
  return (
    <Figure className='flex-column mt-3'>
      <h3 className='text-center'>{msg}</h3>
      <Img src={emptyImage} alt='No se encontro ninguna insignia' />
    </Figure>
  );
};

PageEmpty.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default PageEmpty;
