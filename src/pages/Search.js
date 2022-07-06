import React, { Component } from 'react';

export default class Search extends Component {
state = {
  search: '',
  changeOfSearchButton: true,
}

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleEnableSearchButton);
  };

  handleEnableSearchButton = () => {
    const { search } = this.state;
    const minCharacters = 2;
    if (search.length >= minCharacters) {
      this.setState({
        changeOfSearchButton: false,
      });
    } else {
      this.setState({
        changeOfSearchButton: true,
      });
    }
  };

  render() {
    const { search, changeOfSearchButton } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <input
          data-testid="search-artist-input"
          type="text"
          name="search"
          onChange={ this.handleChange }
          value={ search }
          placeholder="Nome da banda ou artista"
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ changeOfSearchButton }
          onClick={ this.handleEnableSearchButton }
          name="Pesquisar"
          value="Pesquisar"
        >
          Pesquisar
        </button>
      </div>

    );
  }
}
