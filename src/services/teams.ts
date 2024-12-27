import axios from "axios";

export const getAvailableTeamScouts = async () => {
  try {
    const res = await axios.request({
      url: `http://localhost:8080/team-roster/available-scouts`,
      method: "GET",
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getTeamScoutDetails = async (id: string) => {
  console.log(id);
  try {
    const res = await axios.request({
      url: `http://localhost:8080/team-roster/team/${id}`,
      method: "GET",
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export interface ITeamScoutDetails {
  teamId: string;
  scoutPublished: boolean;
  depthChart: Array<string>;
  matchups: Array<string>;
  defensiveSchemes: Array<string>;
  keysToTheGame: Array<string>;
  showDepthChart: boolean;
  showMatchups: boolean;
  showDefensiveSchemes: boolean;
  showKeysToTheGame: boolean;
}

export interface ITeamScoutConfigDetails {
  teamId: string;
  scoutPublished: boolean;
  showDepthChart: boolean;
  showMatchups: boolean;
  showDefensiveSchemes: boolean;
  showKeysToTheGame: boolean;
}

export const updateTeamScoutDetails = async (
  teamDetails: ITeamScoutDetails
) => {
  try {
    const res = await axios.request({
      method: "POST",
      url: "http://localhost:8080/team-roster/update-scout-details",
      data: {
        teamId: teamDetails.teamId,
        teamDetails: {
          scoutPublished: teamDetails.scoutPublished,
          depthChart: teamDetails.depthChart,
          matchups: teamDetails.matchups,
          defensiveSchemes: teamDetails.defensiveSchemes,
          keysToTheGame: teamDetails.keysToTheGame,
          showDepthChart: teamDetails.showDepthChart,
          showMatchups: teamDetails.showMatchups,
          showDefensiveSchemes: teamDetails.showDefensiveSchemes,
          showKeysToTheGame: teamDetails.showKeysToTheGame,
        },
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const updateTeamScoutConfigDetails = async (
  teamScoutConfigDetails: ITeamScoutConfigDetails
) => {
  try {
    const res = await axios.request({
      method: "POST",
      url: "http://localhost:8080/team-roster/update-scout-details",
      data: {
        teamId: teamScoutConfigDetails.teamId,
        teamDetails: {
          scoutPublished: teamScoutConfigDetails.scoutPublished,
          showDepthChart: teamScoutConfigDetails.showDepthChart,
          showMatchups: teamScoutConfigDetails.showMatchups,
          showDefensiveSchemes: teamScoutConfigDetails.showDefensiveSchemes,
          showKeysToTheGame: teamScoutConfigDetails.showKeysToTheGame,
        },
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export interface ITeamGameDetails {
  teamId: string;
  gameDetails: string;
}

export const updateTeamGameDetails = async (
  teamGameDetails: ITeamGameDetails
) => {
  try {
    const res = await axios.request({
      method: "POST",
      url: "http://localhost:8080/team-roster/update-scout-details",
      data: {
        teamId: teamGameDetails.teamId,
        teamDetails: {
          gameDetails: teamGameDetails.gameDetails,
        },
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
