import React, { useState } from "react";
import Wheel from "./Wheel";
import styles from "./SpinWheel.module.css"; // Import the CSS module

const SpinWheel = () => {
  const [slots, setSlots] = useState(["A", "B", "C"]);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    setSpinning(true);
    setTimeout(() => {
      const shuffledSlots = [...slots].sort(() => Math.random() - 0.5);
      setSlots(shuffledSlots);
      setSpinning(false);
    }, 1000);
  };

  return (
    <div className={styles.spinWheelContainer}>
      <h1>Spin the Wheel!</h1>
      <div className={styles.wheelContainer}>
        {slots.map((slot, index) => (
          <Wheel key={index} slot={slot} spinning={spinning} />
        ))}
      </div>
      <button onClick={spin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
};

export default SpinWheel;
