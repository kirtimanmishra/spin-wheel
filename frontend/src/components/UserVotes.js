import React, { useEffect } from "react";

const UserVotes = ({ winner, refreshVotes }) => {
  useEffect(() => {
    if (winner) {
      console.log("User Votes updated: ", winner);
      // Add logic to fetch and display user votes related to the winner
    }
  }, [winner, refreshVotes]); // Trigger when either winner or refreshVotes changes

  return (
    <div>
      <h3>User Votes</h3>
      <p>Winner: {winner}</p>
      {/* Render user vote counts or related information here */}
    </div>
  );
};

export default UserVotes;
