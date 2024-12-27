import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

export const FreeThrowShotChart: React.FC<{ players: any }> = ({ players }) => {
  return (
    <Box>
      <Typography variant="h5">Free Throw Shooters</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>PLAYER</TableCell>
              <TableCell>FTM-A</TableCell>
              <TableCell>FT%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{player.playerName}</TableCell>
                  <TableCell>{`${parseFloat(
                    player.playerCareerStats?.freeThrowsMadePerGame
                  ).toFixed(1)}-${parseFloat(
                    player.playerCareerStats?.freeThrowsAttemptedPerGame
                  ).toFixed(1)}`}</TableCell>
                  <TableCell>{player.ftm}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
