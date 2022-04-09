# Kilometrikisa client

A simple client package to post data to the Kilometrikisa.fi.
Split from and refactored to be a client library from the original implementation of [Strava2Kilometrikisa](https://github.com/jaamo/strava2kilometrikisa)

## Features

- Login to Kilometrikisa by username and password
- Scrape team statistics from Kilometrikisa site
- Scrape team member statistics from Kilometrikisa site (requires Kilometrikisa credentials and being part of a scraped team)

## Development

To run tests you'll need Kilometrikisa credentials. Then copy
.env.template to .env and fill in credentials:

```
cp .env.template .env

# Fill in kilometrikisa credentials to the .env file

# Run tests
npm test
```
