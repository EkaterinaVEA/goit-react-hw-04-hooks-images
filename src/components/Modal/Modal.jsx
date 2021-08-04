import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled, Image, CloseBtn } from './Modal.styles';
import { RiCloseCircleLine } from 'react-icons/ri';
import Spinner from '../Loader/Loader';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ image, onClose }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };

  const handleImageLoaded = () => {
    setLoaded(true);
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalStyled>
        <Image
          src={image.src}
          alt={image.alt}
          onLoad={handleImageLoaded}
        />
        {loaded ? (
          <CloseBtn onClick={onClose}>
            <RiCloseCircleLine size="30" />
          </CloseBtn>
        ) : (
          <Spinner />
        )}
      </ModalStyled>
    </Overlay>,
    modalRoot,
  );
}

Modal.propTypes = {
  image: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
}