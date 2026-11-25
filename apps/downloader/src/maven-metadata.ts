import * as xml from "fast-typed-xml";
import { fetchText } from "./http.ts";

const versionList = xml.object({
  versioning: xml.object(
    "versioning",
    {
      versions: xml.object("versions", { values: xml.array("version", xml.string(), true) }, true),
    },
    true,
  ),
});

const snapshotMetadata = xml.object({
  versioning: xml.object("versioning", {
    snapshot: xml.object("snapshot", {
      timestamp: xml.string("timestamp", "element"),
      buildNumber: xml.string("buildNumber", "element"),
    }),
  }),
});

const project = xml.object({
  version: xml.string("version", "element", true),
  parent: xml.object("parent", { version: xml.string("version", "element", true) }, true),
});

export async function fetchMavenVersions(url: string, config?: RequestInit) {
  const metadata = versionList.parse(await fetchText(url, config));
  return metadata.versioning?.versions?.values?.map((version) => version.trim()) ?? [];
}

export async function fetchMavenSnapshot(url: string, config?: RequestInit) {
  const {
    versioning: { snapshot },
  } = snapshotMetadata.parse(await fetchText(url, config));
  return {
    snapshotVersion: snapshot.timestamp.trim() + "-" + snapshot.buildNumber.trim(),
    buildNumber: Number.parseInt(snapshot.buildNumber, 10),
  };
}

export async function fetchPomVersion(url: string) {
  const { version, parent } = project.parse(await fetchText(url));
  return (version ?? parent?.version ?? "").trim();
}
