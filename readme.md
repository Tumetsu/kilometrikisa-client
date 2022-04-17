# Kilometrikisa client

[![npm version](https://badge.fury.io/js/kilometrikisa-client.svg)](https://badge.fury.io/js/kilometrikisa-client)


A client library to scrape data from Kilometrikisa.fi website and post data to user's contest logs. Supports scraping team statistics as well
as team member data of user's team. Inspired by the original implementation of [Strava2Kilometrikisa](https://github.com/jaamo/strava2kilometrikisa).

[API Reference](https://github.com/Tumetsu/kilometrikisa-client/wiki/Exports)


## Features

- Login to Kilometrikisa by username and password
- Scrape info about contests (id, name, dates etc.). Either latest contest or by contest page url
- Scrape public team statistics from Kilometrikisa site
- Scrape team member statistics from Kilometrikisa site (requires Kilometrikisa credentials and being part of the scraped team)
- Update/add distance and time entries for logged in user

## Installation

```
npm install kilometrikisa-client --save
```

## Usage

A quick example of usage for updating contest log of the user for the latest contest:

```
import { getTeamStatistics, kilometrikisaSession } from 'kilometrikisa-client';

// Log in to get session
const session = await kilometrikisaSession({username: 'username', password: 'password'});

// Fetch latest contest
const contest = await getLatestContest();

// Fetch member statistics of your team
const memberData = await session.getTeamMemberStatistics('team-slug', contest.slug);

// Update user's contest log for latest contest
await client.updateContestLog(contest.contestId, '2022-05-01', 10);

// Fetch public team statistics for current contest
const teamData = await getTeamStatistics('team-slug');
```

Team and contest slugs can be found from the kilometrikisa.fi site urls. For example
team slug can be found from public team page's url: `https://www.kilometrikisa.fi/teams/<this-is-team-slug>/`
Contest slug can be found from the team page url when logged in. Usually it is in form of `kilometrikisa-2022` etc.
For more check [API Reference](https://github.com/Tumetsu/kilometrikisa-client/wiki/Exports)


## Development

To run production tests you'll need Kilometrikisa credentials. Copy
.env.template to .env and fill in credentials:

```
# Run local tests
npm test

cp .env.template .env
# Fill in kilometrikisa credentials to the .env file
# Run tests against the kilometrikisa production (credentials required)
npm run test:production
```

## How to release

1. Bump up the package version with `npm version major|minor|patch` and push the commit to main
2. Create Github release
3. Let Github Actions to deploy the release automatically to the NPM.

## Contributing

- Please open an issue about the bug, feature request etc. first to open a discussion
- For bug reports, be specific about the issue and provide steps to reproduce the bug if possible

### Code quality

- Add tests for the new feature or bug fix if possible
- Make sure test suite and linter pass

### Pull requests and commits

If possible pull requests should conform the following guidelines:

- Use rebase work flow. Do not merge `main` branch to your feature branch. Use `git rebase main` instead
- Commit names should be descriptive and in imperative format. E.g. "Add support for X"
