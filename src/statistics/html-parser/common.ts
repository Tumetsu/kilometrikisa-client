import * as cheerio from 'cheerio';
import { KILOMETRIKISA_BASE_URL } from '../../utils/urls';
import { CheerioAPI } from 'cheerio';

const mapTableHeadingStringsToKeys: Record<string, string> = {
  '#': 'placement',
  'Nimi': 'name',
  'Sähköpostiosoite (?)': 'email',
  'Km yht.': 'totalDistance',
  'Km (lihas)': 'distanceByRegularBike',
  'Km (sähkö)': 'distanceByEbike',
  'Ajopäivät': 'totalCyclingDays',
  'Aika (tunnit ja minuutit)': 'time',

  // Table headings in team listings
  'Sija': 'placement',
  'Joukkue': 'team',
  'Km/hlö': 'distancePerPerson',
  'Pyöräilypäivät/hlö': 'daysPerPerson',
  'Bensaa (l) säästö': 'savedGas',
  'Co2 (kg) säästö': 'savedCO2',
};

/**
 * Parse table heading rows and return them mapped to a defined set of strings
 * to be used as object keys in resulting objects of parsing.
 * @param $
 * @param table
 */
export function getTableHeadings($: cheerio.CheerioAPI, table: cheerio.Cheerio<cheerio.Element>) {
  return table
    .find('th')
    .map(function () {
      return mapTableHeadingStringsToKeys[$(this).text().trim()];
    })
    .get();
}

export function getTableRows($: cheerio.CheerioAPI, table: cheerio.Cheerio<cheerio.Element>) {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let content: Record<string, any> | null = null;
      if ($(this).children().length) {
        content = {};
        // Parse possible links
        const linkTag = $(this).find('a');
        if (linkTag.text().trim()) {
          content.link = {
            url: `${KILOMETRIKISA_BASE_URL}${linkTag.prop('href')}`,
            text: linkTag.text().trim(),
          };
        }

        // Parse possible subitem
        const subItem = $(this).find('span');
        if (subItem.text().trim()) {
          // Some times the structure might contain some nested spans etc. Usually we are
          // only interested in the innermost element's contents
          content.subItem = $(getLeaves($, subItem.get()[0])).text().trim();
        }
      }

      const textContent = $(this).children().remove().end().text().trim();

      return content ? { ...content, value: textContent } : textContent;
    })
    .get();
}

/**
 * Get the "deepest" elements inside the given element. In other words, get leaves of the
 * html structure.
 * @param $
 * @param parent
 * @param result
 */
function getLeaves($: CheerioAPI, parent: cheerio.Element, result: cheerio.Element[] = []) {
  const children = $(parent).children();
  if (children.length > 0) {
    children.each((i, elem) => {
      getLeaves($, elem, result);
    });
  } else {
    result.push(parent);
  }
  return result;
}

export function transformTableToObject(
  headings: string[],
  dataRows: (string | Record<string, string>)[][]
) {
  function castToCorrectType(value: string | Record<string, string>) {
    // TODO: parse object...
    if (typeof value === 'object') {
      return value;
    }
    if (value === '') {
      return null;
    }
    // First check if the value is a string which contains hours and minutes
    const time = parseTimeString(value);
    if (time) {
      return time;
    }

    // Then it is either number or a string
    const number = parseFloatString(value);
    if (Number.isNaN(number)) {
      return value;
    }
    return number;
  }

  return dataRows.map(row => {
    const rowObj: Record<
      string,
      string | null | number | { hours: number; minutes: number } | Record<string, string>
    > = {};

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

export function parseFloatString(text: string): number {
  // In Finnish locale, decimal separator is the comma
  return parseFloat(text.replace(',', '.'));
}
