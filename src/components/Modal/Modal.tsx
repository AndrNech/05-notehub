import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const escHandler = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', escHandler);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', escHandler);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const modalRoot = document.getElementById('modal-root');

  if(!modalRoot) {
    alert("Couldn't display modal")
    return null;
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
      {children}
      </div>
    </div>,
    modalRoot as HTMLDivElement
  );
}
