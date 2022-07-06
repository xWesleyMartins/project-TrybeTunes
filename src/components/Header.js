import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    loading: false,
    user: '',
  }

  async componentDidMount() {
    this.setState({ loading: true });
    this.setState({ user: await getUser() });
    this.setState({ loading: false });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="header-component">
        Header
        { loading && <Loading /> }
        <h1 data-testid="header-user-name">{ user.name }</h1>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">profile</Link>
        </nav>
      </div>
    );
  }
}
