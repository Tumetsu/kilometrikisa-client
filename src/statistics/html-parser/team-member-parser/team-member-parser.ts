import * as cheerio from 'cheerio';
import { CheerioAPI } from 'cheerio';

export interface TeamMemberStatistics {
  placement: number;
  name: string;
  email: string;
  totalDistance: number;
  distanceByRegularBike: number;
  distanceByEbike: number;
  totalCyclingDays: number;
}

export function parseKilometrikisaTeamMemberStatistics(htmlData: string) {
  const $ = cheerio.load(htmlData);
  const distanceTableData = getDistanceTableData($);
  return distanceTableData;
}

function getDistanceTableData($: CheerioAPI): TeamMemberStatistics[] {
  const distanceTable = getTableElement($, 'Kilometrikisa');

  const distanceHeadings = getTableHeadings($, distanceTable);
  const distanceRows = getTableRows($, distanceTable);

  return transformTableToObject(distanceHeadings, distanceRows);
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

function transformTableToObject(headings: string[], dataRows: string[][]): TeamMemberStatistics[] {
  function castToCorrectType(value: string) {
    const number = parseFloat(value);
    if (Number.isNaN(number)) {
      return value;
    }
    return number;
  }

  return dataRows.map(row => {
    const rowObj: Record<string, string | number> = {};

    // TODO: Refactor dynamic object creation to be more type friendly to avoid force casting to the final interface
    headings.forEach((key, index) => {
      rowObj[key] = castToCorrectType(row[index]);
    });
    return rowObj as unknown as TeamMemberStatistics;
  });
}
