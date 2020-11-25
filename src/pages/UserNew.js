import React, { Component } from 'react';
import Badge from '../components/Badge';
import PageUpload from '../components/PageUpload';
import UserForm from '../components/UserForm';
import api from '../server/api';

class UserNew extends Component {
  state = {
    uploading: false,
    error: null,
    form: {
      firstname: '',
      lastname: '',
      email: '',
      birthdate: '',
      jobtitle: '',
      instagram: '',
      password: '',
    },
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSumbit = async (e) => {
    e.preventDefault();
    this.setState({ uploading: true, error: null });
    try {
      const response = await api.users.create(this.state.form);
      this.setState({ uploading: false, error: null });
      if (response.status === 201) {
        this.props.history.push('/login');
      }
    } catch (error) {
      this.setState({ uploading: false, error: error });
    }
  };

  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }

  render() {
    if (this.state.uploading) {
      return <PageUpload />;
    }
    return (
      <>
        <div className='container'>
          <div className='row'>
            <div className='col mt-4'>
              <Badge
                firstname={this.state.form.firstname || 'Nombre'}
                lastname={this.state.form.lastname || 'Apellido'}
                email={this.state.form.email || 'calistep@gmail.com'}
                birthdate={this.state.form.birthdate || '2008-01-25'}
                jobtitle={this.state.form.jobtitle || 'Titulo profesional'}
                instagram={this.state.form.instagram || 'cuenta_intagram'}
              />
            </div>

            <div className='col mt-4 mb-4'>
              <h1>Nuevo usuario</h1>
              <UserForm
                onChange={this.handleChange}
                formValues={this.state.form}
                onSumbit={this.handleSumbit}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserNew;
