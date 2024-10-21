import React from "react";
import SpinWheel from "./components/SpinWheel";
import styles from "./App.module.css";
import Header from "./components/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Header />
      <SpinWheel />
      <Footer />
    </div>
  );
};

export default App;
