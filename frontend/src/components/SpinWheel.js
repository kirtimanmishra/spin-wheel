import React, { useState, useEffect } from "react";
import Wheel from "./Wheel";
import trumpImage from "../images/trump.png"; // Import Trump image
import styles from "./SpinWheel.module.css"; // Import the CSS module
import initImage1 from "../images/init_image_1.png"; // Import Biden image
import initImage2 from "../images/init_image_2.png"; // Import Biden image
import initImage3 from "../images/init_image_3.png"; // Import Biden image
import kamalaImage from "../images/kamala.png"; // Import Biden image
import GlobalVotes from "./GlobalVotes";
import UserVotes from "./UserVotes";

const SpinWheel = () => {
  const candidates = [trumpImage, kamalaImage]; // Use images instead of names
  const [slots, setSlots] = useState([initImage1, initImage2, initImage3]); // Initial slots
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(""); // State to track the winner
  const [toggleWinner, setToggleWinner] = useState(false);

  const images = [kamalaImage, trumpImage, kamalaImage, trumpImage];
  const [currentImages, setCurrentImages] = useState([
    images[0],
    images[1],
    images[2],
  ]);

  // Function to spin the wheel and determine the winner
  const spin = () => {
    setSpinning(true);

    setTimeout(() => {
      // Randomly assign Trump or Biden images to each slot
      const newSlots = slots.map(
        () => candidates[Math.floor(Math.random() * 2)]
      );
      setSlots(newSlots);
      // calculateWinner(newSlots);
      const trumpCount = newSlots.filter((slot) => slot === trumpImage).length;
      const kamalaCount = newSlots.filter(
        (slot) => slot === kamalaImage
      ).length;

      // Determine the winner
      let newWinner = "No winner";
      if (trumpCount >= 2) {
        newWinner = "trump";
      } else if (kamalaCount >= 2) {
        newWinner = "kamala";
      }
      setWinner(newWinner);
      setToggleWinner((prev) => !prev);
      setSpinning(false);
    }, 2000); // Spin for 2 seconds
  };

  // const calculateWinner = (newSlots) => {
  //   // Count occurrences of Trump and Biden
  //   setTimeout(() => {
  //     const trumpCount = newSlots.filter((slot) => slot === trumpImage).length;
  //     const kamalaCount = newSlots.filter(
  //       (slot) => slot === kamalaImage
  //     ).length;

  //     // Determine the winner
  //     let newWinner = "No winner";
  //     if (trumpCount >= 2) {
  //       newWinner = "Trump";
  //     } else if (kamalaCount >= 2) {
  //       newWinner = "Kamala";
  //     }
  //     setWinner(newWinner);
  //     setToggleWinner((prev) => !prev);
  //     setSpinning(false);
  //     setToggleWinner((prev) => !prev);
  //   }, 4000);
  // };

  useEffect(() => {
    if (spinning) {
      const intervalId = setInterval(() => {
        setCurrentImages((prevImages) =>
          prevImages.map(
            () => images[Math.floor(Math.random() * images.length)]
          )
        );
      }, 200); // Change images every 100ms

      return () => clearInterval(intervalId);
    } else {
      // Reset the images when not spinning
      setCurrentImages([images[0], images[1], images[2]]);
    }
  }, [spinning]);

  return (
    <div className={styles.spinWheelContainer}>
      {/* Conditional rendering based on spinning state */}
      {spinning ? (
        <div className={styles.loader}>
          {currentImages.map((img, index) => (
            <div key={index} className={styles.imageWrapper}>
              <img
                src={img}
                alt={`loader-${index}`}
                className={styles.loaderImage}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.wheelContainer}>
          {slots.map((slot, index) => (
            <Wheel key={index} slot={slot} spinning={spinning} />
          ))}
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button
          className={styles.spinButton}
          onClick={spin}
          disabled={spinning}
        >
          {spinning ? (
            <span className={styles.spinTextLoading}>Loading...</span>
          ) : (
            <span className={styles.spinText}>Spin</span>
          )}
        </button>
      </div>

      <div className={styles.resultsContainer}>
        <div className={styles.votesWrapper}>
          <GlobalVotes winner={winner} toggleWinner={toggleWinner} />
        </div>
        <div className={styles.verticalLine} />
        <div className={styles.votesWrapper}>
          <UserVotes winner={winner} toggleWinner={toggleWinner} />
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
