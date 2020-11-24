import React from 'react'
import Modal from './Modal'

function DeleteUserModal(props) {
  return <Modal isOpen={props.isOpen} onClose={props.onClose}>
    <div className="DeleteUserModal">
      <h1>¿Estás seguro?</h1>
      <p>Estás apunto de eliminar esta cuenta!</p>
      <div>
        <button onClick={props.onDeleteUser} className='btn btn-danger mr-4'>Eliminar</button>
        <button onClick={props.onClose} className='btn btn-primary'>Cancelar</button>
      </div>
    </div>
  </Modal>
}

export default DeleteUserModal
