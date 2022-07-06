import React, { Component } from 'react';
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
      </div>
    );
  }
}
