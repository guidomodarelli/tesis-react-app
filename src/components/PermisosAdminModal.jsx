import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './Modal';
import InputCheckBox from './InputCheckBox';
import FormButtons from './FormButtons';

/**
 * @typedef {import("../redux/reducers/usersReducer").User} User
 * @typedef {import("../redux/reducers/usersReducer").UserForm} UserForm
 */

/**
 *
 * @param {{
 *  currentUser: User;
 *  handleChangeCheckList: (event: React.ChangeEvent<HTMLInputElement>) => void;
 *  isOpen: boolean;
 *  onClose: () => void;
 *  onDesignAdmin: () => void;
 *  form: UserForm;
 * }} props
 * @returns
 */
const PermisosAdminModal = (props) => {
  const {
    currentUser: {
      addGroup,
      addNewAdmins,
      changeGroupInfo,
      changeGroupUser,
      changePermissionsAdmins,
      changeRoutine,
      deletePosts,
      deleteUsers,
      deleteVotes,
    },
    handleChangeCheckList,
    isOpen,
    onClose,
    onDesignAdmin: handleSubmit,
    form,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='divide-y-2'>
        <div className='px-4 pb-4 pt-5 text-center'>
          <h1 className='title mt-4'>¿Qué puede hacer este administrador?</h1>
        </div>
        <div className='p-4'>
          <form>
            <InputCheckBox
              name='addNewAdmins'
              checked={form.addNewAdmins}
              onChange={handleChangeCheckList}
              disabled={!addNewAdmins}
              label='Añadir administradores'
            />
            <InputCheckBox
              name='changeGroupInfo'
              checked={form.changeGroupInfo}
              onChange={handleChangeCheckList}
              disabled={!changeGroupInfo}
              label='Editar info. del grupo'
            />
            <InputCheckBox
              name='deletePosts'
              checked={form.deletePosts}
              onChange={handleChangeCheckList}
              disabled={!deletePosts}
              label='Eliminar Publicaciones'
            />
            <InputCheckBox
              name='deleteVotes'
              checked={form.deleteVotes}
              onChange={handleChangeCheckList}
              disabled={!deleteVotes}
              label='Eliminar votos'
            />
            <InputCheckBox
              name='deleteUsers'
              checked={form.deleteUsers}
              onChange={handleChangeCheckList}
              disabled={!deleteUsers}
              label='Eliminar usuarios'
            />
            <InputCheckBox
              name='addGroup'
              checked={form.addGroup}
              onChange={handleChangeCheckList}
              disabled={!addGroup}
              label='Crear grupo'
            />
            <InputCheckBox
              name='changeRoutine'
              checked={form.changeRoutine}
              onChange={handleChangeCheckList}
              disabled={!changeRoutine}
              label='Modificar rutinas'
            />
            <InputCheckBox
              name='changePermissionsAdmins'
              checked={form.changePermissionsAdmins}
              onChange={handleChangeCheckList}
              disabled={!changePermissionsAdmins}
              label='Modificar permisos de otros admins.'
            />
            <InputCheckBox
              name='changeGroupUser'
              checked={form.changeGroupUser}
              onChange={handleChangeCheckList}
              disabled={!changeGroupUser}
              label='Cambiar al usuario de grupo'
            />
          </form>
        </div>
        <div className='flex items-center justify-end p-3'>
          <FormButtons onClick={handleSubmit} onClose={onClose} />
        </div>
      </div>
    </Modal>
  );
};

PermisosAdminModal.propTypes = {
  currentUser: PropTypes.object.isRequired,
  handleChangeCheckList: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDesignAdmin: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

const mapStateToProps = ({ usersReducer }) => ({
  currentUser: usersReducer.currentUser,
});

export default connect(mapStateToProps, null)(PermisosAdminModal);
