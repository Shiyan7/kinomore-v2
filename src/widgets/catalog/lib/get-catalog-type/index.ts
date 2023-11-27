export function getCatalogType(pathname: string): string {
  switch (pathname) {
    case '/films':
      return 'movie';
    case '/series':
      return 'tv-series';
    case '/cartoons':
      return 'cartoon';
    default:
      return 'movie';
  }
}
