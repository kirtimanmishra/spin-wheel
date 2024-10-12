import React from "react";
import SpinWheel from "./components/SpinWheel";
import BottomSection from "./components/BottomSection";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <SpinWheel />
      </div>
      <div className={styles.bottomSection}>
        <BottomSection />
      </div>
    </div>
  );
};

export default App;
