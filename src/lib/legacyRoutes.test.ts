import { describe, expect, it } from "vitest";
import { resolveLegacyPath } from "./legacyRoutes";

describe("original website addresses", () => {
  it.each([
    ["/about-us/", "/about"],
    ["/our-menus/", "/menus"],
    ["/bbq-smokehouse-catering/", "/bbq-catering"],
    ["/corporate-event-catering/", "/corporate-catering"],
    ["/social-gathering-catering/", "/private-social-events"],
    ["/service-areas/", "/service-area"],
    ["/service-areas/idaho-falls/", "/catering/idaho-falls"],
    ["/service-areas/catering-in-driggs/", "/catering/driggs"],
  ])("maps %s to %s", (original, current) => {
    expect(resolveLegacyPath(original)).toBe(current);
  });
  it("does not redirect unknown pages", () => {
    expect(resolveLegacyPath("/not-a-real-page")).toBeNull();
  });
});