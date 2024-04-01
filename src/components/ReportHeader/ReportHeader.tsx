import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

interface ReportHeaderProps {
  teamName: string;
  teamLogoUrl: string;
  teamId: string;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({
  teamName,
  teamLogoUrl,
  teamId,
}) => {
  const storageGameDetails = localStorage.getItem(`${teamId}-header-details`);
  const [gameDetails, setGameDetails] = useState<string>(
    storageGameDetails ?? ""
  );
  const handleChangeGameDetails = (string: string) => {
    setGameDetails(string);
  };
  return (
    <Stack direction="row">
      <img
        src={teamLogoUrl}
        alt={teamName + " Logo"}
        style={{ width: "100px" }}
      />
      <Stack>
        <Typography variant="h2">{teamName}</Typography>
        <TextField
          type="text"
          variant="standard"
          placeholder={"Date..."}
          value={gameDetails}
          onChange={(e) => {
            handleChangeGameDetails(e.target.value);
          }}
          onBlur={() =>
            localStorage.setItem(`${teamId}-header-details`, gameDetails)
          }
        />
      </Stack>
    </Stack>
  );
};
