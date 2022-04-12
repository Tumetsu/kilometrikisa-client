import * as cheerio from 'cheerio';
import { KilometrikisaError, KilometrikisaErrorCode } from '../../../utils/error-handling';

interface DataValuePair {
  title: string;
  valueAndUnit: string;
}

export enum TeamSeries {
  SMALL = 'small',
  LARGE = 'large',
  POWER = 'power',
  EBIKE = 'ebike',
}

export interface TeamStatistics {
  series: TeamSeries;
  seriesPlacement: number | null;
  distancePerPerson: number;
  totalDistance: number;
  daysPerPerson: number;
  totalDays: number;
  savedGas: number;
  savedCO2: number;
}

export function parseKilometrikisaTeamPageStatistics(htmlData: string): TeamStatistics {
  const $ = cheerio.load(htmlData);

  const dataItemElements = $('.team-contest-table .data-item');
  const dataValues: DataValuePair[] = dataItemElements
    .map((i, element) => {
      return extractDataFromElement($, element);
    })
    .get();

  if (!dataValues.length) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.COULD_NOT_PARSE_RESPONSE,
      'Could not parse data from Kilometrikisa team page.'
    );
  }

  return {
    series: convertDataToTeamSeries(dataValues[0]),
    ...convertDataToTypedObject(dataValues),
  };
}

/**
 * Extract string values from team page data elements. Format of the DOM element is following:
 * ```
 * <li class="data-item">
 *   <div class="data-title">Kilometrit yhteensä</div>
 *   0,0 km
 * </li>
 * ```
 * @param $
 * @param element
 */
function extractDataFromElement($: cheerio.CheerioAPI, element: cheerio.Element) {
  const titleContent = $(element).find('.data-title').text();
  let valueContent = $(element).find('strong').text(); // Sometimes values are inside strong tag
  if (!valueContent) {
    valueContent = $(element).children().remove().end().text();
  }

  return {
    title: titleContent.trim(),
    valueAndUnit: valueContent.trim(),
  };
}

/**
 * Map page titles to object keys we are going to return from the API. Note that the keys of this object
 * might change if Kilometrikisa website is modified.
 */
const stringTitlesToKeys: Record<string, string> = {
  'Piensarjan sijoitus': 'seriesPlacement',
  'Suursarjan sijoitus': 'seriesPlacement',
  'Tehosarjan sijoitus': 'seriesPlacement',
  'Sähkösarjan sijoitus': 'seriesPlacement',
  'Joukkueen keskiarvo': 'distancePerPerson',
  'Kilometrit yhteensä': 'totalDistance',
  'Pyöräilypäivien keskiarvo': 'daysPerPerson',
  'Pyöräilypäivät yhteensä': 'totalDays',
  'Bensaa säästetty': 'savedGas',
  'CO2 säästetty': 'savedCO2',
};

function convertDataToTypedObject(pairs: DataValuePair[]) {
  function extractValue(valueAndUnit: string) {
    const [value] = valueAndUnit.split(' ');
    const parsed = value ? parseFloat(value) : undefined;
    return !Number.isNaN(parsed) ? parsed : null;
  }

  const result: Record<string, number | undefined | null> = {};
  pairs.forEach(({ title, valueAndUnit }) => {
    const key = stringTitlesToKeys[title];
    result[key] = extractValue(valueAndUnit);
  });

  return result as unknown as Omit<TeamStatistics, 'series'>;
}

function convertDataToTeamSeries(pair: DataValuePair) {
  const map: Record<string, TeamSeries> = {
    'Piensarjan sijoitus': TeamSeries.SMALL,
    'Suursarjan sijoitus': TeamSeries.LARGE,
    'Tehosarjan sijoitus': TeamSeries.POWER,
    'Sähkösarjan sijoitus': TeamSeries.EBIKE,
  };

  return map[pair.title];
}
