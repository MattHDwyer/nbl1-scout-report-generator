import { Box, Stack } from "@mui/material";
import React from "react";
import { DepthChartTable } from "./components/DepthChartTable/DepthChartTable";
import { KeysToTheGame } from "./components/KeysToTheGame/KeysToTheGame";
import { FreeThrowShotChart } from "./components/FreeThrowChart/FreeThrowChart";
import { DefensiveSchemes } from "./components/DefensiveSchemes/DefensiveSchemes";
import { Matchups } from "./components/Matchups/Matchups";

export const TeamDetails: React.FC<{
  teamId: string;
  players: any;
  showDepthChart: boolean;
  showMatchups: boolean;
  showDefensiveSchemes: boolean;
  showKeysToTheGame: boolean;
  showFreeThrowChart: boolean;
}> = ({
  teamId,
  players,
  showDepthChart,
  showMatchups,
  showDefensiveSchemes,
  showKeysToTheGame,
  showFreeThrowChart,
}) => {
  return (
    <Box sx={{ paddingTop: "12px" }}>
      <Stack>
        {showDepthChart && <DepthChartTable teamId={teamId} />}
        {showMatchups && <Matchups players={players} />}
        {showDefensiveSchemes && <DefensiveSchemes teamId={teamId} />}
        {showKeysToTheGame && <KeysToTheGame teamId={teamId} />}

        {/* {showFreeThrowChart && <FreeThrowShotChart players={players} />} */}
      </Stack>
    </Box>
  );
};
