import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Talk, Workshop } from '@lib/types/all';

export function captureHourAndMinutesFromDateString(dateString: string) {
  const hourAndMinutesMatch = /T(\d\d:\d\d):/.exec(dateString);
  if (!hourAndMinutesMatch || !hourAndMinutesMatch[1]) {
    return '00:00';
  }

  return hourAndMinutesMatch[1];
}

export function convertTimeToDecimalHours(hourAndMinutesString: string): number {
  const [hourString, minuteString] = hourAndMinutesString.split(':');
  const hour = Number(hourString);
  const minutes = Number(minuteString) / 60;
  return hour + minutes;
}

export function isActivityStartingTimeBetween(
  activity: Talk | Workshop,
  startingTime: string,
  endingTime: string
): boolean {
  const startingHourAndMinute = captureHourAndMinutesFromDateString(activity.start);
  const decimalStartingHour = convertTimeToDecimalHours(startingHourAndMinute);
  return (
    decimalStartingHour >= convertTimeToDecimalHours(startingTime) &&
    decimalStartingHour < convertTimeToDecimalHours(endingTime)
  );
}

export function isActivityStartingOnDay(activity: Talk | Workshop, date: string): boolean {
  const startDate = formatDate(activity.start, 'dd/MM/yyyy');

  return startDate === date;
}

export function formatDate(date: string, formatType: string) {
  return format(parseISO(date), formatType, { locale: pt });
}
