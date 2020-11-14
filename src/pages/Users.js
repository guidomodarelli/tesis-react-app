import React, { Component } from 'react';
import logo from '../assets/images/CALISTEP.png';
import PageError from '../components/PageError';
import PageLoading from '../components/PageLoading';
import UsersList from '../components/UsersList';
import './styles/Users.css';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      data: [],
    };
  }

  componentDidMount() {
    this.setState({
      data: [
        {
          id: '2de30c42-9deb-40fc-a41f-05e62b5939a7',
          firstName: 'Freda',
          lastName: 'Grady',
          email: 'Leann_Berge@gmail.com',
          jobTitle: 'Legacy Brand Director',
          instagram: 'FredaGrady22221-7573',
          avatarUrl:
            'https://www.gravatar.com/avatar/f63a9c45aca0e7e7de0782a6b1dff40b?d=identicon',
        },
        {
          id: 'd00d3614-101a-44ca-b6c2-0be075aeed3d',
          firstName: 'Major',
          lastName: 'Rodriguez',
          email: 'Ilene66@hotmail.com',
          jobTitle: 'Human Research Architect',
          instagram: 'MajorRodriguez61545',
          avatarUrl:
            'https://www.gravatar.com/avatar/d57a8be8cb9219609905da25d5f3e50a?d=identicon',
        },
        {
          id: '63c03386-33a2-4512-9ac1-354ad7bec5e9',
          firstName: 'Daphney',
          lastName: 'Torphy',
          email: 'Ron61@hotmail.com',
          jobTitle: 'National Markets Officer',
          instagram: 'DaphneyTorphy96105',
          avatarUrl:
            'https://www.gravatar.com/avatar/e74e87d40e55b9ff9791c78892e55cb7?d=identicon',
        },
      ],
    });
  }

  render() {
    if (this.state.loading && !this.state.data) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError />;
    }
    return (
      <>
        <div className='Users'>
          <div className='Users__hero'>
            <div className='Users__container'>
              <img className='img-fluid' src={logo} alt='logo' />
            </div>
          </div>
        </div>

        <div className='Users__container'>
          <UsersList users={this.state.data} />

          {/* {this.state.loading && <MiniPageLoading />} */}
        </div>
      </>
    );
  }
}
