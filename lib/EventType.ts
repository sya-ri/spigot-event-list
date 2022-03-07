import SourceType from "./SourceType";

/**
 * イベントデータの定義
 */
export default interface EventType {
  name: string;
  link: string;
  source: SourceType;
  href: string;
  javadoc?: string;
  abstract?: boolean;
  description: string;
  deprecate?: boolean;
  deprecateDescription?: string;
}
