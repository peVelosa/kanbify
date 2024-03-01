import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_REDIRECT,
  verifyRoute,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuth = !!req.auth;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAuthApiPrefix = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isVerifyRoute = nextUrl.pathname.startsWith(verifyRoute);

  if (isPublicRoute || isAuthApiPrefix || isVerifyRoute) return;

  if (isAuthRoute && !isAuth) return;

  if (isAuthRoute && isAuth)
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  if (!isAuth && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
