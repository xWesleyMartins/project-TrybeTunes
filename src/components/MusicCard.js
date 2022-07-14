import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    check: false,
    favorite: [],
  }

  componentDidMount() {
    this.getFavMusics();
    this.toRemoveMusicfav();
  }

  getFavMusics = async () => {
    const getSavedFavMusics = await getFavoriteSongs();
    this.setState({ favorite: getSavedFavMusics });
    const { music } = this.props;
    const { favorite } = this.state;
    const boolean = favorite.some(({ trackId }) => trackId === music.trackId);
    this.setState({ check: boolean });
  };

  toRemoveMusicfav = () => {
    const { music } = this.props;
    this.setState({ loading: true },
      async () => {
        await removeSong(music);
        this.setState({ loading: false });
      });
  }

  handleCheckFavorit = ({ target }) => {
    const { music } = this.props;
    this.setState({
      check: target.checked,
      loading: true,
    }, async () => {
      await addSong(music);
      console.log(music);
      this.setState({
        loading: false,
      });
    });
  }

  // handleChecked = ({ target }) => {
  //   if (target.value) {
  //     this.setState(
  //       { check: false, loading: true },
  //       this.toRemoveMusicfav,
  //     );
  //   }
  // }

  render() {
    const { music } = this.props;
    const { check, loading } = this.state;
    return (
      <div>
        MusicCard
        { loading && <Loading /> }
        {/* { check && ( */}
        <div>
          <span>{ music.trackName }</span>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}

            <code>audio</code>
          </audio>
          <label
            htmlFor={ music.trackId }
          >
            Favorita
            <input
              data-testid={ `checkbox-music-${music.trackId}` }
              type="checkbox"
              name="check"
              id={ music.trackId }
              checked={ check }
              onChange={ this.handleCheckFavorit }
              // onClick={ this.getFavMusics }

            />
          </label>

        </div>
        {/* )} */}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  music: PropTypes.objectOf(PropTypes.object),
}.isRequired;
