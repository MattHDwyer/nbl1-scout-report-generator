import { TableCell, TableRow } from "@mui/material";
import React from "react";

export const MatchupTableRow = ({ player }: any) => {
  const playerId = player.playerId;
  const storagePlayerNumber = localStorage.getItem(`${playerId}-player-number`);

  const storagePlayerMatchup = localStorage.getItem(
    `${playerId}-player-matchup`
  );

  const [playerMatchup, setPlayerMatchup] = React.useState<string>(
    storagePlayerMatchup ?? ""
  );

  const handlePlayerMatchupChange = (value: string) => {
    console.log("hit");
    setPlayerMatchup(value);
  };

  return (
    <TableRow sx={{ display: player.playerHidden ? "none" : "table-row" }}>
      <TableCell>{storagePlayerNumber}</TableCell>
      <TableCell>{player.playerName}</TableCell>
      <TableCell sx={{ width: "100%" }}>
        <input
          type="text"
          className="MatchupsInput"
          value={playerMatchup}
          onChange={(e) => {
            handlePlayerMatchupChange(e.target.value);
          }}
          onBlur={() => {
            localStorage.setItem(`${playerId}-player-matchup`, playerMatchup);
          }}
        />
      </TableCell>
    </TableRow>
  );
};
