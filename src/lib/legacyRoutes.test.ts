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
import { resolveLegacyPath as r2 } from "./legacyRoutes";
import { it as it2, expect as ex2 } from "vitest";
it2("redirects old graduation post", () => {
  ex2(r2("/graduation-party-catering-celebrating-graduate/")).toBe("/blog/graduation-party-catering-east-idaho");
});
it2("redirects old catering-style and reunion posts", () => {
  ex2(r2("/choose-right-catering-style-event-size/")).toBe("/blog/choose-catering-style-event-size");
  ex2(r2("/guide-catering-family-reunions-eastern-idaho")).toBe("/blog/family-reunion-catering-eastern-idaho");
});
