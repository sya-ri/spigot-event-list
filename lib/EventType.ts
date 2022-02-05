import EventSourceType from "./EventSourceType";

/**
 * イベントデータの定義
 */
export default interface EventType {
  name: string;
  link: string;
  source: EventSourceType;
  description: string;
  deprecate?: boolean;
  deprecateDescription?: string;
}
