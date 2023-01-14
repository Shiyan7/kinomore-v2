export function getAgeRating(ageRating: number): string | null {
  if (!ageRating) return null;

  return `${ageRating}+`;
}
