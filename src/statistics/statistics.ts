import axios from 'axios';
import { SessionCredentials } from '../auth/auth';
import {
  parseKilometrikisaTeamPageStatistics,
  TeamSeries,
} from './html-parser/team-parser/team-parser';
import { parseKilometrikisaTeamMemberStatistics } from './html-parser/team-member-parser/team-member-parser';
import { KilometrikisaError, KilometrikisaErrorCode } from '../utils/error-handling';
import { axiosAuthGuard, getAuthConfig } from '../utils/requests';
import { CONTEST_BASE_URL, TEAM_PAGE_URL } from '../utils/urls';
import { parseContestTeamList } from './html-parser/team-list-parser/team-list-parser';

/**
 * Fetch team statistics from Kilometrikisa. Does not need authentication. Returns all statistic tables
 * as separate data-objects. One team page might contain two statistic tables. One for regular cycling and one for
 * electric bikes.
 *
 * @param teamSlug  The name of the team in "slugified" format. You can pick the value from team page url on the kilometrikisa website.
 */
export async function getTeamStatistics(teamSlug: string) {
  try {
    const teamStatisticsPageResponse = await axios.get(TEAM_PAGE_URL + teamSlug);
    return parseKilometrikisaTeamPageStatistics(teamStatisticsPageResponse.data);
  } catch (err) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.TEAM_STATISTICS_NOT_FOUND,
      `Team ${teamSlug} could not be found.`
    );
  }
}

/**
 * Fetch statistics of team members belonging to some kilometrikisa team
 * @param teamSlug  The name of the team in "slugified" format. You can pick the value from team page url on the kilometrikisa website.
 * @param contestSlug The name of the contest in "slugified" format. You can pick the value from team page url on the kilometrikisa website when logged in.
 * @param credentials
 */
export async function getTeamMemberStatistics(
  teamSlug: string,
  contestSlug: string,
  credentials: SessionCredentials
) {
  const url = `${TEAM_PAGE_URL}${teamSlug}/${contestSlug}/`;
  try {
    const teamMemberStatisticsPage = await axiosAuthGuard(
      axios.get(url, getAuthConfig(url, credentials))
    );
    return parseKilometrikisaTeamMemberStatistics(teamMemberStatisticsPage.data);
  } catch (err) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.TEAM_STATISTICS_NOT_FOUND,
      `Team ${teamSlug} for given contest ${contestSlug} could not be found.`
    );
  }
}

/*
 * Sorting options supported to sort the results by in team lists.
 */
export enum TeamListSortCriteria {
  PLACEMENT = 'rank',
  NAME = 'name',
  DISTANCE_PER_PERSON = 'km-avg-person',
  TOTAL_DISTANCE = 'km-total',
  TOTAL_DAYS = 'active-days',
  KETJUREAKTIO = 'ketjureaktio',
}

export interface TeamSortOptions {
  /**
   * Sorting criteria used when teams are requested.
   */
  criteria: TeamListSortCriteria;
  /**
   * Order of the results when sorting is requested.
   */
  order: 'asc' | 'desc';
}

/**
 * Get list of teams with their contest results. Supports rudimentary sorting options.
 *
 * @param contestSlug Slug of the contest. E.g. "kilometrikisa-2021"
 * @param series Contest series. Small, large etc. null value returns all teams regardless of the series.
 * @param sortOptions Which criteria to use for sorting.
 */
export async function getTeams(
  contestSlug: string,
  series?: TeamSeries | null | undefined,
  sortOptions?: TeamSortOptions
) {
  const url = `${CONTEST_BASE_URL}${contestSlug}/teams/${series ?? ''}`;
  const params: Record<string, string> = {};

  if (sortOptions) {
    params.sort = sortOptions.criteria;
    params.order = sortOptions.order;
  }

  const response = await axios.get(url, {
    params,
  });

  return parseContestTeamList(response.data);
}
