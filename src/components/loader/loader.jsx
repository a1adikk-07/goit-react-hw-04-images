import { Audio } from 'react-loader-spinner';
import styles from './loader.modal.css';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};

export default Loader;
