import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
      artistName: '',
      collectionName: '',
    };
  }

  fetchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      artistName: '',
      collectionName: '',
    });

    const musics = await getMusics(id);
    console.log(musics);
    this.setState({
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
    });
    this.setState({
      musicList: musics,
    });
  }

  componentDidMount = () => {
    this.fetchMusic();
  }

  render() {
    const { musicList, collectionName, artistName } = this.state;
    console.log(musicList);
    return (
      <div data-testid="page-album">
        <Header />
        <p
          data-testid="artist-name"
        >
          { artistName }
        </p>
        <p
          data-testid="album-name"
        >
          {collectionName}
        </p>

        {
          musicList.map((music, index) => (
            <div key={ music.trackId }>
              <p>
                { music.trackName }
              </p>
              { index > 0 && (
                <MusicCard
                  music={ music }
                />
              )}
            </div>
          ))
        }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  id: propTypes.string.isRequired,
  match: propTypes.instanceOf(Object).isRequired,
  params: propTypes.instanceOf(Object).isRequired,
};

// https://blog.logrocket.com/validating-react-component-props-with-prop-types-ef14b29963fc/
// proptypes instance of
