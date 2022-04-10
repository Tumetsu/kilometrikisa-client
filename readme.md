# Kilometrikisa client

A client library to scrape data from Kilometrikisa.fi website. Supports scraping team statistics as well
as team member data of user's team.

Inspired by the original implementation of [Strava2Kilometrikisa](https://github.com/jaamo/strava2kilometrikisa) and rewritten
completely with Typescript.

## Features

- Login to Kilometrikisa by username and password
- Scrape public team statistics from Kilometrikisa site
- Scrape team member statistics from Kilometrikisa site (requires Kilometrikisa credentials and being part of the scraped team)

## Installation

```
npm install kilometrikisa-client --save
```

## Usage

A quick example of usage:

```
import { login, getTeamStatistics, getTeamMemberStatistics } from 'kilometrikisa-client';

// Log in to get credentials
const credentials = await login('username', 'password');

// Fetch member statistics of your team
const memberData = await getTeamMemberStatistics('team-slug', 'competition-slug', credentials);

// Fetch public team statistics for current competition
const teamData = await getTeamStatistics('team-slug');
```

Team and competition slugs can be found from the kilometrikisa.fi site urls. For example
team slug can be found from public team page's url: `https://www.kilometrikisa.fi/teams/<this-is-team-slug>/`
Competition slug can be found from the team page url when logged in. Usually it is in form of `kilometrikisa-2022` etc.

## Development

To run production tests you'll need Kilometrikisa credentials. Then copy
.env.template to .env and fill in credentials:

```
# Run local tests
npm test

cp .env.template .env
# Fill in kilometrikisa credentials to the .env file
# Run tests against the kilometrikisa production (credentials required)
npm run test:production
```

## Contributing

- Please open an issue about the bug, feature request etc. first to open a discussion
- For bug reports, be specific about the issue and provide steps to reproduce the bug if possible

### Code quality

- Add tests for the new feature or bug fix if possible
- Make sure test suite and linter pass

### Pull requests and commits

The pull requests should conform the following guidelines if possible:

- Use rebase work flow. Do not merge `main` branch to your feature branch. Use `git rebase main` instead
- Commit names should be descriptive and in imperative format. E.g. "Add support for X"
- Before merge clean possible fixup commits by squashing

However, if any of those rules seem confusing, don't let that stop you from contributing and opening a PR!
