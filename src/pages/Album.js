import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    albumsArtists: [],
    nameArtist: '',
    albumMusicId: '',
  }

  componentDidMount() {
    this.getSelectedAlbum();
  }

  getSelectedAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ albumsArtists: await getMusics(id) });
    const { albumsArtists } = this.state;
    this.setState({
      nameArtist: albumsArtists[0].artistName,
      albumMusicId: albumsArtists[0].collectionName,
    });
  };

  render() {
    const { nameArtist, albumMusicId, albumsArtists } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <div>
          <ul>
            <li data-testid="artist-name">{ nameArtist }</li>
            <li data-testid="album-name">{ albumMusicId }</li>
          </ul>
          { albumsArtists.filter((music) => Object.keys(music).includes('kind')).map(({
            artistId,
            previewUrl,
            trackName,
          }) => (
            <div key={ artistId }>
              <MusicCard previewUrl={ previewUrl } trackName={ trackName } />
            </div>
          ))}

        </div>
      </div>

    );
  }
}

Album.propTypes = { match: propTypes.object }.isRequired;
