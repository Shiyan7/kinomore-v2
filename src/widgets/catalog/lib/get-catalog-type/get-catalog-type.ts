export function getCatalogType(pathname: string): string {
  switch (pathname) {
    case '/films':
      return '1';
    case '/series':
      return '2';
    case '/cartoons':
      return '3';
    default:
      return '1';
  }
}
