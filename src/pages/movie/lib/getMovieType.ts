export function getMovieType(type: string | undefined): string {
  switch (type) {
    case "movie":
      return "фильма";
    case "cartoon":
      return "мультфильма";
    default:
      return "сериала";
  }
}
