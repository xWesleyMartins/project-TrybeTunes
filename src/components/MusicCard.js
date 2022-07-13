import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    check: false,
    favorite: [],
  }

  componentDidMount() {
    this.getFavMusics();
  }

  getFavMusics = async () => {
    const getSavedFavMusics = await getFavoriteSongs();
    console.log(getSavedFavMusics);
    this.setState({ favorite: getSavedFavMusics });
    const { music } = this.props;
    const { favorite } = this.state;
    const boolean = favorite.some(({ trackId }) => trackId === music.trackId);
    console.log(boolean);
    this.setState({ check: boolean });
  };

  handleCheckFavorit = ({ target }) => {
    const { music } = this.props;
    this.setState({
      check: target.checked,
      loading: true,
    }, async () => {
      await addSong(music);
      this.setState({
        loading: false,
      });
    });
    // const { music } = this.props;
    // this.setState({
    //   loading: true,
    //   check: target.checked,
    //   // [name]: check,
    // });

    // this.setState({
    //   loading: false,
    // });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { check, loading } = this.state;
    return (
      <div>
        MusicCard
        { loading && <Loading /> }
        <div>
          <span>{ trackName }</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}

            <code>audio</code>
          </audio>
          <label
            // data-testid={ `checkbox-music-${trackId}` }
            htmlFor={ trackId }
          >
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name="check"
              id={ trackId }
              checked={ check }
              onChange={ this.handleCheckFavorit }
              // onClick={ this.getFavMusics }

            />
          </label>
          {/* <input
            data-testid={ `checkbox-music-${trackId}` }
            name="favoritarInput"
            type="checkbox"
            checked={ checked }
            onChange={ this.handleCheckFavorit }
          /> */}

        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  music: PropTypes.objectOf(PropTypes.object),
}.isRequired;
