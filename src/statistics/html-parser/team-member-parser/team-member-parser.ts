import * as cheerio from 'cheerio';
import { CheerioAPI } from 'cheerio';
import { KilometrikisaError, KilometrikisaErrorCode } from '../../../utils/error-handling';
import { getTableHeadings, getTableRows, transformTableToObject } from '../common';

export interface TeamMemberDistanceStatistics {
  placement: number;
  name: string;
  /**
   * Present only if the scraping user account is the captain of the team.
   */
  fullName?: string;
  /**
   * Present only if the scraping user account is the captain of the team.
   */
  email?: string | null;
  totalDistance: number;
  distanceByRegularBike: number;
  distanceByEbike: number;
  totalCyclingDays: number;
}

export interface TeamMemberTimeStatistics {
  placement: number;
  name: string;
  /**
   * Present only if the scraping user account is the captain of the team.
   */
  email?: string | null;
  time: {
    hours: number;
    minutes: number;
  };
  totalCyclingDays: number;
}

export function parseKilometrikisaTeamMemberStatistics(htmlData: string) {
  const $ = cheerio.load(htmlData);
  const distanceStatistics = getDistanceTableData($);
  const timeStatistics = getMinuteTableData($);

  if (!distanceStatistics.length && !timeStatistics.length) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.COULD_NOT_PARSE_RESPONSE,
      'Could not parse team member data from Kilometrikisa team page.'
    );
  }

  return {
    distanceStatistics,
    timeStatistics,
  };
}

function getMinuteTableData($: CheerioAPI): TeamMemberTimeStatistics[] {
  const minuteTable = getTableElement($, 'Minuuttikisa');

  const minuteHeadings = getTableHeadings($, minuteTable);
  const minuteRows = getTableRows($, minuteTable);

  const result = transformTableToObject(minuteHeadings, minuteRows);

  // Transform subitem structures to sensible format.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result.forEach((row: Record<string, any>) => {
    if (row.email) {
      row.email = row.email.subItem;
      row.fullName = row.name.subItem;
      row.name = row.name.value;
    }
  });

  return result as unknown as TeamMemberTimeStatistics[];
}

function getDistanceTableData($: CheerioAPI): TeamMemberDistanceStatistics[] {
  const distanceTable = getTableElement($, 'Kilometrikisa');

  const distanceHeadings = getTableHeadings($, distanceTable);
  const distanceRows = getTableRows($, distanceTable);

  const result = transformTableToObject(distanceHeadings, distanceRows);

  // Transform subitem structures to sensible format
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result.forEach((row: Record<string, any>) => {
    if (row.email) {
      row.email = row.email?.subItem;
      row.fullName = row.name?.subItem;
      row.name = row.name.value;
    }
  });

  return result as unknown as TeamMemberDistanceStatistics[];
}

function getTableElement($: cheerio.CheerioAPI, title: string) {
  return $('section [data-section-title]')
    .filter(function () {
      return $(this).text().trim().includes(title);
    })
    .next()
    .find('table');
}
