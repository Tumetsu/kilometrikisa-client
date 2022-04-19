import { teamListResponseMock } from './team-list-response.mock';
import { parseContestTeamList } from './team-list-parser';

describe('team-list parser', () => {
  it('should return list of team data', () => {
    const { teams, pagination } = parseContestTeamList(teamListResponseMock());
    expect(teams.length).toBeGreaterThan(0);

    const first = teams[0];
    expect(first).toEqual({
      daysPerPerson: 143,
      distancePerPerson: 9822,
      memberCount: 5,
      name: 'Utajärven Pantterit',
      placement: 1,
      savedCO2: 8592,
      savedGas: 3437,
      teamUrl: 'https://www.kilometrikisa.fi/teams/utajarven-pantterit/',
      slug: 'utajarven-pantterit',
      totalDistance: 49111,
    });

    expect(pagination.currentPage).toEqual(1);
    expect(pagination.lastPage).toEqual(53);
  });
});
