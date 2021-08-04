import PropTypes from 'prop-types';
import { useState } from 'react';
import { Item, Image } from './ImageGalleryItem.styles';
import defaultImage from '../../images/defaultImage.jpg';

export const ImageGalleryItem = ({ webformatURL, tags, onImageSelect }) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <Item>
      <Image
        src={loaded ? webformatURL : defaultImage}
        alt={tags}
        onClick={onImageSelect}
        onLoad={handleImageLoad}
      />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageSelect: PropTypes.func.isRequired,
};