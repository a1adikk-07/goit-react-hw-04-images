import { useEffect, useState } from 'react';
import { searchImage } from 'api/api';
import Searchbar from './searchbar/searchbar';
import ImageGallery from './imageGallery/imageGallery';
import Modal from '../modal/modal';
import Loader from '../loader/loader';
import Button from 'components/buttons/button';
import styles from './imageSearch.module.css';

const ImageSearch = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModal] = useState(false);
  const [postDetails, setPostDetails] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await searchImage(search, page);
        setImages(prevImages =>
          data.hits?.length ? [...prevImages, ...data.hits] : prevImages
        );
        setTotalHits(data.totalHits || 0);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      fetchPosts();
    }
  }, [search, page]);

  const handleSearch = ({ search }) => {
    setSearch(search);
    setImages([]);
    setTotalHits(0);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showModal = ({ webformatURL, tags }) => {
    setModal(true);
    setPostDetails({
      webformatURL,
      tags,
    });
  };

  const closeModal = () => {
    setModal(false);
    setPostDetails({});
  };

  const isImages = Boolean(images.length);
  const isTotal = Boolean(totalHits > images.length);

  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      {error && <p className={styles.error}>ERROR: {error}</p>}
      {loading && <Loader />}
      {isImages && <ImageGallery showModal={showModal} items={images} />}
      {isTotal && (
        <div className={styles.loadMoreWrapper}>
          <Button type="button" onClick={loadMore}>
            {loading ? <Loader backgroundColor={'#333'} /> : 'Load more'}
          </Button>
        </div>
      )}

      {modalOpen && (
        <Modal close={closeModal}>
          <img src={postDetails.webformatURL} alt={postDetails.tags} />
        </Modal>
      )}
    </>
  );
};

export default ImageSearch;
