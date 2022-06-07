import SourceName from "./SourceName";

/**
 * イベントデータの定義
 */
export default interface EventType {
  name: string;
  link: string;
  source: SourceName;
  href: string;
  javadoc?: string;
  abstract?: boolean;
  description: string;
  deprecate?: boolean;
  deprecateDescription?: string;
}
