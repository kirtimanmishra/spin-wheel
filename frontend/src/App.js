import React from "react";
import SpinWheel from "./components/SpinWheel";
import styles from "./App.module.css";
import Bottom from "./components/Bottom";
import Header from "./components/Header";
const App = () => {
  return (
    <div className={styles.appContainer}>
      <Header />
      <SpinWheel />
      <Bottom />
    </div>
  );
};

export default App;
