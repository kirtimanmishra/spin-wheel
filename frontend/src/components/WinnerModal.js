import React, { useEffect } from "react";
import styles from "./WinnerModal.module.css"; // CSS for styling the modal

const WinnerModal = ({ winner, closeModal }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Winner!</h2>
        <p>
          <strong>{winner}</strong>
        </p>
      </div>
    </div>
  );
};

export default WinnerModal;
