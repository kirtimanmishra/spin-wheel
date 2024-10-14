import React, { useState } from "react";
import Wheel from "./Wheel";
import trumpImage from "../images/trump.png"; // Import Trump image
import styles from "./SpinWheel.module.css"; // Import the CSS module
import initImage1 from "../images/init_image_1.png"; // Import Biden image
import initImage2 from "../images/init_image_2.png"; // Import Biden image
import initImage3 from "../images/init_image_3.png"; // Import Biden image
import kamalaImage from "../images/kamala.png"; // Import Biden image

const SpinWheel = () => {
  const candidates = [trumpImage, kamalaImage]; // Use images instead of names
  const [slots, setSlots] = useState([initImage1, initImage2, initImage3]); // Initial slots
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
      const kamalaCount = newSlots.filter(
        (slot) => slot === kamalaImage
      ).length;

      // Determine the winner
      if (trumpCount >= 2) {
        setWinner("Trump");
      } else if (kamalaCount >= 2) {
        setWinner("kamala");
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

      {!spinning && (
        <button
          className={styles.spinButton}
          onClick={spin}
          disabled={spinning}
        >
          <span className={styles.spinText}>Spin</span>
        </button>
      )}

      {winner && <h2>Winner: {winner}</h2>}
    </div>
  );
};

export default SpinWheel;
