import React, { useState } from "react";
import styles from "./UserVotes.module.css"; // Importing the new CSS module

const UserVotes = ({ winner, toggleWinner }) => {
  const [trumpCount, setTrumpCount] = useState(0);
  const [kamalaCount, setKamalaCount] = useState(0);

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
