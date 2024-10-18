import React, { useState } from "react";

const UserVotes = ({ winner, toggleWinner }) => {
  console.log("*** winner USER *** ", winner);
  console.log("*** toggleWinner USER  *** ", toggleWinner);
  const { trumpCount, setTrumpCount } = useState(0);
  const { kamalaCount, setKamalaCount } = useState(0);
  return (
    <div>
      <h4>Total Count</h4>
      <div>
        <table>
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
    </div>
  );
};

export default UserVotes;
