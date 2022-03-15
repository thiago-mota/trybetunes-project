import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music: { trackId, previewUrl } } = this.props;
    return (
      <div>

        <label htmlFor="xablau">
          Favorita
          <input
            id="xablau"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>

    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  music: propTypes.shape(String).isRequired,
};
