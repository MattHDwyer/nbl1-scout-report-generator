import { Duration } from "luxon";

export const convertTime = (time: string) => {
  // Parse the duration string
  const duration = Duration.fromISO(time);

  // Convert duration to hours, minutes, and seconds
  const minutes = Math.floor(duration.as("minutes")) % 60;
  const seconds = Math.floor(duration.as("seconds")) % 60;

  if (Number.isNaN(minutes) || Number.isNaN(seconds)) {
    return "0";
  }

  // Format the time
  const formattedTime = `${minutes.toString()}:${seconds
    .toString()
    .padStart(2, "0")}`;
  return formattedTime;
};
