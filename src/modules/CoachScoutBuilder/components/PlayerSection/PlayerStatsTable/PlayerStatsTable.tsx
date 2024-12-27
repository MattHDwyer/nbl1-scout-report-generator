import { convertTime } from "../../../../../utils/conversion";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

interface PlayerStatsTableProps {
  playerName: string;
  playerCareerStats?: any;
  playerLastSeasonStats?: any;
  playerCurrentSeasonStats?: any;
  playerLastFiveStats?: any;
}

type PlayerStatsObj = {
  pointsPerGame: string | number;
  minutesPerGame: string | number;
  pointsTwoMadeAttemptedPerGame: string | number;
  pointsTwoPercentage: string | number;
  pointsThreeMadeAttemptedPerGame: string | number;
  pointsThreePercentage: string | number;
  freeThrowsMadeAttemptedPerGame: string | number;
  fieldGoalsMadeAttemptedPerGame: string | number;
  fieldGoalsPercentage: string | number;
  freeThrowsPercentage: string | number;
  reboundsOffensivePerGame: string | number;
  reboundsDefensivePerGame: string | number;
  reboundsPerGame: string | number;
  assistsPerGame: string | number;
  turnoversPerGame: string | number;
  stealsPerGame: string | number;
  blocksPerGame: string | number;
  foulsPersonalPerGame: string | number;
};

