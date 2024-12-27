import axios from "axios";

export interface IPlayerDetails {
  playerPosition: string;
  playerNumber: string;
  playerHeight: string;
  playerHowToGuard: string;
  playerSummaryTitle: string;
  playerSummary: string;
}

export const postPlayerDetails = async (
  playerId: string,
  playerDetails: IPlayerDetails
) => {
  try {
    const res = await axios.request({
      url: "http://localhost:8080/update-player",
      method: "POST",
      data: {
        playerId,
        playerDetails,
      },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};
