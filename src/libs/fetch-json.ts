export class HttpError extends Error {
  constructor(public readonly status: number) {
    super(`Request failed (${status})`);
    this.name = "HttpError";
  }
}

export const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) throw new HttpError(response.status);
  return response.json() as Promise<T>;
};
