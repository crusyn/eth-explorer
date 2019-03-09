export const formatEthValue = value => (value / 1000000000000000000).toFixed(4);

export const timeStampDateFormat = timeStamp => {
  return new Date(timeStamp * 1000).toLocaleDateString("en-US");
};

export const timeStampISO = timeStamp => {
  return timeStamp
    ? new Date(timeStamp * 1000).toISOString().split("T")[0]
    : "";
};

export const timeStampTimeFormat = timeStamp => {
  return new Date(timeStamp * 1000).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
};
