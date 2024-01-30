import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ close, children }) => {
  const closeModal = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const closeModal = ({ code }) => {
      if (code === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [close]);

  return createPortal(
    <div onClick={closeModal} className={styles.overlay}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
