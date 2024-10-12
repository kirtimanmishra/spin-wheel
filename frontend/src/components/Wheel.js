import React from "react";
import styles from "./Wheel.module.css"; // Import the CSS module

const Wheel = ({ slot, spinning }) => {
  console.log("** slot ** ", slot);
  return (
    <div className={`${styles.wheel} ${spinning ? styles.spinning : ""}`}>
      {slot}
    </div>
  );
};

export default Wheel;
