import axios from "axios";

export const getTeamDetails = async () => {
  try {
    const response = await axios.request({
      url: "http://localhost:8080/teams",
      method: "GET",
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getTeamStats = async (teamId: string, teamName: string) => {
  try {
    const response = await axios.request({
      url: `http://localhost:8080/player-stats`,
      method: "GET",
      params: {
        teamid: teamId,
        xquarksrc: `web-nbl1-${teamName.toLowerCase().replace(/\s/g, "")}`,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
