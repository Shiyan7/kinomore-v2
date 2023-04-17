import { NextResponse, type NextRequest } from 'next/server';
import { paths } from 'shared/routing';

const redirectTo = (request: NextRequest, to: string) => {
  const toUrl = new URL(to, request.url);

  return NextResponse.redirect(toUrl);
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const isProtectedRoute = request.nextUrl.pathname.startsWith(paths.profile);

  const token = request.cookies.get('accessToken')?.value;

  if (!token && isProtectedRoute) {
    return redirectTo(request, paths.home);
  }

  return response;
}
