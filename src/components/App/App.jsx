import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api } from '../../services/Api';

import { Section } from './App.styles';
import { Searchbar } from '../Searchbar/Searchbar';
import { Modal } from '../Modal/Modal';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Spinner from '../Loader/Loader';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setStatus("pending");

    Api.getImages(searchQuery, page)
      .then((images) => {
        if (!images.length) {
          throw new Error(`No results were found for "${searchQuery}"`);
        }

        setImages((prevImages) => [...prevImages, ...images]);
        setStatus("resolve");

        page > 1 &&
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
      })
      .catch((err) => {
        if (err) {
          console.warn(err);
        }
        setStatus("idle");

        toast.warning(`Not Found any images by query: ${searchQuery}`);
      });
  }, [searchQuery, page]);

  const resetState = () => {
    setSearchQuery("");
    setPage(1);
    setImages([]);
    setSelectedImage(null);
    setStatus("idle");
  };

  const onSubmit = (query) => {
    const repeatedQuery = query === searchQuery;

    if (repeatedQuery) {
      return toast.info('Please, enter query!');
    }

    resetState();
    setSearchQuery(query);
  };

  const onModalClose = () => {
    setSelectedImage(null);

    document.body.style.overflow = "";
  };

  const onImageSelect = (src, alt) => {
    setSelectedImage({ src, alt });

    document.body.style.overflow = "hidden";
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  switch (status) {
    case "idle":
      return (
        <Section>
          <Searchbar onSubmit={onSubmit} />
        </Section>
      );

    case "pending":
      return (
        <Section>
          <Searchbar onSubmit={onSubmit} />
          <ImageGallery images={images} onImageSelect={onImageSelect} />
          <Spinner />
          {images.length > 0 && <Button onClick={onLoadMore} />}
        </Section>
      );

    case "resolve":
      return (
        <Section>
          <Searchbar onSubmit={onSubmit} />
          <ImageGallery images={images} onImageSelect={onImageSelect} />
          {images.length > 0 && <Button onClick={onLoadMore} />}
          {selectedImage && (
            <Modal image={selectedImage} onClose={onModalClose} />
          )}
          <ToastContainer />
        </Section>
      );

    default:
      return (
        <Section>
          <Searchbar onSubmit={onSubmit} />
          <ToastContainer />
        </Section>
      );
  }
}