import * as cheerio from 'cheerio';
import { getTableHeadings, getTableRows, transformTableToObject } from '../common';

export interface Team {
  daysPerPerson: number;
  distancePerPerson: number;
  memberCount: number;
  name: string;
  placement: number;
  savedCO2: number;
  savedGas: number;
  teamUrl: string;
  totalDistance: number;
}

export function parseContestTeamList(htmlData: string) {
  const $ = cheerio.load(htmlData);
  const resultTable = $('.result-table');
  const teamHeadings = getTableHeadings($, resultTable);
  const teamRows = getTableRows($, resultTable);
  const result = transformTableToObject(teamHeadings, teamRows);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result.forEach((row: Record<string, any>) => {
    row.teamUrl = row.team.link.url;
    row.memberCount = parseInt(row.team.subItem.match(/(\d+)/)[0]);
    row.name = row.team.link.text;
    delete row['team'];
  });

  return result as unknown as Team[];
}
