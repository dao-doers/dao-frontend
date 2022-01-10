import { format, utcToZonedTime } from 'date-fns-tz';

export const secondsToHours = (value: number) => {
  let secNum = value;

  const hours = Math.floor(secNum / 3600);
  secNum -= hours * 3600;

  const minutes = Math.floor(secNum / 60) % 60;
  secNum -= minutes * 60;

  const seconds = secNum % 60;

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
};

export const dateToUnixTime = (time: string) => {
  return new Date(time).getTime();
};

export const formatSeconds = (time: string) => {
  if (!time) return null;

  const date = new Date(Number(time) * 1000 - new Date().getTimezoneOffset() * 60000);
  const timeZone = 'Europe/Berlin';
  const zonedDate = utcToZonedTime(date, timeZone);
  const pattern = 'dd/MM/yyyy hh:mm aa (z)';
  return format(zonedDate, pattern, { timeZone });
};
