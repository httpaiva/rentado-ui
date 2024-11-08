export function createQueryString(params: Record<string, any>): string {
  const query = Object.entries(params)
    .filter(([_, value]) => Boolean(value))
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    ) // Codifica as propriedades
    .join("&"); // Junta todas as propriedades com '&'

  return query ? `?${query}` : "";
}
