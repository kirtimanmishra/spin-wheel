import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./UserVotes.module.css"; // Importing the new CSS module
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

const UserVotes = ({
  winner,
  toggleWinner,
  loading,
  handleUserVotesLoading,
}) => {
  const myWinner = winner.toLowerCase();
  const [trumpCount, setTrumpCount] = useState(0);
  const [kamalaCount, setKamalaCount] = useState(0);
  const [highlight, setHighlight] = useState({ trump: false, kamala: false });

  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const csrfToken = Cookies.get("csrftoken");

  useEffect(() => {
    const userId = Cookies.get("userId");

    if (userId) {
      const requestOptions = {
        method: "GET",
        url: "/api/v1/election/userVotes",
      };
      axios(requestOptions, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      })
        .then((response) => {
          const { trump_vote_count, kamala_vote_count } = response.data;
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
    } else {
      const newUserId = uuidv4();
      Cookies.set("userId", newUserId, { expires: 7 });
    }
  }, []);

  useEffect(() => {
    if (winner !== "") {
      const requestOptions = {
        method: "POST",
        url: `/api/v1/election/userVotes?winner=${myWinner}`,
      };
      axios(
        requestOptions,
        {},
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      )
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
      const userId = Cookies.get("userId");
      if (userId) {
        const requestOptions = {
          method: "GET",
          url: "/api/v1/election/userVotes",
        };
        axios(requestOptions, {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        })
          .then((response) => {
            const { trump_vote_count, kamala_vote_count } = response.data;
            setTrumpCount(trump_vote_count);
            setKamalaCount(kamala_vote_count);

            setTimeout(() => {
              setHighlight({ trump: false, kamala: false });
            }, 500);
            handleUserVotesLoading();
          })
          .catch((err) => {
            setTrumpCount((prev) => prev);
            setKamalaCount((prev) => prev);
            handleUserVotesLoading();
          });
      }
    } else {
      handleUserVotesLoading();
    }
  }, [loading]);

  return (
    <div className={styles.globalVotesContainer}>
      <h4 className={styles.header}>Your spin</h4>

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

export default UserVotes;
