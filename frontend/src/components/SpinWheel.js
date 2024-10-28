import React, { useState, useEffect } from "react";
import Wheel from "./Wheel";
import trumpImage from "../images/trump.jpeg";
import styles from "./SpinWheel.module.css";
import initImage1 from "../images/init_image_1.jpeg";
import initImage2 from "../images/init_image_2.jpeg";
import initImage3 from "../images/init_image_3.jpeg";
import kamalaImage from "../images/kamala.jpeg";
import GlobalVotes from "./GlobalVotes";
import UserVotes from "./UserVotes";
import WinnerModal from "./WinnerModal";
import refreshLogo from "../images/logo.svg";

const SpinWheel = () => {
  const candidates = [trumpImage, kamalaImage];
  const [slots, setSlots] = useState([initImage1, initImage2, initImage3]);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState("");
  const [toggleWinner, setToggleWinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const images = [kamalaImage, trumpImage, kamalaImage, trumpImage];
  const [currentImages, setCurrentImages] = useState([
    images[0],
    images[1],
    images[2],
  ]);
  const [loading, setLoading] = useState(false);
  const [globalVotesLoading, setGlobalVotesLoading] = useState("start");
  const [UserVotesLoading, setUserVotesLoading] = useState("start");

  const handleRefresh = () => {
    setLoading(true);
    setGlobalVotesLoading("start");
    setUserVotesLoading("start");
  };

  const handleGlobalVotesLoading = () => {
    setGlobalVotesLoading("finish");
  };

  const handleUserVotesLoading = () => {
    setUserVotesLoading("finish");
  };

  useEffect(() => {
    if (globalVotesLoading === "finish" && UserVotesLoading === "finish")
      setLoading(false);
  }, [loading, globalVotesLoading, UserVotesLoading]);

  const spin = () => {
    setSpinning(true);

    setTimeout(() => {
      const newSlots = slots.map(
        () => candidates[Math.floor(Math.random() * 2)]
      );
      setSlots(newSlots);
      const trumpCount = newSlots.filter((slot) => slot === trumpImage).length;
      const kamalaCount = newSlots.filter(
        (slot) => slot === kamalaImage
      ).length;

      let newWinner = "No winner";
      if (trumpCount >= 2) {
        newWinner = "Trump";
      } else if (kamalaCount >= 2) {
        newWinner = "Kamala";
      }
      setWinner(newWinner);
      setToggleWinner((prev) => !prev);
      setSpinning(false);
      setShowModal(true);
      closeModal();
    }, 2000);
  };

  useEffect(() => {
    if (spinning) {
      const intervalId = setInterval(() => {
        setCurrentImages((prevImages) =>
          prevImages.map(
            () => images[Math.floor(Math.random() * images.length)]
          )
        );
      }, 200);

      return () => clearInterval(intervalId);
    } else {
      setCurrentImages([images[0], images[1], images[2]]);
    }
  }, [spinning]);

  const closeModal = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 1500);
  };

  return (
    <div className={styles.spinWheelContainer}>
      {showModal && <WinnerModal winner={winner} />}

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

        {loading ? (
          <img src={refreshLogo} alt="Refresh" className={styles.loading} />
        ) : (
          <img
            src={refreshLogo}
            className={styles.refreshIconAsButton}
            onClick={handleRefresh}
          />
        )}
      </div>

      <GlobalVotes
        winner={winner}
        toggleWinner={toggleWinner}
        loading={loading}
        handleGlobalVotesLoading={handleGlobalVotesLoading}
      />
      <UserVotes
        winner={winner}
        toggleWinner={toggleWinner}
        loading={loading}
        handleUserVotesLoading={handleUserVotesLoading}
      />
    </div>
  );
};

export default SpinWheel;
