import { Readable } from "stream";

const ensureOk = (response: Response, url: string) => {
  if (!response.ok) {
    throw new Error(`Unable to fetch ${url}. Status ${response.status}`);
  }
  return response;
};

export const fetchText = async (url: string, init?: RequestInit) => {
  const response = ensureOk(await fetch(url, init), url);
  return response.text();
};

export const fetchJson = async <T>(url: string, init?: RequestInit) => {
  const response = ensureOk(await fetch(url, init), url);
  return (await response.json()) as T;
};

export const fetchStream = async (url: string, init?: RequestInit) => {
  const response = ensureOk(await fetch(url, init), url);
  if (!response.body) {
    throw new Error(`Unable to fetch ${url}. Response body is empty`);
  }
  return {
    contentLength: response.headers.get("content-length"),
    stream: Readable.fromWeb(response.body as never),
  };
};
