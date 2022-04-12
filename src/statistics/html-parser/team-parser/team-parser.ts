import * as cheerio from 'cheerio';
import { KilometrikisaError, KilometrikisaErrorCode } from '../../../utils/error-handling';

interface DataValuePair {
  title: string;
  valueAndUnit: string;
}

export interface TeamStatistics {
  seriesPlacement: number | undefined;
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

  return convertDataToTypedObject(dataValues);
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
  const valueContent = $(element).children().remove().end().text();

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
  'Joukkueen keskiarvo': 'distancePerPerson',
  'Kilometrit yhteensä': 'totalDistance',
  'Pyöräilypäivien keskiarvo': 'daysPerPerson',
  'Pyöräilypäivät yhteensä': 'totalDays',
  'Bensaa säästetty': 'savedGas',
  'CO2 säästetty': 'savedCO2',
};

function convertDataToTypedObject(pairs: DataValuePair[]): TeamStatistics {
  function extractValue(valueAndUnit: string) {
    const [value] = valueAndUnit.split(' ');
    return value ? parseFloat(value) : undefined;
  }

  const result: Record<string, number | undefined> = {};
  pairs.forEach(({ title, valueAndUnit }) => {
    const key = stringTitlesToKeys[title];
    result[key] = extractValue(valueAndUnit);
  });

  return result as unknown as TeamStatistics;
}
