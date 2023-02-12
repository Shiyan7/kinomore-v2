export function getAgeRating(ageRating: number | null): string | null {
  if (!ageRating) return null;

  return `${ageRating}+`;
}
