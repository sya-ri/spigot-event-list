import EventSource from "../EventSource.js";

/**
 * イベントソースのバージョンを更新する
 */
export const updateVersions = async (sources: {
  [name: string]: EventSource;
}): Promise<{ [name: string]: string }> => {
  const versions: { [name: string]: string } = {};
  for (const [name, source] of Object.entries(sources)) {
    await source.updateVersion(source);
    if (source.version != null) {
      versions[name] = source.version;
    } else {
      console.error(`${name} のバージョン取得に失敗しました`);
    }
  }
  return versions;
};
