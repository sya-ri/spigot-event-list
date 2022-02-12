import Sources from "../Sources";
import { Versions } from "../json/versions";

/**
 * イベントソースのバージョンを更新する
 */
export const updateVersions = async (): Promise<Versions> => {
  const versions = {} as Versions;
  for (const [name, source] of Object.entries(Sources)) {
    await source.updateVersion(source);
    if (source.version != null) {
      versions[name] = source.version;
    } else {
      console.error(`${name} のバージョン取得に失敗しました`);
    }
  }
  return versions;
};
