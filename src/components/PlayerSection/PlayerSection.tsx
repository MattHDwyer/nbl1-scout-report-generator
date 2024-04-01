import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import "./PlayerSection.css";
import { PlayerStatsTable } from "./PlayerStatsTable/PlayerStatsTable";
import { useEffect, useState } from "react";
import Tiptap from "../RTE/RTE";

interface PlayerStatsTableProps {
  playerName: string;
  playerCareerStats?: any;
  playerLastSeasonStats?: any;
  playerImage?: any;
  playerId: string;
}

export const PlayerSection: React.FC<PlayerStatsTableProps> = ({
  playerName,
  playerCareerStats,
  playerLastSeasonStats,
  playerImage,
  playerId,
}: any) => {
  const storagePlayerNumber = localStorage.getItem(`${playerId}-player-number`);
  const storagePlayerPosition = localStorage.getItem(
    `${playerId}-player-position`
  );
  const storagePlayerSummaryTitle = localStorage.getItem(
    `${playerId}-player-summary-title`
  );
  const storagePlayerSummary = localStorage.getItem(
    `${playerId}-player-summary`
  );
  const storagePlayerHTD = localStorage.getItem(`${playerId}-player-htd`);
  const [playerNumber, setPlayerNumber] = useState<string>(
    storagePlayerNumber ?? ""
  );
  const [playerPosition, setPlayerPosition] = useState<string>(
    storagePlayerPosition ?? ""
  );
  const [playerSummaryTitle, setPlayerSummaryTitle] = useState<string>(
    storagePlayerSummaryTitle ?? ""
  );
  const [playerSummary, setPlayerSummary] = useState<string>(
    storagePlayerSummary ?? "What the player does well/weaknesses"
  );
  const [playerHTD, setPlayerHTD] = useState<string>(
    storagePlayerHTD ?? "How to defend..."
  );

  const handleChangePlayerNumber = (string: string) => {
    setPlayerNumber(string);
  };

  const handleChangePlayerPosition = (string: string) => {
    setPlayerPosition(string);
  };

  const handleChangePlayerSummary = (string: string) => {
    setPlayerSummary(string);
  };

  const handleChangePlayerHTD = (string: string) => {
    setPlayerHTD(string);
  };
  return (
    <Stack direction="row">
      <Box sx={{ width: 780 }}>
        <Stack direction="row" alignItems={"end"}>
          <img src={playerImage?.url} />
          <Stack direction="row">
            <div className="PlayerNumberInputContainer">
              #
              <input
                value={playerNumber}
                className="PlayerNumber"
                type="text"
                onChange={(e) => handleChangePlayerNumber(e.target.value)}
                onBlur={() =>
                  localStorage.setItem(
                    `${playerId}-player-number`,
                    playerNumber
                  )
                }
              />
            </div>
            <Typography variant="h4"> | {playerName} | </Typography>
            <div className="PlayerNumberInputContainer">
              <input
                value={playerPosition}
                className="PlayerPosition"
                type="text"
                onChange={(e) => handleChangePlayerPosition(e.target.value)}
                onBlur={() =>
                  localStorage.setItem(
                    `${playerId}-player-position`,
                    playerPosition
                  )
                }
              />
            </div>
          </Stack>
        </Stack>
        <PlayerStatsTable
          playerCareerStats={playerCareerStats}
          playerLastSeasonStats={
            Object.keys(playerLastSeasonStats).length === 0
              ? null
              : playerLastSeasonStats
          }
        />
        <Stack
          direction="row"
          sx={{
            paddingTop: "4px",
            marginTop: "8px",
            border: "1px solid black",
            borderRadius: "3px",
          }}
        >
          <Stack sx={{ width: 390 }}>
            <input
              value={playerSummaryTitle}
              className="PlayerSummaryTitleInput"
              placeholder="HAND/PLAYER TYPE"
              onChange={(e) => setPlayerSummaryTitle(e.target.value)}
              onBlur={() =>
                localStorage.setItem(
                  `${playerId}-player-summary-title`,
                  playerSummaryTitle
                )
              }
            />
            <Box sx={{ marginLeft: "-8px" }}>
              <Tiptap
                value={playerSummary}
                handleOnUpdate={(props) => {
                  handleChangePlayerSummary(props.editor.getHTML());
                }}
                handleOnBlur={() => {
                  localStorage.setItem(
                    `${playerId}-player-summary`,
                    playerSummary
                  );
                }}
              />
            </Box>
          </Stack>
          <Stack sx={{ width: 390 }}>
            <input
              className="PlayerSummaryTitleInput"
              defaultValue={"HOW TO DEFEND"}
            />
            <Box sx={{ marginLeft: "-8px" }}>
              <Tiptap
                value={playerHTD}
                handleOnUpdate={(props) =>
                  handleChangePlayerHTD(props.editor.getHTML())
                }
                handleOnBlur={() => {
                  localStorage.setItem(`${playerId}-player-htd`, playerHTD);
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default PlayerSection;
