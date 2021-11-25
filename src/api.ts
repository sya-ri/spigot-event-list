import axios from "axios";
import EventType from "./EventType";

/**
 * ベースとなるURL
 */
const url = "https://raw.githubusercontent.com/sya-ri/spigot-event-list/web";

/**
 * イベント一覧を取得する
 */
export const getEvents = () => axios.get<EventType[]>(`${url}/events.json`);
