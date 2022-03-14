import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      searchBtnDisabled: true,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch({ target }) {
    this.setState({ artistName: target.value });
    return target.value.length >= 2
      ? this.setState({ searchBtnDisabled: false })
      : this.setState({ searchBtnDisabled: true });
  }

  render() {
    const { searchBtnDisabled, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

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
        >
          Procurar
        </button>
      </div>
    );
  }
}

export default Search;
