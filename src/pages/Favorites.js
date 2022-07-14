import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    loading: false,
    favoriteList: [],
  }

  componentDidMount() {
    this.getFavMusicsList();
  }

  getFavMusicsList = async () => {
    this.setState({ loading: true }, async () => {
      const listFav = await getFavoriteSongs();
      console.log(listFav);
      this.setState({ loading: false, favoriteList: listFav });
    });
  };

  render() {
    const { loading, favoriteList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        { loading && <Loading /> }
        {favoriteList.map((music, favListArr) => (
          <MusicCard
            music={ music }
            key={ favListArr }
            previewUrl={ music.previewUrl }
            trackName={ music.trackName }
            trackId={ music.trackId }
          />
        ))}
      </div>
    );
  }
}
