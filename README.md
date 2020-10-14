# zdkb

Backup your Zendesk Knowledge Base articles to an AWS S3 bucket.

## Install

```sh
$ npm install -g zdkb
```

## Usage

Make sure to set the environment variables required for both AWS
and Zendesk integrations as documented in [`.env.example`](https://github.com/Risk3sixty-Labs/zdkb/blob/master/.env.sample)
are populated in your current terminal session. Without these populated,
the backup utility will not be able to authenticate and make
API requests to backup your articles.

```sh
$ zdkb
```
