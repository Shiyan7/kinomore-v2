export function getMovieType(type: string | undefined): string {
  switch (type) {
    case 'movie':
      return 'фильм';
    case 'cartoon':
      return 'мультик';
    default:
      return 'сериал';
  }
}
