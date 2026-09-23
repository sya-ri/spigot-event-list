<h1 align="center">
  <a href="https://spigot-event-list.s7a.dev">
    <img src="public/logo.png" alt="spigot-event-list"/>
  </a>
</h1>

<p align="center">
  <a href="https://www.spigotmc.org">
    <img alt="Spigot" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fsya-ri%2Fspigot-event-list%2Fraw%2Fmaster%2Fdata%2Fversions.json&query=Spigot&label=Spigot&color=orange" />
  </a>
  <a href="https://papermc.io/downloads/paper">
    <img alt="Paper" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fsya-ri%2Fspigot-event-list%2Fraw%2Fmaster%2Fdata%2Fversions.json&query=Paper&label=Paper&color=lightgray" />
  </a>
  <a href="https://purpurmc.org">
    <img alt="Purpur" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fsya-ri%2Fspigot-event-list%2Fraw%2Fmaster%2Fdata%2Fversions.json&query=Purpur&label=Purpur&color=blueviolet" />
  </a>
  <a href="https://www.spigotmc.org/wiki/bungeecord">
    <img alt="BungeeCord" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fsya-ri%2Fspigot-event-list%2Fraw%2Fmaster%2Fdata%2Fversions.json&query=Bungee&label=Bungee&color=yellow" />
  </a>
  <a href="https://papermc.io/downloads/velocity">
    <img alt="Velocity" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fsya-ri%2Fspigot-event-list%2Fraw%2Fmaster%2Fdata%2Fversions.json&query=Velocity&label=Velocity&color=lightgreen" />
  </a>
</p>

<br />
<br />

Search Minecraft plugin events by name, Japanese or English description, and related keywords.
The index covers Bukkit/Spigot, Paper, Purpur, BungeeCord, and Velocity, with platform and Minecraft version filters.

## Find an event

Open [spigot-event-list](https://spigot-event-list.s7a.dev), enter an event name or search phrase, and select your platform and target version.
Inspect the linked Javadoc for the event's contract. Indexed data reflects the selected version; proxy events are latest-only.

## Documentation

- [Search API reference](skills/spigot-event-search/references/api.md): parameters, examples, pagination, and bilingual responses.
- [Development and event descriptions](docs/development.md): run locally, choose datasets, and contribute translations or keywords.
- [Description review coverage](docs/event-description-audit.md): recorded review scope and evidence sources.

## AI Skill

The [spigot-event-search skill](skills/spigot-event-search/SKILL.md) lets AI agents query the search API. Install it with either command:

```sh
gh skill install sya-ri/spigot-event-list skills/spigot-event-search
# Alternative:
npx -y skills add sya-ri/spigot-event-list --skill spigot-event-search
```
