export function createQueryString(params: Record<string, any>): string {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined) // Remove propriedades nulas ou indefinidas
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    ) // Codifica as propriedades
    .join("&"); // Junta todas as propriedades com '&'

  return query ? `?${query}` : "";
}
