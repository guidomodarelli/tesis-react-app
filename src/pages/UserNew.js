import React, { Component } from 'react';
import api from '../utils/api';
import PageUpload from '../components/PageUpload';
import Badge from '../components/Badge';
import UserForm from '../components/UserForm';

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
    console.log(this.state.form);
    try {
      const response = await api.users.create(this.state.form);
      this.setState({ uploading: false, error: null });
      localStorage.setItem('token', response.token);
      // this.props.history.push('/users');
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
        <div className='container mt-3'>
          <div className='row'>
            <div className='col'>
              <Badge
                firstname={this.state.form.firstname || 'Nombre'}
                lastname={this.state.form.lastname || 'Apellido'}
                email={this.state.form.email || 'calistep@gmail.com'}
                edad={this.calcularEdad(this.state.form.birthdate) || 12}
                jobtitle={this.state.form.jobtitle || 'Titulo profesional'}
                instagram={this.state.form.instagram || 'cuenta_intagram'}
                avatarUrl='https://www.gravatar.com/avatar?d=identicon'
              />
            </div>

            <div className='col-6'>
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
