import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import FormButtons from './FormButtons';

/**
 *
 * @param {{
 *  isOpen: boolean;
 *  onClose: () => void;
 *  onDeleteUser: () => void;
 * }} props
 * @returns
 */
const DeleteUserModal = (props) => {
  const { isOpen, onClose, onDeleteUser } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='divide-y-2'>
        {' '}
        <div className='px-4 pb-4 pt-5 text-center'>
          <h1 className='title mt-4'>¿Estás seguro?</h1>
        </div>
        <div className='p-4'>
          <p className='text-xl'>¡Estás apunto de eliminar esta cuenta!</p>
        </div>
        <div className='flex items-center justify-end p-3'>
          <FormButtons onClick={onDeleteUser} onClose={onClose} danger />
        </div>

      </div>
    </Modal>
  );
};

DeleteUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default DeleteUserModal;