export const PlayerStatsTable: React.FC<PlayerStatsTableProps> = ({
  playerName,
  playerCareerStats,
  playerLastSeasonStats,
  playerCurrentSeasonStats,
  playerLastFiveStats,
}) => {
  const playerCareerStatsObj: PlayerStatsObj = {
    pointsPerGame: parseFloat(playerCareerStats?.pointsPerGame).toFixed(1),
    minutesPerGame: convertTime(playerCareerStats?.minutesPerGame),
    pointsTwoMadeAttemptedPerGame: `${parseFloat(
      playerCareerStats?.pointsTwoMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerCareerStats?.pointsTwoAttemptedPerGame
    ).toFixed(1)}`,
    pointsTwoPercentage: parseFloat(
      playerCareerStats?.pointsTwoPercentage
    ).toFixed(1),
    pointsThreeMadeAttemptedPerGame: `${parseFloat(
      playerCareerStats?.pointsThreeMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerCareerStats?.pointsThreeAttemptedPerGame
    ).toFixed(1)}`,
    pointsThreePercentage: parseFloat(
      playerCareerStats?.pointsThreePercentage
    ).toFixed(1),
    fieldGoalsMadeAttemptedPerGame: `${parseFloat(
      playerCareerStats?.pointsTwoMadePerGame +
        playerCareerStats?.pointsThreeMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerCareerStats?.pointsTwoAttemptedPerGame +
        playerCareerStats?.pointsThreeAttemptedPerGame
    ).toFixed(1)}`,
    fieldGoalsPercentage: parseFloat(
      playerCareerStats?.fieldGoalsPercentage
    ).toFixed(1),
    freeThrowsMadeAttemptedPerGame: `${parseFloat(
      playerCareerStats?.freeThrowsMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerCareerStats?.freeThrowsAttemptedPerGame
    ).toFixed(1)}`,
    freeThrowsPercentage: parseFloat(
      playerCareerStats?.freeThrowsPercentage
    ).toFixed(1),
    reboundsOffensivePerGame: parseFloat(
      playerCareerStats?.reboundsOffensivePerGame
    ).toFixed(1),
    reboundsDefensivePerGame: parseFloat(
      playerCareerStats?.reboundsDefensivePerGame
    ).toFixed(1),
    reboundsPerGame: parseFloat(playerCareerStats?.reboundsPerGame).toFixed(1),
    assistsPerGame: parseFloat(playerCareerStats?.assistsPerGame).toFixed(1),
    turnoversPerGame: parseFloat(playerCareerStats?.turnoversPerGame).toFixed(
      1
    ),
    stealsPerGame: parseFloat(playerCareerStats?.stealsPerGame).toFixed(1),
    blocksPerGame: parseFloat(playerCareerStats?.blocksPerGame).toFixed(1),
    foulsPersonalPerGame: parseFloat(
      playerCareerStats?.foulsPersonalPerGame
    ).toFixed(1),
  };

  const playerCurrentSeasonStatsObj: PlayerStatsObj = {
    pointsPerGame: parseFloat(playerCurrentSeasonStats?.pointsPerGame).toFixed(
      1
    ),
    minutesPerGame: convertTime(playerCurrentSeasonStats?.minutesPerGame),
    pointsTwoMadeAttemptedPerGame: `${parseFloat(
      playerCurrentSeasonStats?.pointsTwoMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerCurrentSeasonStats?.pointsTwoAttemptedPerGame
    ).toFixed(1)}`,
    pointsTwoPercentage: parseFloat(
      playerCurrentSeasonStats?.pointsTwoPercentage
    ).toFixed(1),
    pointsThreeMadeAttemptedPerGame: `${parseFloat(
      playerCurrentSeasonStats?.pointsThreeMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerCurrentSeasonStats?.pointsThreeAttemptedPerGame
    ).toFixed(1)}`,
    pointsThreePercentage: parseFloat(
      playerCurrentSeasonStats?.pointsThreePercentage
    ).toFixed(1),
    fieldGoalsMadeAttemptedPerGame: `${parseFloat(
      playerCurrentSeasonStats?.pointsTwoMadePerGame +
        playerCurrentSeasonStats?.pointsThreeMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerCurrentSeasonStats?.pointsTwoAttemptedPerGame +
        playerCurrentSeasonStats?.pointsThreeAttemptedPerGame
    ).toFixed(1)}`,
    fieldGoalsPercentage: parseFloat(
      playerCurrentSeasonStats?.fieldGoalsPercentage
    ).toFixed(1),
    freeThrowsMadeAttemptedPerGame: `${parseFloat(
      playerCurrentSeasonStats?.freeThrowsMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerCurrentSeasonStats?.freeThrowsAttemptedPerGame
    ).toFixed(1)}`,
    freeThrowsPercentage: parseFloat(
      playerCurrentSeasonStats?.freeThrowsPercentage
    ).toFixed(1),
    reboundsOffensivePerGame: parseFloat(
      playerCurrentSeasonStats?.reboundsOffensivePerGame
    ).toFixed(1),
    reboundsDefensivePerGame: parseFloat(
      playerCurrentSeasonStats?.reboundsDefensivePerGame
    ).toFixed(1),
    reboundsPerGame: parseFloat(
      playerCurrentSeasonStats?.reboundsPerGame
    ).toFixed(1),
    assistsPerGame: parseFloat(
      playerCurrentSeasonStats?.assistsPerGame
    ).toFixed(1),
    turnoversPerGame: parseFloat(
      playerCurrentSeasonStats?.turnoversPerGame
    ).toFixed(1),
    stealsPerGame: parseFloat(playerCurrentSeasonStats?.stealsPerGame).toFixed(
      1
    ),
    blocksPerGame: parseFloat(playerCurrentSeasonStats?.blocksPerGame).toFixed(
      1
    ),
    foulsPersonalPerGame: parseFloat(
      playerCurrentSeasonStats?.foulsPersonalPerGame
    ).toFixed(1),
  };

  const playerLastFiveStatsObj: PlayerStatsObj = {
    pointsPerGame: parseFloat(playerLastFiveStats?.pointsPerGame).toFixed(1),
    minutesPerGame: convertTime(playerLastFiveStats?.minutesPerGame),
    pointsTwoMadeAttemptedPerGame: `${parseFloat(
      playerLastFiveStats?.pointsTwoMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerLastFiveStats?.pointsTwoAttemptedPerGame
    ).toFixed(1)}`,
    pointsTwoPercentage: parseFloat(
      playerLastFiveStats?.pointsTwoPercentage
    ).toFixed(1),
    pointsThreeMadeAttemptedPerGame: `${parseFloat(
      playerLastFiveStats?.pointsThreeMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerLastFiveStats?.pointsThreeAttemptedPerGame
    ).toFixed(1)}`,
    pointsThreePercentage: parseFloat(
      playerLastFiveStats?.pointsThreePercentage
    ).toFixed(1),
    fieldGoalsMadeAttemptedPerGame: `${parseFloat(
      playerLastFiveStats?.pointsTwoMadePerGame +
        playerLastFiveStats?.pointsThreeMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerLastFiveStats?.pointsTwoAttemptedPerGame +
        playerLastFiveStats?.pointsThreeAttemptedPerGame
    ).toFixed(1)}`,
    fieldGoalsPercentage: parseFloat(
      playerLastFiveStats?.fieldGoalsPercentage
    ).toFixed(1),
    freeThrowsMadeAttemptedPerGame: `${parseFloat(
      playerLastFiveStats?.freeThrowsMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerLastFiveStats?.freeThrowsAttemptedPerGame
    ).toFixed(1)}`,
    freeThrowsPercentage: parseFloat(
      playerLastFiveStats?.freeThrowsPercentage
    ).toFixed(1),
    reboundsOffensivePerGame: parseFloat(
      playerLastFiveStats?.reboundsOffensivePerGame
    ).toFixed(1),
    reboundsDefensivePerGame: parseFloat(
      playerLastFiveStats?.reboundsDefensivePerGame
    ).toFixed(1),
    reboundsPerGame: parseFloat(playerLastFiveStats?.reboundsPerGame).toFixed(
      1
    ),
    assistsPerGame: parseFloat(playerLastFiveStats?.assistsPerGame).toFixed(1),
    turnoversPerGame: parseFloat(playerLastFiveStats?.turnoversPerGame).toFixed(
      1
    ),
    stealsPerGame: parseFloat(playerLastFiveStats?.stealsPerGame).toFixed(1),
    blocksPerGame: parseFloat(playerLastFiveStats?.blocksPerGame).toFixed(1),
    foulsPersonalPerGame: parseFloat(
      playerLastFiveStats?.foulsPersonalPerGame
    ).toFixed(1),
  };

  const playerLastSeasonStatsObj: PlayerStatsObj = {
    pointsPerGame: parseFloat(playerLastSeasonStats?.pointsPerGame).toFixed(1),
    minutesPerGame: convertTime(playerLastSeasonStats?.minutesPerGame),
    pointsTwoMadeAttemptedPerGame: `${parseFloat(
      playerLastSeasonStats?.pointsTwoMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerLastSeasonStats?.pointsTwoAttemptedPerGame
    ).toFixed(1)}`,
    pointsTwoPercentage: parseFloat(
      playerLastSeasonStats?.pointsTwoPercentage
    ).toFixed(1),
    pointsThreeMadeAttemptedPerGame: `${parseFloat(
      playerLastSeasonStats?.pointsThreeMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerLastSeasonStats?.pointsThreeAttemptedPerGame
    ).toFixed(1)}`,
    pointsThreePercentage: parseFloat(
      playerLastSeasonStats?.pointsThreePercentage
    ).toFixed(1),
    fieldGoalsMadeAttemptedPerGame: `${parseFloat(
      playerLastSeasonStats?.pointsTwoMadePerGame +
        playerLastSeasonStats?.pointsThreeMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerLastSeasonStats?.pointsTwoAttemptedPerGame +
        playerLastSeasonStats?.pointsThreeAttemptedPerGame
    ).toFixed(1)}`,
    fieldGoalsPercentage: parseFloat(
      playerLastSeasonStats?.fieldGoalsPercentage
    ).toFixed(1),
    freeThrowsMadeAttemptedPerGame: `${parseFloat(
      playerLastSeasonStats?.freeThrowsMadePerGame
    ).toFixed(1)}-${parseFloat(
      playerLastSeasonStats?.freeThrowsAttemptedPerGame
    ).toFixed(1)}`,
    freeThrowsPercentage: parseFloat(
      playerLastSeasonStats?.freeThrowsPercentage
    ).toFixed(1),
    reboundsOffensivePerGame: parseFloat(
      playerLastSeasonStats?.reboundsOffensivePerGame
    ).toFixed(1),
    reboundsDefensivePerGame: parseFloat(
      playerLastSeasonStats?.reboundsDefensivePerGame
    ).toFixed(1),
    reboundsPerGame: parseFloat(playerLastSeasonStats?.reboundsPerGame).toFixed(
      1
    ),
    assistsPerGame: parseFloat(playerLastSeasonStats?.assistsPerGame).toFixed(
      1
    ),
    turnoversPerGame: parseFloat(
      playerLastSeasonStats?.turnoversPerGame
    ).toFixed(1),
    stealsPerGame: parseFloat(playerLastSeasonStats?.stealsPerGame).toFixed(1),
    blocksPerGame: parseFloat(playerLastSeasonStats?.blocksPerGame).toFixed(1),
    foulsPersonalPerGame: parseFloat(
      playerLastSeasonStats?.foulsPersonalPerGame
    ).toFixed(1),
  };

  useEffect(() => {
    console.log("PLAYER NAME: ", playerName);
    console.table(playerCurrentSeasonStats);
  }, []);

  const [editableStat, setEditableStat] =
    useState<PlayerStatsObj>(playerCareerStatsObj);

  const handleStatChange = (field: string, value: string | number) => {
    setEditableStat({
      ...editableStat,
      [field]: value,
    });
  };
  return (
    <TableContainer
      sx={{ maxWidth: 780, border: 1, zIndex: 1000 }}
      component={Paper}
    >
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader_Start"
            ></TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              PTS
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              MINS
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              2PM/A
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              2P%
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              3PM/A
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              3P%
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              FGM/A
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              FG%
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              FTM/A
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              FT%
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              OR
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              DR
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              REB
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              AST
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              TO
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              STL
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              BLK
            </TableCell>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader"
              size="small"
            >
              PF
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playerCurrentSeasonStats ? (
            <TableRow>
              <TableCell
                sx={{ border: 1 }}
                className="PlayerCareerStatRowHeader_Start"
              >
                2024
              </TableCell>
              {Object.entries(playerCurrentSeasonStatsObj).map(
                ([key, stat], index) => (
                  <TableCell
                    sx={{ border: 1, background: "transparent", zIndex: 1000 }}
                    key={index}
                    className="PlayerStatCell"
                  >
                    <input
                      className="PlayerStatInput"
                      type="text"
                      defaultValue={stat}
                      onChange={(e) => {
                        handleStatChange(key, e.target.value);
                      }}
                    />
                  </TableCell>
                )
              )}
            </TableRow>
          ) : null}
          {playerLastFiveStats ? (
            <TableRow>
              <TableCell
                sx={{ border: 1 }}
                className="PlayerCareerStatRowHeader_Start"
              >
                Last 5
              </TableCell>
              {Object.entries(playerLastFiveStatsObj).map(
                ([key, stat], index) => (
                  <TableCell
                    sx={{ border: 1, background: "transparent", zIndex: 1000 }}
                    key={index}
                    className="PlayerStatCell"
                  >
                    <input
                      className="PlayerStatInput"
                      type="text"
                      defaultValue={stat}
                      onChange={(e) => {
                        handleStatChange(key, e.target.value);
                      }}
                    />
                  </TableCell>
                )
              )}
            </TableRow>
          ) : null}
          {playerLastSeasonStats ? (
            <TableRow>
              <TableCell
                sx={{ border: 1 }}
                className="PlayerCareerStatRowHeader_Start"
              >
                2023
              </TableCell>
              {Object.entries(playerLastSeasonStatsObj).map(
                ([key, stat], index) => (
                  <TableCell
                    sx={{ border: 1, background: "transparent", zIndex: 1000 }}
                    key={index}
                    className="PlayerStatCell"
                  >
                    <input
                      className="PlayerStatInput"
                      type="text"
                      defaultValue={stat}
                      onChange={(e) => {
                        handleStatChange(key, e.target.value);
                      }}
                    />
                  </TableCell>
                )
              )}
            </TableRow>
          ) : null}
          <TableRow>
            <TableCell
              sx={{ border: 1 }}
              className="PlayerCareerStatRowHeader_Start"
            >
              Career
            </TableCell>
            {Object.entries(playerCareerStatsObj).map(([key, stat], index) => (
              <TableCell
                sx={{ border: 1, background: "transparent", zIndex: 1000 }}
                key={index}
                className="PlayerStatCell"
              >
                <input
                  className="PlayerStatInput"
                  type="text"
                  defaultValue={stat}
                  onChange={(e) => {
                    handleStatChange(key, e.target.value);
                  }}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// = {
//   pointsPerGame: 0,
//   minutesPerGame: 0,
//   pointsTwoMadePerGame: 0,
//   pointsTwoAttemptedPerGame: 0,
//   pointsTwoPercentage: 0,
//   pointsThreeMadePerGame: 0,
//   pointsThreeAttemptedPerGame: 0,
//   pointsThreePercentage: 0,
//   fieldGoalsPercentage: 0,
//   freeThrowsMadePerGame: 0,
//   freeThrowsAttemptedPerGame: 0,
//   freeThrowsPercentage: 0,
//   reboundsOffensivePerGame: 0,
//   reboundsDefensivePerGame: 0,
//   reboundsPerGame: 0,
//   assistsPerGame: 0,
//   turnoversPerGame: 0,
//   stealsPerGame: 0,
//   blocksPerGame: 0,
//   foulsPersonalPerGame: 0,
// },
