export const normalizeSearchText = (value: string | null | undefined) =>
  (value ?? "").normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase();

export const eventNameWords = (name: string) =>
  normalizeSearchText(
    name.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2").replace(/([a-z\d])([A-Z])/g, "$1 $2"),
  );
