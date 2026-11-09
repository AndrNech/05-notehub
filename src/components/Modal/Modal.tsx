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
      window.addEventListener('keydown', escHandler);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if(document.getElementById('modal-root') === null) {
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
    document.getElementById('modal-root') as HTMLDivElement
  );
}
