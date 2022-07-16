import events from './events.json'
import versions from './versions.json'
import { EventType } from "spigot-event-list-common";

export type Versions = { [name: string]: string }

export function getEvents() {
  return events as EventType[]
}

export function getVersions() {
  return versions as Versions
}
