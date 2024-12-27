import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ITeamGameDetails,
  updateTeamGameDetails,
} from "../../../../services/teams";

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
  const { register, handleSubmit, setValue } = useForm<ITeamGameDetails>({
    defaultValues: {
      teamId: teamId,
      gameDetails: gameDetails,
    },
  });
  const handleChangeGameDetails = (string: string) => {
    setValue("gameDetails", string);
    setGameDetails(string);
  };

  const submitHandler: SubmitHandler<ITeamGameDetails> = async (data) => {
    console.log(data);
    const res = await updateTeamGameDetails(data);
    console.log(res);
  };
  return (
    <Stack direction="row">
      <img
        src={teamLogoUrl}
        alt={teamName + " Logo"}
        style={{ width: "100px" }}
      />
      <Stack sx={{ width: "50vw" }}>
        <Typography variant="h2">{teamName}</Typography>
        <TextField
          {...register("gameDetails")}
          type="text"
          variant="standard"
          placeholder={"Date..."}
          value={gameDetails}
          onChange={(e) => {
            handleChangeGameDetails(e.target.value);
          }}
          onBlur={() => {
            localStorage.setItem(`${teamId}-header-details`, gameDetails);
            handleSubmit(submitHandler)();
          }}
          sx={{ width: "100%" }}
        />
      </Stack>
    </Stack>
  );
};
