import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getTeamDetails, getTeamStats } from "../../services/nbl1-service";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { PlayerSection, ReportHeader } from "./components";
import { Modal, Stack, Typography } from "@mui/material";
import { TeamDetails } from "./components/TeamDetails/TeamDetails";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ITeamScoutConfigDetails,
  updateTeamScoutConfigDetails,
} from "../../services/teams";

export const ConstructScout = () => {
  const [team, setTeam] = useState<Record<string, string>>({
    teamId: "",
    teamName: "",
    logoUrl: "",
  });
  const storageTeamListOrder = window.localStorage.getItem(
    `${team.teamId}-teamListOrder`
  );
  const [teamData, setTeamData] = useState<any>(storageTeamListOrder ?? []);
  const [playerOrderModal, setPlayerOrderOpen] = useState<boolean>(false);
  const [documentOptionsModal, setDocumentOptionsOpen] =
    useState<boolean>(false);
  const handlePlayerOrderOpen = () => setPlayerOrderOpen(true);
  const handlePlayerOrderClose = () => setPlayerOrderOpen(false);
  const handleDocumentOptionsOpen = () => setDocumentOptionsOpen(true);
  const handleDocumentOptionsClose = () => setDocumentOptionsOpen(false);
  const [showTeamSelectionHeader, setShowTeamSelectionHeader] =
    useState<boolean>(true);

  const handleShowTeamSelectionHeader = () =>
    setShowTeamSelectionHeader(!showTeamSelectionHeader);

  const [scoutPublished, setScoutPublished] = useState<boolean>(false);
  const [showDepthChart, setShowDepthChart] = useState<boolean>(true);
  const [showMatchups, setShowMatchups] = useState<boolean>(true);
  const [showDefensiveSchemes, setShowDefensiveSchemes] =
    useState<boolean>(true);
  const [showKeysToTheGame, setShowKeysToTheGame] = useState<boolean>(true);
  const [showFreeThrowChart, setShowFreeThrowChart] = useState<boolean>(false);

  const {
    register: registerScoutConfig,
    handleSubmit: handleScoutConfigSubmit,
    setValue: setScoutConfigValue,
  } = useForm<ITeamScoutConfigDetails>({
    defaultValues: {
      teamId: team.teamId,
      showDepthChart: showDepthChart,
      showMatchups: showMatchups,
      showDefensiveSchemes: showDefensiveSchemes,
      showKeysToTheGame: showKeysToTheGame,
    },
    values: {
      teamId: team.teamId,
      scoutPublished: scoutPublished,
      showDepthChart: showDepthChart,
      showMatchups: showMatchups,
      showDefensiveSchemes: showDefensiveSchemes,
      showKeysToTheGame: showKeysToTheGame,
    },
  });

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
    setTeamData([]);
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
    const teamStats: any = await getTeamStats(team.teamId);
    if (storageTeamListOrder) {
      const parsedData = JSON.parse(storageTeamListOrder);
      const updatedData = parsedData.map((player: any) => {
        const foundPlayer = teamStats.data.find(
          (p: any) => p.playerId === player.playerId
        );
        if (foundPlayer) {
          return {
            ...player,
            playerHidden: player.playerHidden ?? false,
            player2024Stats: {
              ...player.player2024Stats,
              ...foundPlayer.player2024Stats,
            },
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

  const handlePlayerOrderCloseAndSave = () => {
    handlePlayerOrderClose();
    window.localStorage.setItem(
      `${team.teamId}-teamListOrder`,
      JSON.stringify(teamData)
    );
  };

  const togglePlayerHidden = (index: number) => {
    const updatedTeamData = [...teamData];
    updatedTeamData[index] = {
      ...updatedTeamData[index],
      playerHidden: !updatedTeamData[index].playerHidden,
    };
    setTeamData(updatedTeamData);
  };

  useEffect(() => {
    if (team.teamId !== "") {
      setScoutConfigValue("teamId", team.teamId);
    }
  }, [team.teamId]);

  const submitScoutConfigHandler: SubmitHandler<
    ITeamScoutConfigDetails
  > = async (data) => {
    console.log(data);
    await updateTeamScoutConfigDetails(data);
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
        <Modal open={playerOrderModal} onClose={handlePlayerOrderClose}>
          <Box sx={modalStyle}>
            <h2>Change Player Order</h2>
            <Stack spacing={2}>
              {teamData.map((player: any, index: number) => {
                return (
                  <Box
                    key={index}
                    sx={{ padding: "10px", border: 1, borderRadius: 3 }}
                  >
                    <Stack key={index} spacing={1}>
                      {index !== 0 && (
                        <Button
                          variant="outlined"
                          onClick={() => moveUp(index)}
                        >
                          Move Up
                        </Button>
                      )}
                      <Stack direction={"row"}>
                        <Typography variant="body1">
                          {player.playerName}
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => togglePlayerHidden(index)}
                        >
                          {player.playerHidden ? "SHOW" : "HIDE"}
                        </Button>
                      </Stack>
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
                );
              })}
              <Button onClick={handlePlayerOrderCloseAndSave}>Save</Button>
            </Stack>
          </Box>
        </Modal>

        <Modal open={documentOptionsModal} onClose={handleDocumentOptionsClose}>
          <Box sx={modalStyle}>
            <h2>Scouting Report Config</h2>
            <Stack spacing={2}>
              <Box sx={{ padding: "10px", border: 1, borderRadius: 3 }}>
                <Stack spacing={1}>
                  <Button
                    {...registerScoutConfig("scoutPublished")}
                    // value={showDepthChart}
                    variant="contained"
                    onClick={() => setScoutPublished(!scoutPublished)}
                  >
                    Publish Scout: {scoutPublished ? "TRUE" : "FALSE"}
                  </Button>
                  <Button
                    {...registerScoutConfig("showDepthChart")}
                    // value={showDepthChart}
                    variant="contained"
                    onClick={() => setShowDepthChart(!showDepthChart)}
                  >
                    Depth Chart: {showDepthChart ? "SHOW" : "HIDE"}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setShowMatchups(!showMatchups)}
                    {...registerScoutConfig("showMatchups")}
                  >
                    Matchups: {showMatchups ? "SHOW" : "HIDE"}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() =>
                      setShowDefensiveSchemes(!showDefensiveSchemes)
                    }
                    {...registerScoutConfig("showDefensiveSchemes")}
                  >
                    Defensive Schemes: {showDefensiveSchemes ? "SHOW" : "HIDE"}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setShowKeysToTheGame(!showKeysToTheGame)}
                    {...registerScoutConfig("showKeysToTheGame")}
                  >
                    Keys To The Game: {showKeysToTheGame ? "SHOW" : "HIDE"}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setShowFreeThrowChart(!showFreeThrowChart)}
                    disabled={true}
                    // {...registerScoutConfig("showFreeThrowChart")}
                  >
                    *COMING SOON* Free Throw Chart:{" "}
                    {showFreeThrowChart ? "SHOW" : "HIDE"}
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={handleScoutConfigSubmit(submitScoutConfigHandler)}
                  >
                    SAVE
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Modal>

        <button onClick={handlePlayerOrderOpen} disabled={team.teamId === ""}>
          Change Order
        </button>
        <button
          onClick={handleShowTeamSelectionHeader}
          disabled={team.teamId === ""}
        >
          Hide Header
        </button>
        <button
          onClick={handleDocumentOptionsOpen}
          disabled={team.teamId === ""}
        >
          Configure Scout
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
            console.log(player);
            return (
              <PlayerSection
                key={index}
                playerImage={player.playerImages}
                playerName={player.playerName}
                playerCareerStats={player.playerCareerStats}
                playerLastSeasonStats={player.player2023Stats}
                playerCurrentSeasonStats={player.player2024Stats}
                playerLastFiveStats={player.playerLastFiveStats}
                playerId={player.playerId}
                playerHidden={player.playerHidden}
              />
            );
          })}
          <TeamDetails
            showDepthChart={showDepthChart}
            showMatchups={showMatchups}
            showDefensiveSchemes={showDefensiveSchemes}
            showKeysToTheGame={showKeysToTheGame}
            showFreeThrowChart={showFreeThrowChart}
            teamId={team.teamId}
            players={teamData}
          />
        </>
      ) : null}
    </div>
  );
};
