import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./GlobalVotes.module.css"; // Importing the new CSS module

const GlobalVotes = ({
  winner,
  toggleWinner,
  loading,
  handleGlobalVotesLoading,
}) => {
  const myWinner = winner.toLowerCase();

  const [trumpCount, setTrumpCount] = useState(0);
  const [kamalaCount, setKamalaCount] = useState(0);
  const [highlight, setHighlight] = useState({ trump: false, kamala: false });

  useEffect(() => {
    if (winner === "") {
      const requestOptions = {
        method: "GET",
        url: "/api/v1/election/globalVotes",
      };
      axios(requestOptions).then((response) => {
        const data = response.data;
        if (data.length > 0) {
          setTrumpCount(data[0].trump_vote_count);
          setKamalaCount(data[0].kamala_vote_count);
        }
      });
    } else {
      const requestOptions = {
        method: "POST",
        url: `/api/v1/election/globalVotes?winner=${myWinner}`,
      };
      axios(requestOptions)
        .then((response) => {
          const { trump_vote_count, kamala_vote_count } = response.data;
          if (trump_vote_count > trumpCount) {
            setHighlight({ trump: true, kamala: false });
          } else if (kamala_vote_count > kamalaCount) {
            setHighlight({ trump: false, kamala: true });
          }

          setTrumpCount(trump_vote_count);
          setKamalaCount(kamala_vote_count);

          setTimeout(() => {
            setHighlight({ trump: false, kamala: false });
          }, 500);
        })
        .catch((err) => {
          setTrumpCount((prev) => prev);
          setKamalaCount((prev) => prev);
        });
    }
  }, [toggleWinner]);

  useEffect(() => {
    if (loading) {
      const requestOptions = {
        method: "GET",
        url: "/api/v1/election/globalVotes",
      };
      axios(requestOptions).then((response) => {
        const data = response.data;
        if (data.length > 0) {
          setTrumpCount(data[0].trump_vote_count);
          setKamalaCount(data[0].kamala_vote_count);
        }
        handleGlobalVotesLoading();
      });
    } else {
      handleGlobalVotesLoading();
    }
  }, [loading]);

  return (
    <div className={styles.globalVotesContainer}>
      <h4 className={styles.header}>Global Count</h4>

      <table className={styles.voteTable}>
        <thead>
          <tr>
            <th>DJ</th>
            <th>KH</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={highlight.trump ? styles.highlightIncrement : ""}>
              {trumpCount}
            </td>
            <td className={highlight.kamala ? styles.highlightIncrement : ""}>
              {kamalaCount}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GlobalVotes;
