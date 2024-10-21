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
            <a href="mailto:support@electionspin2024.com">
              support@electionspin2024.com
            </a>
          </li>
          <li>
            <strong>Phone</strong>: +1 (123) 456-7890
          </li>
          <li>
            <strong>Address</strong>: 123 Election Lane, Washington, D.C., USA
          </li>
        </ul>
        <h3>Follow Us</h3>
        <ul>
          <li>
            <a
              href="https://twitter.com/ElectionSpin2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter: @ElectionSpin2024
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
