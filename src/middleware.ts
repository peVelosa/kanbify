import NextAuth from "next-auth";
import { authConfig } from "./server/auth";
import { publicRoutes, DEFAULT_REDIRECT } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuth = !!req.auth;

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
