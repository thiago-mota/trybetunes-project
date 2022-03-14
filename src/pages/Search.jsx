import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      searchBtnDisabled: true,
      isLoading: false,
      albums: [],
    };
  }

  handleSearch = ({ target }) => {
    this.setState({ artistName: target.value });
    return target.value.length >= 2
      ? this.setState({ searchBtnDisabled: false })
      : this.setState({ searchBtnDisabled: true });
  }

  handleClick = async () => {
    const { artistName } = this.state;
    this.setState({
      lastArtist: artistName,
      artistName: '',
      isLoading: true,
    });
    const searchResponse = await searchAlbumsAPI(artistName);
    this.setState({
      isLoading: false,
      albums: searchResponse,
    });
  }

  render() {
    const { searchBtnDisabled, artistName, isLoading, albums, lastArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <div>
                <input
                  name="artistName"
                  value={ artistName }
                  type="text"
                  data-testid="search-artist-input"
                  onChange={ this.handleSearch }
                />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ searchBtnDisabled }
                  onClick={ this.handleClick }
                >
                  Procurar
                </button>
              </div>
            )
        }
        {
          albums.length === 0
            ? 'Nenhum álbum foi encontrado'
            : `Resultado de álbuns de: ${lastArtist}`
        }

        {
          albums.map((album) => (
            <Link
              to={ `/album/${album.collectionId}` }
              key={ album.artistId }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              <img
                src={ album.artworkUrl100 }
                alt={ album.artistName }
              />

              <p>
                { album.artistName }
              </p>
              <p>
                { album.collectionName }
              </p>
            </Link>
          ))
        }
      </div>
    );
  }
}

export default Search;
