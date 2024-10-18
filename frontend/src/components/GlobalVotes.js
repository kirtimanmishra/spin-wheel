import React, { useState } from "react";
import styles from "./GlobalVotes.module.css"; // Importing the new CSS module

const GlobalVotes = ({ winner, toggleWinner }) => {
  const [trumpCount, setTrumpCount] = useState(0);
  const [kamalaCount, setKamalaCount] = useState(0);

  return (
    <div className={styles.globalVotesContainer}>
      <h4 className={styles.header}>Total Count</h4>

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

export default GlobalVotes;
