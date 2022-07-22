import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  state = {
    // userProfileData: [],
    loading: false,
    nameLogin: '',
    emailLogin: '',
    descriptionLogin: '',
    imageLogin: '',
    validateButtonLogin: true,

  }

  componentDidMount() {
    this.getUserProfile();
  }

  handleChange = ({ target }) => {
    // const { name } = target;
    const { name, value } = target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.changeButtonLogin);
  };

  updateUserApi = async () => {
    const {
      nameLogin,
      emailLogin,
      descriptionLogin,
      imageLogin,
    } = this.state;
    const { history: { push } } = this.props;
    this.setState({ loading: true });
    await updateUser({
      name: nameLogin,
      email: emailLogin,
      description: descriptionLogin,
      image: imageLogin,
    }); push('/profile');
  }

  changeButtonLogin =() => {
    const { nameLogin, emailLogin, descriptionLogin, imageLogin } = this.state;
    if (
      nameLogin.length !== ''
        && emailLogin.length !== ''
        && descriptionLogin.length !== ''
        && imageLogin.length !== '') { this.setState = ({ validateButtonLogin: true }); }
  }

  getUserProfile = () => {
    this.setState({ loading: true }, async () => {
      const userProfileData = await getUser();
      this.setState({
        loading: false,
        nameLogin: userProfileData.name,
        emailLogin: userProfileData.email,
        descriptionLogin: userProfileData.description,
        imageLogin: userProfileData.image,
        // validateButtonLogin: true,
      }, this.changeButtonLogin);
    });
  }

  render() {
    const {
      loading,
      nameLogin,
      emailLogin,
      descriptionLogin,
      imageLogin,
      validateButtonLogin,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        profileEdit
        { loading && <Loading /> }
        {!loading
        && (
          <div>
            <label htmlFor="profileEditName">
              Name:
              <input
                data-testid="edit-input-name"
                type="text"
                onChange={ this.handleChange }
                value={ nameLogin }
                id="profileEditName"
                name="nameLogin"
              />
            </label>
            <label htmlFor="profileEditEmail">
              Email:
              <input
                data-testid="edit-input-email"
                type="email"
                onChange={ this.handleChange }
                value={ emailLogin }
                id="profileEditEmail"
                name="emailLogin"
              />
            </label>
            <label htmlFor="profileEditdescription">
              Description:
              <input
                data-testid="edit-input-description"
                type="textarea"
                onChange={ this.handleChange }
                value={ descriptionLogin }
                id="profileEditDescription"
                name="descriptionLogin"
              />
            </label>
            <label htmlFor="profileEditImage">
              <input
                data-testid="edit-input-image"
                type="text"
                onChange={ this.handleChange }
                value={ imageLogin }
                id="profileEditImage"
                name="imageLogin"
              />
            </label>
            <button
              data-testid="edit-button-save"
              disabled={ validateButtonLogin }
              type="submit"
              onClick={ this.updateUserApi }
              name="Loguin"
              id="Loguin"
              value="Loguin"
            >
              Editar Perfil
            </button>
          </div>
        )}
      </div>

    );
  }
}

ProfileEdit.propTypes = { history: propTypes.object, push: propTypes.func }.isRequired;
