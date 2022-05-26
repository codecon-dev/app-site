/* eslint-disable @typescript-eslint/no-unsafe-return */
import mysql, { ServerlessMysql } from 'serverless-mysql';

export const db: ServerlessMysql = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    charset: 'utf8mb4'
  }
});

export async function query(q: string, values: (string | number)[] | string | number = []) {
  try {
    const results: any = await db.query(q, values);
    await db.end();
    return results;
  } catch (e) {
    throw Error('Erro');
  }
}

function twoDigits(d: number) {
  if (0 <= d && d < 10) return `0${d}`;
  if (-10 < d && d < 0) return `-0${-1 * d}`;
  return `${d}`;
}

export function todayMysqlFormat() {
  const date = new Date();
  const timezoneOffset = 180;

  const dateBrazil = new Date(date.valueOf() - timezoneOffset * 60000);

  return `${dateBrazil.getUTCFullYear()}-${twoDigits(1 + dateBrazil.getUTCMonth())}-${twoDigits(
    dateBrazil.getUTCDate()
  )} ${twoDigits(dateBrazil.getUTCHours())}:${twoDigits(dateBrazil.getUTCMinutes())}:${twoDigits(
    dateBrazil.getUTCSeconds()
  )}`;
}
