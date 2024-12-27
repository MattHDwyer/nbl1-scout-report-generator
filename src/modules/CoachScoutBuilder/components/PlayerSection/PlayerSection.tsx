import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import "./PlayerSection.css";
import { PlayerStatsTable } from "./PlayerStatsTable/PlayerStatsTable";
import { useEffect, useState } from "react";
import Tiptap from "../../../../components/RTE/RTE";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import {
  postPlayerDetails,
  IPlayerDetails,
} from "../../../../services/player-details";

interface PlayerStatsTableProps {
  playerName: string;
  playerCareerStats?: any;
  playerLastSeasonStats?: any;
  playerCurrentSeasonStats?: any;
  playerLastFiveStats?: any;
  playerImage?: any;
  playerId: string;
  playerHidden: boolean;
}

export const PlayerSection: React.FC<PlayerStatsTableProps> = ({
  playerName,
  playerCareerStats,
  playerLastSeasonStats,
  playerCurrentSeasonStats,
  playerLastFiveStats,
  playerImage,
  playerId,
  playerHidden,
}: any) => {
  const storagePlayerNumber = localStorage.getItem(`${playerId}-player-number`);
  const storagePlayerPosition = localStorage.getItem(
    `${playerId}-player-position`
  );
  const storagePlayerHeight = localStorage.getItem(`${playerId}-player-height`);
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
  const [playerHeight, setPlayerHeight] = useState<string>(
    storagePlayerHeight ?? ""
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

  const { register, handleSubmit, setValue } = useForm<IPlayerDetails>({
    defaultValues: {
      playerPosition: playerPosition,
      playerNumber: playerNumber,
      playerHeight: playerHeight,
      playerHowToGuard: playerHTD,
      playerSummaryTitle: playerSummaryTitle,
      playerSummary: playerSummary,
    },
  });
  const handleChangePlayerNumber = (string: string) => {
    setPlayerNumber(string);
  };

  const handleChangePlayerPosition = (string: string) => {
    setPlayerPosition(string);
  };

  const handleChangePlayerSummary = (string: string) => {
    setValue("playerSummary", string);
    setPlayerSummary(string);
  };

  const handleChangePlayerHTD = (string: string) => {
    setValue("playerHowToGuard", string);
    setPlayerHTD(string);
  };
  const handlePlayerHeight = (string: string) => {
    setPlayerHeight(string);
  };

  const submitHandler: SubmitHandler<IPlayerDetails> = async (data) => {
    console.log(data);
    postPlayerDetails(playerId, data);
  };

  return (
    <Stack direction="row" sx={{ display: playerHidden ? "none" : "flex" }}>
      <Box sx={{ width: 780 }}>
        <Stack direction="row" alignItems={"end"}>
          <img src={playerImage?.url} />
          <Stack direction="row">
            <div className="PlayerNumberInputContainer">
              #
              <input
                {...register("playerNumber", {
                  onChange: (e) => handleChangePlayerNumber(e.target.value),
                })}
                value={playerNumber}
                className="PlayerNumber"
                type="text"
                onBlur={() => {
                  handleSubmit(submitHandler)();
                  localStorage.setItem(
                    `${playerId}-player-number`,
                    playerNumber
                  );
                }}
              />
            </div>
            <Typography variant="h4"> | {playerName} | </Typography>
            <div className="PlayerNumberInputContainer">
              <input
                {...register("playerPosition", {
                  onChange: (e) => handleChangePlayerPosition(e.target.value),
                })}
                value={playerPosition}
                className="PlayerPosition"
                type="text"
                onBlur={() => {
                  handleSubmit(submitHandler)();
                  localStorage.setItem(
                    `${playerId}-player-position`,
                    playerPosition
                  );
                }}
              />
            </div>
            <Typography variant="h4"> | </Typography>
            <div className="PlayerNumberInputContainer">
              <input
                {...register("playerHeight", {
                  onChange: (e) => handlePlayerHeight(e.target.value),
                })}
                value={playerHeight}
                className="PlayerHeight"
                type="text"
                onBlur={() => {
                  handleSubmit(submitHandler)();
                  localStorage.setItem(
                    `${playerId}-player-height`,
                    playerHeight
                  );
                }}
              />
            </div>
          </Stack>
        </Stack>
        <PlayerStatsTable
          playerName={playerName}
          playerCareerStats={playerCareerStats}
          playerLastSeasonStats={
            playerLastSeasonStats &&
            Object.keys(playerLastSeasonStats).length === 0
              ? null
              : playerLastSeasonStats
          }
          playerCurrentSeasonStats={
            playerCurrentSeasonStats &&
            Object.keys(playerCurrentSeasonStats).length === 0
              ? null
              : playerCurrentSeasonStats
          }
          playerLastFiveStats={
            playerLastFiveStats && Object.keys(playerLastFiveStats).length === 0
              ? null
              : playerLastFiveStats
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
              {...register("playerSummaryTitle", {
                onChange: (e) => setPlayerSummaryTitle(e.target.value),
              })}
              value={playerSummaryTitle}
              className="PlayerSummaryTitleInput"
              placeholder="HAND/PLAYER TYPE"
              onBlur={() => {
                handleSubmit(submitHandler)();
                localStorage.setItem(
                  `${playerId}-player-summary-title`,
                  playerSummaryTitle
                );
              }}
            />
            <Box sx={{ marginLeft: "-8px" }}>
              <Tiptap
                {...(register("playerSummary"),
                {
                  value: playerSummary,
                })}
                value={playerSummary}
                handleOnUpdate={(props) => {
                  handleChangePlayerSummary(props.editor.getHTML());
                }}
                handleOnBlur={() => {
                  handleSubmit(submitHandler)();
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
                {...register("playerHowToGuard", {
                  value: playerHTD,
                })}
                value={playerHTD}
                handleOnUpdate={(props) =>
                  handleChangePlayerHTD(props.editor.getHTML())
                }
                handleOnBlur={() => {
                  handleSubmit(submitHandler)();
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
