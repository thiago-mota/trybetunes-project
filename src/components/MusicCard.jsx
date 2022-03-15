import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      checked: false,
    };
  }

  componentDidMount() {
    const { music } = this.props;
    getFavoriteSongs()
      .then((response) => this.setState({
        checked: response.some((music2) => music2.trackId === music.trackId),
        isLoading: false,
      }));
    console.log(getFavoriteSongs());
  }

  handleClick = async () => {
    this.setState({
      isLoading: true,
    });
    await addSong();
    this.setState({
      isLoading: false,
      checked: true,
    });
  }

  render() {
    const { isLoading, checked } = this.state;
    const { music: { trackId, previewUrl } } = this.props;
    return (
      <div>
        {
          isLoading
            ? <Loading />
            : (
              <>
                <label htmlFor="xablau">
                  Favorita
                  <input
                    id="xablau"
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    onClick={ this.handleClick }
                    checked={ checked }
                  />
                </label>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
              </>
            )
        }
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  music: propTypes.shape(String).isRequired,
};
