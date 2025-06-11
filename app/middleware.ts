import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/explore", "/api(.*)"], // Adjust these based on what should be public
});

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - static files
     * - api routes (if public)
     */
    "/((?!_next|favicon.ico|.*\\..*).*)",
  ],
};
