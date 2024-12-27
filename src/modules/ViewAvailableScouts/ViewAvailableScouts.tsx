import React, { Suspense, useEffect } from "react";
import { getAvailableTeamScouts } from "../../services/teams";
import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RouteType } from "../../routes";

export const ViewAvailableScouts = () => {
  const [teams, setTeams] = React.useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAvailableTeamScouts().then((res: any) => {
      console.log(res);
      setTeams(res.data);
    });
  }, []);

  const handleClick = (id: string) => {
    navigate("/player/" + id);
  };

  return (
    <List>
      <Suspense
        fallback={
          <>
            <Typography variant="h1">🌀LOADING</Typography>
          </>
        }
      >
        {teams
          ? teams.map((team) => {
              return (
                <ListItem>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => handleClick(team._id)}
                  >
                    <Stack direction="row">
                      <img
                        src={team.logoUrl}
                        alt={team.teamName + " Logo"}
                        style={{ width: "100px" }}
                      />
                      <h3>{team.teamName}</h3>
                    </Stack>
                  </Box>
                </ListItem>
              );
            })
          : "No scouts available"}
      </Suspense>
    </List>
  );
};
