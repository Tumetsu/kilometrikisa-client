import * as cheerio from 'cheerio';

interface DataValuePair {
  title: string;
  value: string;
}

export interface TeamDataItem {
  type: TeamDataType;
  unit: TeamDataUnits;
  value: number | undefined;
}

/**
 * Identifier for the each data type the parser will return.
 */
export enum TeamDataType {
  SMALL_SERIES_PLACEMENT = 'SMALL_SERIES_PLACEMENT',
  DISTANCE_PER_PERSON = 'DISTANCE_PER_PERSON',
  TOTAL_DISTANCE = 'TOTAL_DISTANCE',
  DAY_AVERAGE_PER_PERSON = 'DAY_AVERAGE_PER_PERSON',
  TOTAL_DAYS = 'TOTAL_DAYS',
  SAVED_GAS = 'SAVED_GAS',
  SAVED_CO2 = 'SAVED_CO2',
}

/**
 * Identifier for the each data unit the parser will return.
 */
export enum TeamDataUnits {
  KM = 'KM',
  KM_PER_PERSON = 'KM/PERSON',
  DAY_PER_PERSON = 'DAY/PERSON',
  LITER = 'LITER',
  KG = 'KG',
  NONE = 'NONE',
}

export class TeamPageParsingError extends Error {
  constructor() {
    super('Could not parse data from Kilometrikisa team page.');
  }
}

export function parseKilometrikisaTeamPageStatistics(htmlData: string): TeamDataItem[] {
  const $ = cheerio.load(htmlData);

  const dataItemElements = $('.team-contest-table .data-item');
  const dataValues: DataValuePair[] = dataItemElements
    .map((i, element) => {
      return extractDataFromElement($, element);
    })
    .get();

  if (!dataValues.length) {
    throw new TeamPageParsingError();
  }

  return dataValues.map(convertDataToTypedObjects);
}

/**
 * Map html element titles to enums. Note that these can break if Kilometrikisa edits
 * the html page and changes the labels!
 */
const stringTitlesToTeamDataType: Record<string, TeamDataType> = {
  'Piensarjan sijoitus': TeamDataType.SMALL_SERIES_PLACEMENT,
  'Joukkueen keskiarvo': TeamDataType.DISTANCE_PER_PERSON,
  'Kilometrit yhteensä': TeamDataType.TOTAL_DISTANCE,
  'Pyöräilypäivien keskiarvo': TeamDataType.DAY_AVERAGE_PER_PERSON,
  'Pyöräilypäivät yhteensä': TeamDataType.TOTAL_DAYS,
  'Bensaa säästetty': TeamDataType.SAVED_GAS,
  'CO2 säästetty': TeamDataType.SAVED_CO2,
};

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
    value: valueContent.trim(),
  };
}

/**
 * Map html element data units to enums. Note that these can break if Kilometrikisa edits
 * the html page and changes the unit labels!
 */
const stringUnitsToTeamDataUnits: Record<string, TeamDataUnits> = {
  'km': TeamDataUnits.KM,
  'km/hlö': TeamDataUnits.KM_PER_PERSON,
  'pv/hlö': TeamDataUnits.DAY_PER_PERSON,
  'litraa': TeamDataUnits.LITER,
  'kg': TeamDataUnits.KG,
};

function convertDataToTypedObjects(pair: DataValuePair): TeamDataItem {
  const [value, unit] = pair.value.split(' ');

  return {
    type: stringTitlesToTeamDataType[pair.title],
    unit: unit ? stringUnitsToTeamDataUnits[unit] : TeamDataUnits.NONE,
    value: value ? parseFloat(value) : undefined,
  };
}
