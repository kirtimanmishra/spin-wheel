import React, { useState } from "react";
import Wheel from "./Wheel";
import styles from "./SpinWheel.module.css"; // Import the CSS module

const SpinWheel = () => {
  const candidates = ["Trump", "Biden"]; // Possible options for slots
  const [slots, setSlots] = useState(["A", "B", "C"]); // Initial slots
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(""); // State to track the winner

  // Function to spin the wheel and determine the winner
  const spin = () => {
    setSpinning(true);
    setWinner(""); // Reset winner state before spinning

    setTimeout(() => {
      // Randomly assign "Trump" or "Biden" to each slot
      const newSlots = slots.map(
        () => candidates[Math.floor(Math.random() * 2)]
      );
      setSlots(newSlots);

      // Count occurrences of "Trump" and "Biden"
      const trumpCount = newSlots.filter((slot) => slot === "Trump").length;
      const bidenCount = newSlots.filter((slot) => slot === "Biden").length;

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
      <h1>Spin the Wheel!</h1>

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

      <button onClick={spin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </button>

      {winner && <h2>Winner: {winner}</h2>}
    </div>
  );
};

export default SpinWheel;
