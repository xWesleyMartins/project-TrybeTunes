import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
state = {
  loading: false,
  changeOfSearchButton: true,
  searchArtistOrBand: '',
  receivNameOnSearch: '',
  searchAlbum: [],
}

  handleSearchChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleEnableSearchButton);
  };

  handleEnableSearchButton = () => {
    const { searchArtistOrBand } = this.state;
    const minSearchCharacters = 2;
    if (searchArtistOrBand.length >= minSearchCharacters) {
      this.setState({
        changeOfSearchButton: false,
      });
    } else {
      this.setState({
        changeOfSearchButton: true,
      });
    }
  };

searchArtistRequisition = () => {
  const { searchArtistOrBand } = this.state;
  this.setState({ loading: true },
    async () => {
      const searchAlbum = await searchAlbumsAPI(searchArtistOrBand);
      this.setState({
        loading: false,
        searchArtistOrBand: '',
        receivNameOnSearch: searchArtistOrBand,
        searchAlbum,
      });
    });
}

render() {
  const {
    searchArtistOrBand,
    receivNameOnSearch,
    loading,
    changeOfSearchButton,
    searchAlbum } = this.state;
  return (
    <div data-testid="page-search">
      Search
      { loading && <Loading /> }
      <input
        name="searchArtistOrBand"
        data-testid="search-artist-input"
        type="text"
        onChange={ this.handleSearchChange }
        value={ searchArtistOrBand }
        placeholder="Nome da banda ou artista"
      />
      <button
        name="Pesquisar"
        data-testid="search-artist-button"
        type="button"
        disabled={ changeOfSearchButton }
        onClick={ this.searchArtistRequisition }
        value="Pesquisar"
      >
        Pesquisar
      </button>
      <span>
        Resultado de álbuns de:
        {' '}
        { receivNameOnSearch }
        {' '}
      </span>
      { (searchAlbum.length > 0) ? (searchAlbum.map(({
        artistId,
        artistName,
        collectionId,
        collectionName,
        collectionPrice,
        artworkUrl100,
        releaseDate,
        trackCount,
      }) => (
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          key={ artistId }
          to={ `/album/${collectionId}` }
        >
          <div>
            <h3>
              Artista:
              { artistName }
            </h3>
            <ul>
              <li>
                Album:
                { collectionName }
              </li>
              <li>
                Qntd Faixas:
                { trackCount }
              </li>
              <li>
                Data de lançamento:
                { releaseDate }
              </li>
              <li>
                Preço do album US$
                { collectionPrice }
              </li>
            </ul>
            <img src={ artworkUrl100 } alt={ collectionName } />
          </div>

        </Link>
      ))) : <span>Nenhum álbum foi encontrado</span>}
    </div>
  );
}
}
