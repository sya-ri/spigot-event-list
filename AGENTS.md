# spigot-event-list

## Overview

- Web app: Next.js 16
- Downloader workspace: `packages/downloader`
- Historical Minecraft server data: `data/minecraft/{version}/events.json`
- Proxy latest-only data: `data/proxy/events.json`
- Latest merged data: `data/events.json`

## Environment

- Use `mise` for Node:
  - `mise exec node@24 -- npm install`
- Root scripts:
  - `mise exec node@24 -- npm run dev`
  - `mise exec node@24 -- npm run build`
  - `mise exec node@24 -- npm run lint`
- Downloader:
  - `mise exec node@24 -- npm --workspace packages/downloader run start --`

## Downloader Usage

- Latest snapshot only:
  - `mise exec node@24 -- npm --workspace packages/downloader run start --`
- All complete Minecraft versions:
  - `mise exec node@24 -- npm --workspace packages/downloader run start -- --all`
- Selected Minecraft versions:
  - `mise exec node@24 -- npm --workspace packages/downloader run start -- --version 1.21.11`
  - `mise exec node@24 -- npm --workspace packages/downloader run start -- --version 1.20.6 --version 1.21.11`

Behavior:

- No flags:
  - Updates latest server snapshot into `data/events.json` and `data/versions.json`
  - Updates latest proxy snapshot into `data/proxy/events.json` and `data/proxy/versions.json`
- `--all`:
  - Downloads historical complete server versions into `data/minecraft/{version}/...`
  - Does not create proxy history
- `--version`:
  - Downloads only the specified Minecraft versions

## Description Editing

- `events.json` is the source of truth for manual description edits.
- Do not add new hard-coded description override tables for normal editing.
- If a description needs correction, edit the corresponding `data/**/*.json` file directly.
- The downloader reuses existing descriptions from `data/**/*.json` before falling back to Javadoc.
- Default deprecation notes are auto-filled only for:
  - `@Experimental`
  - `@Beta`

Recommended editing targets:

- Latest merged event: `data/events.json`
- Latest proxy event: `data/proxy/events.json`
- Historical server event: `data/minecraft/{version}/events.json`

## Dependency Updates

- Check root updates:
  - `mise exec node@24 -- npx -y npm-check-updates`
- Apply root updates:
  - `mise exec node@24 -- npx -y npm-check-updates -u`
  - `mise exec node@24 -- npm install`
- Check downloader updates:
  - `cd packages/downloader && mise exec node@24 -- npx -y npm-check-updates`

Notes:

- `packages/downloader` currently has no newer direct dependencies as of 2026-05-03.
- `eslint` 10 is listed by `ncu` but is currently not usable with `eslint-config-next 16.2.4` in this repo.
- `@serwist/next` is in use instead of `next-pwa`.

## Formatting

- After generating or editing files, run formatting before commit.
- Root:
  - `mise exec node@24 -- npm run format`
- If you only need lint autofix without full formatting:
  - `mise exec node@24 -- npm run lint -- --fix`

## Verification

Minimum verification after code or data changes:

- TypeScript:
  - `mise exec node@24 -- ./node_modules/.bin/tsc -p tsconfig.json --noEmit`
  - `mise exec node@24 -- ./node_modules/.bin/tsc -p packages/downloader/tsconfig.json --noEmit`
- Lint:
  - `mise exec node@24 -- npm run lint`

Current known lint warnings:

- `src/components/ko-fi-button.tsx` uses `<img>` and triggers `@next/next/no-img-element`

Build notes:

- Use `mise exec node@24 -- npm run build`
- The project currently uses `next build --webpack` because `@serwist/next` is webpack-based and not Turbopack-compatible.
- In restricted environments, build may fail on Google Fonts fetch for `M PLUS 1p`.
