# Kilometrikisa client

A client library to scrape data from Kilometrikisa.fi website. Supports scraping team statistics as well
as team member data of user's team.

Inspired by the original implementation of [Strava2Kilometrikisa](https://github.com/jaamo/strava2kilometrikisa) and rewritten
completely with Typescript.

## Features

- Login to Kilometrikisa by username and password
- Scrape public team statistics from Kilometrikisa site
- Scrape team member statistics from Kilometrikisa site (requires Kilometrikisa credentials and being part of a scraped team)

## Development

To run production tests you'll need Kilometrikisa credentials. Then copy
.env.template to .env and fill in credentials:

```
cp .env.template .env

# Fill in kilometrikisa credentials to the .env file

# Run local tests
npm test

# Run tests against the kilometrikisa production (credentials required)
npm run test:production
```
