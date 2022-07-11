import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <div>
        MusicCard
        <div>
          <span>{ trackName }</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
          </audio>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
}.isRequired;
