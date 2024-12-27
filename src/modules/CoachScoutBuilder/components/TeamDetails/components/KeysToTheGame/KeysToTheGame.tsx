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
import React, { useState } from "react";
import "./KeysToTheGame.css";
import Tiptap from "../../../../../../components/RTE/RTE";
import { Editor } from "@tiptap/core";
import { Transaction } from "@tiptap/pm/state";

interface KeysToTheGameType {
  offensive: string[];
  defensive: string[];
}

export const KeysToTheGame: React.FC<{ teamId: string }> = ({ teamId }) => {
  const storageKeysToTheGame = localStorage.getItem(
    `keys-to-the-game-${teamId}`
  );
  const [keysToTheGame, setKeysToTheGame] = useState<KeysToTheGameType>(
    storageKeysToTheGame
      ? JSON.parse(storageKeysToTheGame)
      : {
          offensive: [],
          defensive: [],
        }
  );

  const handleInputChange = (
    props: {
      editor: Editor;
      transaction: Transaction;
    },
    index: number,
    type: keyof KeysToTheGameType
  ) => {
    const value = props.editor.getHTML();
    setKeysToTheGame((prevState) => ({
      ...prevState,
      [type]: prevState[type].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleBlur = () => {
    localStorage.setItem(
      `keys-to-the-game-${teamId}`,
      JSON.stringify(keysToTheGame)
    );
  };

  return (
    <Box sx={{ borderTop: 1, paddingTop: "8px", width: 780 }}>
      <Typography variant="h5">Keys To The Game</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ padding: "4px" }}
                onClick={() => {
                  setKeysToTheGame((prevState) => ({
                    offensive: [...prevState.offensive, ""],
                    defensive: [...prevState.defensive, ""],
                  }));
                }}
              >
                <Typography variant="h6">OFFENSIVE</Typography>
              </TableCell>
              <TableCell
                sx={{ padding: "4px" }}
                onClick={() => {
                  setKeysToTheGame((prevState) => ({
                    offensive: prevState.offensive.slice(0, -1),
                    defensive: prevState.defensive.slice(0, -1),
                  }));
                }}
              >
                <Typography variant="h6">DEFENSIVE</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keysToTheGame.offensive.map((cell, index) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: "4px 8px", width: "50%" }}>
                  <Tiptap
                    value={cell}
                    handleOnUpdate={(props) =>
                      handleInputChange(props, index, "offensive")
                    }
                    handleOnBlur={handleBlur}
                  />
                </TableCell>
                <TableCell sx={{ padding: "4px 8px", width: "50%" }}>
                  <Tiptap
                    value={keysToTheGame.defensive[index]}
                    handleOnUpdate={(props) =>
                      handleInputChange(props, index, "defensive")
                    }
                    handleOnBlur={handleBlur}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
