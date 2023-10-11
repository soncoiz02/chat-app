import { format } from "date-fns";

export const formatToTime = (time: Date) => {
  return format(time, "HH:mm a");
};
