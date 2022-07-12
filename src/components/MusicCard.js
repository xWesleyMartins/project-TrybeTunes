import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    check: false,
  }

  handleCheckFavorit = async ({ target: { check, name } }) => {
    const { music } = this.props;
    this.setState({
      loading: true,
      [name]: check,
    });
    await addSong(music);
    this.setState({
      loading: false,
    });
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
            htmlFor="inputCheckBox"
          >
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name="check"
              checked={ check }
              onChange={ this.handleCheckFavorit }

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
}.isRequired;
