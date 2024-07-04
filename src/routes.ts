/**
 * Contains all public routes that can be accessed by anyone in the application.
 */
export const publicRoutes = ["/"];

/**
 * Contains all routes used for authentication.
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * Contains all API routes used for authentication.
 */
export const apiAuthPrefix = ["/api/auth", "/api/trpc/auth.login", "/api/trpc/auth.register"];

/**
 * Contains all routes used for validation
 * @exemple verify/reset-password.
 */
export const validationRoutes = ["/verify"];

/*
 * Default redirect route after login.
 */
export const DEFAULT_REDIRECT = "/dashboard";
