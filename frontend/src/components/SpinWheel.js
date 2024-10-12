import React, { useState } from "react";
import Wheel from "./Wheel";
import trumpImage from "../images/trump.png"; // Import Trump image
import bidenImage from "../images/biden.png"; // Import Biden image
import styles from "./SpinWheel.module.css"; // Import the CSS module

const SpinWheel = () => {
  const candidates = [trumpImage, bidenImage]; // Use images instead of names
  const [slots, setSlots] = useState([trumpImage, bidenImage, trumpImage]); // Initial slots
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(""); // State to track the winner

  // Function to spin the wheel and determine the winner
  const spin = () => {
    setSpinning(true);
    setWinner(""); // Reset winner state before spinning

    setTimeout(() => {
      // Randomly assign Trump or Biden images to each slot
      const newSlots = slots.map(
        () => candidates[Math.floor(Math.random() * 2)]
      );
      setSlots(newSlots);

      // Count occurrences of Trump and Biden
      const trumpCount = newSlots.filter((slot) => slot === trumpImage).length;
      const bidenCount = newSlots.filter((slot) => slot === bidenImage).length;

      // Determine the winner
      if (trumpCount >= 2) {
        setWinner("Trump");
      } else if (bidenCount >= 2) {
        setWinner("Biden");
      } else {
        setWinner("No winner");
      }

      setSpinning(false);
    }, 2000); // Spin for 2 seconds
  };

  return (
    <div className={styles.spinWheelContainer}>
      {/* Loader appears while spinning */}
      {spinning ? (
        <div className={styles.loader}></div>
      ) : (
        <div className={styles.wheelContainer}>
          {slots.map((slot, index) => (
            <Wheel key={index} slot={slot} spinning={spinning} />
          ))}
        </div>
      )}

      <button className={styles.spinButton} onClick={spin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </button>

      {winner && <h2>Winner: {winner}</h2>}
    </div>
  );
};

export default SpinWheel;
