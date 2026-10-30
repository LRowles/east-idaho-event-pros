export const LEGACY_ROUTES: Record<string, string> = {
  "/about-us": "/about",
  "/our-menus": "/menus",
  "/bbq-smokehouse-catering": "/bbq-catering",
  "/corporate-event-catering": "/corporate-catering",
  "/social-gathering-catering": "/private-social-events",
  "/service-areas": "/service-area",
};

export function resolveLegacyPath(pathname: string): string | null {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (LEGACY_ROUTES[path]) return LEGACY_ROUTES[path];
  const cityMatch = path.match(/^\/service-areas\/(?:catering-in-)?([^/]+)$/);
  return cityMatch ? `/catering/${cityMatch[1]}` : null;
}