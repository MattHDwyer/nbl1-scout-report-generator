import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

import "./Matchups.css";
import { MatchupTableRow } from "./component/MatchupTableRow";

interface MatchupsProps {
  players: Array<any>;
}

export const Matchups = ({ players }: MatchupsProps) => {
  return (
    <TableContainer
      sx={{ maxWidth: 780, border: 1, zIndex: 1000 }}
      component={Paper}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Opponent</TableCell>
            <TableCell>Matchup</TableCell>
            {/* <TableCell>CLOSE OUT</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <MatchupTableRow player={player} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
