import * as cheerio from 'cheerio';
import { CheerioAPI } from 'cheerio';
import { KilometrikisaError, KilometrikisaErrorCode } from '../../../utils/error-handling';

export interface TeamMemberDistanceStatistics {
  placement: number;
  name: string;
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

  return transformTableToObject(
    minuteHeadings,
    minuteRows
  ) as unknown as TeamMemberTimeStatistics[];
}

function getDistanceTableData($: CheerioAPI): TeamMemberDistanceStatistics[] {
  const distanceTable = getTableElement($, 'Kilometrikisa');

  const distanceHeadings = getTableHeadings($, distanceTable);
  const distanceRows = getTableRows($, distanceTable);

  return transformTableToObject(
    distanceHeadings,
    distanceRows
  ) as unknown as TeamMemberDistanceStatistics[];
}

function getTableElement($: cheerio.CheerioAPI, title: string) {
  return $('section [data-section-title]')
    .filter(function () {
      return $(this).text().trim().includes(title);
    })
    .next()
    .find('table');
}

const mapTableHeadingStringsToKeys: Record<string, string> = {
  '#': 'placement',
  'Nimi': 'name',
  'Sähköpostiosoite (?)': 'email',
  'Km yht.': 'totalDistance',
  'Km (lihas)': 'distanceByRegularBike',
  'Km (sähkö)': 'distanceByEbike',
  'Ajopäivät': 'totalCyclingDays',
  'Aika (tunnit ja minuutit)': 'time',
};

function getTableHeadings($: cheerio.CheerioAPI, table: cheerio.Cheerio<cheerio.Element>) {
  return table
    .find('th')
    .map(function () {
      return mapTableHeadingStringsToKeys[$(this).text()];
    })
    .get();
}

function getTableRows($: cheerio.CheerioAPI, table: cheerio.Cheerio<cheerio.Element>) {
  return table
    .find('tbody tr')
    .map(function () {
      return [getTableRow($, $(this))];
    })
    .get();
}

function getTableRow($: cheerio.CheerioAPI, row: cheerio.Cheerio<cheerio.Element>) {
  return row
    .find('td')
    .map(function () {
      // Remove child elements from each table cell and return only text
      // TODO: For captain users, parse and return email and real names of the competitors?
      return $(this).children().remove().end().text().trim();
    })
    .get();
}

function transformTableToObject(headings: string[], dataRows: string[][]) {
  function castToCorrectType(value: string) {
    if (value === '') {
      return null;
    }
    // First check if the value is a string which contains hours and minutes
    const time = parseTimeString(value);
    if (time) {
      return time;
    }

    // Then it is either number or a string
    const number = parseFloat(value);
    if (Number.isNaN(number)) {
      return value;
    }
    return number;
  }

  return dataRows.map(row => {
    const rowObj: Record<string, string | null | number | { hours: number; minutes: number }> = {};

    // TODO: Refactor dynamic object creation to be more type friendly to avoid force casting to the final interface
    headings.forEach((key, index) => {
      rowObj[key] = castToCorrectType(row[index]);
    });
    return rowObj;
  });
}

function parseTimeString(text: string) {
  if (!text.includes('min')) {
    return null; // Not a kilometrikisa timestring
  }

  const hours = parseInt(text.match(/(\d+) h/)?.[1] ?? '0', 10);
  const minutes = parseInt(text.match(/(\d+) min/)?.[1] ?? '0', 10);

  return {
    hours,
    minutes,
  };
}
