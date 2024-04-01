import { Box, Stack } from "@mui/material";
import React from "react";
import { DepthChartTable } from "./components/DepthChartTable/DepthChartTable";
import { KeysToTheGame } from "./components/KeysToTheGame/KeysToTheGame";

export const TeamDetails: React.FC<{ teamId: string }> = ({ teamId }) => {
  return (
    <Box sx={{ paddingTop: "12px" }}>
      <Stack>
        <DepthChartTable teamId={teamId} />
        <KeysToTheGame teamId={teamId} />
      </Stack>
    </Box>
  );
};
