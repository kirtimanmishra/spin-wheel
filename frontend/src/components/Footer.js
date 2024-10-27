import React from "react";
import styles from "./Footer.module.css"; // Import the CSS module

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <hr className={styles.horizontalLine} />
      <div className={styles.contactSection}>
        <h2>Contact Us</h2>
        <p>
          We'd love to hear from you! If you have any questions, feedback, or
          suggestions, please feel free to get in touch with us.
        </p>
        <ul>
          <li>
            <strong>Email</strong>:{" "}
            <a href="mailto:udiapplemail@gmail.com">udiapplemail@gmail.com</a>
          </li>
          <li>
            <strong>Phone</strong>: +91 6002185460
          </li>
          <li>
            <strong>Address</strong>: Guwahati, Assam, India, 781028
          </li>
        </ul>
        <ul>
          <li>
            <a
              href="https://x.com/kirtiman_dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter: @kirtiman_dev
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/ElectionSpin2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook: ElectionSpin2024
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.aboutSection}>
        <h2>About Us</h2>
        <p>
          Welcome to ElectionSpin2024.com, where politics meets excitement! Our
          website is dedicated to providing a fun and engaging experience for
          all those interested in the upcoming 2024 US presidential election.
        </p>
        <p>
          Our mission is to create a lighthearted way for people to engage with
          the election season while seeing the chances of their preferred
          candidate winning. Whether you’re a political enthusiast, a casual
          observer, or just someone looking for a bit of entertainment,
          ElectionSpin2024.com has something for you.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
