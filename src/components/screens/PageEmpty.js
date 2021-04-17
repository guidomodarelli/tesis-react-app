import React from 'react';
import PropTypes from 'prop-types';
import emptyImage from '../../assets/images/empty.svg';
import '../../styles/components/Screens.scss';

/**
 *
 * @param {{
 *  msg: string;
 * }} props
 * @returns
 */
const PageEmpty = (props) => {
  const { msg } = props;
  return (
    <picture className='Screen'>
      <h3>{msg}</h3>
      <img src={emptyImage} alt='No se encontro ninguna insignia' />
    </picture>
  );
};

PageEmpty.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default PageEmpty;
