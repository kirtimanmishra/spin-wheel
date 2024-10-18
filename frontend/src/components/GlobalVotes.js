import React, { useEffect } from "react";

const GlobalVotes = ({ winner, refreshVotes }) => {
  useEffect(() => {
    if (winner) {
      console.log("Global Votes updated: ", winner);
      // Add logic to fetch and display global votes related to the winner
    }
  }, [winner, refreshVotes]); // Trigger when either winner or refreshVotes changes

  return (
    <div>
      <h3>Global Votes</h3>
      <p>Winner: {winner}</p>
      {/* Render global vote counts or related information here */}
    </div>
  );
};

export default GlobalVotes;
