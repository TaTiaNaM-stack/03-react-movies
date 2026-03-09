
import css from './MovieModal.module.css'
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface MovieModalProps {
  src: string;
  onClose: () => void;
}

export default function MovieModal({ src, onClose }: MovieModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
   useEffect(() => {
	  const handleKeyDown = (e: KeyboardEvent) => {
	    if (e.key === "Escape") {
	      onClose();
	    }
	  };
	
	  document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

	
	  return () => {
	    document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
	  };
	}, [onClose]);

  return createPortal(

<div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
  <div className={css.modal}>
    <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
      &times;
    </button>
    <img
      src={src}
      alt="movie_title"
      className={css.image}
    />
    <div className={css.content}>
      <h2>movie_title</h2>
      <p>movie_overview</p>
      <p>
        <strong>Release Date:</strong> movie_release_date
      </p>
      <p>
        <strong>Rating:</strong> movie_vote_average/10
      </p>
    </div>
  </div>
</div>,
 document.body
  )
}
