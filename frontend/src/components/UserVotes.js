import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./UserVotes.module.css"; // Importing the new CSS module

const UserVotes = ({ winner, toggleWinner }) => {
  const [trumpCount, setTrumpCount] = useState(0);
  const [kamalaCount, setKamalaCount] = useState(0);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/election/userVotes?winner=${winner}`
        );
        console.log("**** response USER **** ", response.data);
        const data = await response.data;
        setTrumpCount(data.trump_vote_count);
        setKamalaCount(data.kamala_vote_count);
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };
    fetchVotes();
  }, [toggleWinner]);

  return (
    <div className={styles.globalVotesContainer}>
      <h4 className={styles.header}>Your spin</h4>

      <table className={styles.voteTable}>
        <thead>
          <tr>
            <th>Trump</th>
            <th>Kamala</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{trumpCount}</td>
            <td>{kamalaCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserVotes;
