import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    albumsArtists: [],
    musicas: [],
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
      musicas: albumsArtists.slice(1),
    });
  };

  render() {
    const { nameArtist, albumMusicId, albumsArtists, musicas } = this.state;
    console.log(albumsArtists);
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <div>

          <h4 data-testid="artist-name">{ nameArtist }</h4>
          <h5 data-testid="album-name">{ albumMusicId }</h5>

          { musicas.map(({
            // artistId,
            trackId,
            previewUrl,
            trackName,
          }, index) => (
            <div key={ index }>
              <MusicCard
                previewUrl={ previewUrl }
                trackName={ trackName }
                // key={ music.trackId }
                trackId={ trackId }
              />
            </div>
          ))}

        </div>
      </div>

    );
  }
}

Album.propTypes = {
  match: propTypes.object,
}.isRequired;
