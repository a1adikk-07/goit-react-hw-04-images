import React, { useState, useEffect } from 'react';
import { getAllPosts } from 'api/api';
import styles from './posts.module.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await getAllPosts();
        setPosts(response.data?.length ? response.data : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const elements = posts.map(({ id, title, body }) => (
    <li key={id} className={styles.item}>
      <h3>{title}</h3>
      <p>{body}</p>
    </li>
  ));

  return (
    <>
      {error && <p className={styles.error}>ERROR: {error}</p>}
      {loading && <p>...Loading</p>}
      {Boolean(elements.length) && <ul className={styles.list}>{elements}</ul>}
    </>
  );
};

export default Posts;
