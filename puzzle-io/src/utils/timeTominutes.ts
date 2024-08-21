export const timeToMinutes = (time?: string | number): string => {
  if (!time) return '0:00';
  const innerTime = typeof time === 'string' ? parseInt(time) : time;
  if (isNaN(innerTime) || innerTime < 0) return '0:00';
  const minutes = Math.floor(innerTime / 60);
  const seconds = innerTime % 60;
  const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${secondsString}`;
};
