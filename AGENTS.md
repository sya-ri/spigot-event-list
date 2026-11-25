# spigot-event-list

## Overview

- Web app: Astro with React in `apps/web`
- HTTP API and Cloudflare Worker: `apps/api`
- Shared event model, search, and snapshot reader: `packages/catalog`
- Downloader workspace: `apps/downloader`
- Historical Minecraft server data: `data/minecraft/{version}/events.json`
- Proxy latest-only data: `data/proxy/events.json`
- Latest merged data: `data/events.json`

## Environment

Install the tools in `mise.toml`, then run `pnpm install --frozen-lockfile` at the repository root.
Use `pnpm dev` for the web and API, `pnpm build` to build both applications, and `pnpm preview` to run the Worker locally.

## Downloader Usage

- Latest snapshot and complete version retention:
  - `pnpm --filter @spigot-event-list/downloader run start`
- All complete Minecraft versions:
  - `pnpm --filter @spigot-event-list/downloader run start --all`
- Selected Minecraft versions:
  - `pnpm --filter @spigot-event-list/downloader run start --version 1.21.11`
  - `pnpm --filter @spigot-event-list/downloader run start --version 1.20.6 --version 1.21.11`

Behavior:

- No flags:
  - Updates latest server snapshot into `data/events.json` and `data/versions.json`
  - Saves the server snapshot into `data/minecraft/{version}/...` when Paper, Spigot, and Purpur agree on the Minecraft version; mixed snapshots are not saved as a fixed version
  - Updates latest proxy snapshot into `data/proxy/events.json` and `data/proxy/versions.json`
- `--all`:
  - Downloads historical complete server versions into `data/minecraft/{version}/...`
  - Does not create proxy history
- `--version`:
  - Downloads only the specified Minecraft versions

Reference links prefer official Javadoc only when its public title confirms the exact source and Minecraft version; otherwise they use the versioned mirror. Spigot/Purpur official URLs follow latest. When they advance, refresh the preceding snapshot and publish its mirror. Generation does not deploy mirrors or continuously verify stored links.

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

## Checks

Run `pnpm format` after editing source code. Before submitting a PR, run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.
Update dependencies in the workspace that imports them and commit the root `pnpm-lock.yaml`.
