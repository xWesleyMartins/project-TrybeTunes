import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
// import Loading from '../pages/Loading';

export default class Login extends Component {
state = {
  login: '',
  changeOfButton: true,
  loading: false,
  logado: false,
};

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      }, this.handleEnableButton);
    };

    handleEnableButton = () => {
      const { login } = this.state;
      const minCharacters = 3;
      if (login.length >= minCharacters) {
        this.setState({
          changeOfButton: false,
        });
      } else {
        this.setState({
          changeOfButton: true,
        });
      }
    };

    clickEventButton = async () => {
      const { login } = this.state;

      this.setState(
        { loading: true },
      );
      await createUser({ name: login });
      this.setState({ logado: true });
    }

    render() {
      const { login, changeOfButton, loading, logado } = this.state;
      // const showLoading = <span>Carregando...</span>;
      return (
        <div data-testid="page-login">
          Login
          <label htmlFor="login-name-input">
            <input
              name="login"
              data-testid="login-name-input"
              type="text"
              onChange={ this.handleChange }
              value={ login }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ changeOfButton }
              onClick={ this.clickEventButton }
              name="Entrar"
              value="Entrar"

            >
              Entrar
            </button>
            <div>
              { loading ? <Loading /> : null }
              { logado ? <Redirect to="/search" /> : null }
            </div>
          </label>
        </div>
      );
    }
}
