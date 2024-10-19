import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./UserVotes.module.css"; // Importing the new CSS module
import Cookies from "js-cookie";

const UserVotes = ({ winner, toggleWinner }) => {
  const [trumpCount, setTrumpCount] = useState(0);
  const [kamalaCount, setKamalaCount] = useState(0);

  const backendURL = process.env.REACT_APP_BACKEND_URL;
  // Cookies.set("user_id", "12345", { expires: 7 });

  useEffect(() => {
    console.log("### winner USER #### ", winner);
    console.log("### winner USER #### ", typeof winner);

    if (winner !== "") {
      axios
        .post(`${backendURL}/election/userVotes?winner=${winner}`, {
          withCredentials: true,
        })
        .then((response) => {
          const { trump_vote_count, kamala_vote_count } = response.data;
          setTrumpCount(trump_vote_count);
          setKamalaCount(kamala_vote_count);
        })
        .catch((err) => {
          setTrumpCount((prev) => prev);
          setKamalaCount((prev) => prev);
        });
    }
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
