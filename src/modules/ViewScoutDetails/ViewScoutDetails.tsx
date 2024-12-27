import React, { Suspense, useEffect, useState } from "react";
import { getTeamScoutDetails } from "../../services/teams";
import { Box, List, ListItem, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  PlayerSection,
  ReportHeader,
  TeamDetails,
} from "../CoachScoutBuilder/components";

export const ViewScoutDetails = () => {
  const [teamData, setTeamData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const { teamId } = useParams();

  useEffect(() => {
    if (!teamId) return;
    getTeamScoutDetails(teamId).then((res: any) => {
      setTeamData(res);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(teamData);
  }, [teamData]);
  if (loading) {
    return (
      <>
        <Typography variant="h1">🌀LOADING</Typography>
      </>
    );
  }

  if (!teamId) {
    return <>NO TEAM ID</>;
  }

  return (
    <>
      {teamData ? (
        <>
          <ReportHeader
            teamName={teamData.teamName}
            teamLogoUrl={teamData.logoUrl}
            teamId={teamId}
          />
          {teamData.players.map((player: any, index: number) => {
            return (
              <PlayerSection
                key={index}
                playerImage={player.playerImages}
                playerName={player.playerName}
                playerCareerStats={player.playerCareerStats}
                playerLastSeasonStats={player.playerPreviousSeasonStats}
                playerCurrentSeasonStats={player.playerCurrentSeasonStats}
                playerId={player.playerId}
                playerHidden={player.playerHidden}
              />
            );
          })}
          <TeamDetails
            showDepthChart={teamData.showDepthChart}
            showMatchups={teamData.showMatchups}
            showDefensiveSchemes={teamData.showDefensiveSchemes}
            showKeysToTheGame={teamData.showKeysToTheGame}
            showFreeThrowChart={teamData.showFreeThrowChart}
            teamId={teamId}
            players={teamData}
          />
        </>
      ) : (
        <Typography variant="h1">No scout details available</Typography>
      )}
    </>
  );
};
