import React, { useState, useEffect } from "react";
import "./App.css";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getTeamDetails, getTeamStats } from "./services/nbl1-service";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { PlayerSection, ReportHeader } from "./components";
import { Modal, Stack, TextField, Typography } from "@mui/material";
import { TeamDetails } from "./components/TeamDetails/TeamDetails";

function App() {
  const [team, setTeam] = useState<Record<string, string>>({
    teamId: "",
    teamName: "",
    logoUrl: "",
  });
  const storageTeamListOrder = window.localStorage.getItem(
    `${team.teamId}-teamListOrder`
  );
  const [teamData, setTeamData] = useState<any>(storageTeamListOrder ?? []);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showTeamSelectionHeader, setShowTeamSelectionHeader] =
    useState<boolean>(true);

  const handleShowTeamSelectionHeader = () =>
    setShowTeamSelectionHeader(!showTeamSelectionHeader);

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 600,
    overflow: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleTeamChange = (e: SelectChangeEvent) => {
    const team = teamList.find((team: any) => team.id === e.target.value);
    setTeam({ teamId: team.id, teamName: team.name, logoUrl: team.logoUrl });
  };

  useEffect(() => {
    const localStorageTeamList = window.localStorage.getItem("teamList");
    if (!localStorageTeamList) {
      getTeamDetails().then((res: any) => {
        window.localStorage.setItem("teamList", JSON.stringify(res.data));
        return;
      });
    }
  }, []);

  const teamList = JSON.parse(window.localStorage.getItem("teamList") || "[]");

  const handleClick = async () => {
    const teamStats: any = await getTeamStats(team.teamId, team.teamName);
    console.log(teamStats);
    if (storageTeamListOrder) {
      const parsedData = JSON.parse(storageTeamListOrder);
      const updatedData = parsedData.map((player: any) => {
        const foundPlayer = teamStats.data.find(
          (p: any) => p.playerId === player.playerId
        );
        if (foundPlayer) {
          return {
            ...player,
            playerCareerStats: {
              ...player.playerCareerStats,
              ...foundPlayer.playerCareerStats,
            },
            player2023Stats: {
              ...player.player2023Stats,
              ...foundPlayer.player2023Stats,
            },
          };
        }
        return player;
      });
      setTeamData(updatedData);
    } else {
      setTeamData(teamStats.data);
    }

    // setTeamData(teamStats.data);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updatedTeamData = [...teamData];
    const temp = updatedTeamData[index];
    updatedTeamData[index] = updatedTeamData[index - 1];
    updatedTeamData[index - 1] = temp;
    setTeamData(updatedTeamData);
  };

  const moveDown = (index: number) => {
    if (index === teamData.length - 1) return;
    const updatedTeamData = [...teamData];
    const temp = updatedTeamData[index];
    updatedTeamData[index] = updatedTeamData[index + 1];
    updatedTeamData[index + 1] = temp;
    setTeamData(updatedTeamData);
  };

  const handleCloseAndSave = () => {
    handleClose();
    window.localStorage.setItem(
      `${team.teamId}-teamListOrder`,
      JSON.stringify(teamData)
    );
  };

  return (
    <div id="App">
      <Box display={showTeamSelectionHeader ? "block" : "none"}>
        <h1>NBL1 Scout Report Generator</h1>
        <Box sx={{ minWidth: 120, maxWidth: 720 }}>
          <FormControl fullWidth>
            <InputLabel id="team-selection-label">Team</InputLabel>
            <Select
              labelId="team-selection-label"
              id="team-selection"
              value={team.teamId}
              onChange={handleTeamChange}
              label="Team"
            >
              {teamList.map((team: any, index: number) => (
                <MenuItem key={index} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button onClick={handleClick} disabled={!(team.teamId !== "")}>
          Fetch Data
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <h2>Change Player Order</h2>
            <Stack spacing={2}>
              {teamData.map((player: any, index: number) => (
                <Box
                  key={index}
                  sx={{ padding: "10px", border: 1, borderRadius: 3 }}
                >
                  <Stack key={index} spacing={1}>
                    {index !== 0 && (
                      <Button variant="outlined" onClick={() => moveUp(index)}>
                        Move Up
                      </Button>
                    )}
                    <Typography variant="body1">{player.playerName}</Typography>
                    {index !== teamData.length - 1 && (
                      <Button
                        variant="outlined"
                        onClick={() => moveDown(index)}
                      >
                        Move Down
                      </Button>
                    )}
                  </Stack>
                </Box>
              ))}
              <Button onClick={handleCloseAndSave}>Save</Button>
            </Stack>
          </Box>
        </Modal>
        <button onClick={handleOpen}>Change Order</button>
        <button
          onClick={handleShowTeamSelectionHeader}
          disabled={team.teamId === ""}
        >
          Hide Header
        </button>
      </Box>
      {team.teamId !== "" ? (
        <>
          <ReportHeader
            teamName={team.teamName}
            teamLogoUrl={team.logoUrl}
            teamId={team.teamId}
          />

          {teamData.map((player: any, index: number) => {
            return (
              <PlayerSection
                key={index}
                playerImage={player.playerImages}
                playerName={player.playerName}
                playerCareerStats={player.playerCareerStats}
                playerLastSeasonStats={player.player2023Stats}
                playerId={player.playerId}
              />
            );
          })}
          <TeamDetails teamId={team.teamId} />
        </>
      ) : null}
    </div>
  );
}

export default App;
