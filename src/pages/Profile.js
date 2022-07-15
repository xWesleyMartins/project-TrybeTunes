import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  state = {
    userProfileData: [],
    loading: false,
  }

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = () => {
    this.setState({ loading: true }, async () => {
      const userProfileData = await getUser();
      this.setState({ userProfileData, loading: false });
    });
  }

  render() {
    const { loading, userProfileData } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading && <Loading /> }
        <img
          data-testid="profile-image"
          src={ userProfileData.image }
          alt={ userProfileData.name }
        />
        {' '}
        <p>{ userProfileData.name }</p>
        {' '}
        <p>{ userProfileData.email }</p>
        {' '}
        <p>{ userProfileData.description }</p>
        {' '}
        <Link
          to="/profile/edit"
        >
          Editar perfil
        </Link>
      </div>
    );
  }
}
