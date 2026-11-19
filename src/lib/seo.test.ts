import { describe, it, expect } from "vitest";
import { STATIC_SEO, absoluteUrl } from "./seo";

describe("static page SEO", () => {
  it("every static page has a title under 70 chars and a description between 50 and 165 chars", () => {
    for (const [path, m] of Object.entries(STATIC_SEO)) {
      expect(m.title.length, path).toBeLessThanOrEqual(70);
      expect(m.description.length, path).toBeGreaterThanOrEqual(50);
      expect(m.description.length, path).toBeLessThanOrEqual(165);
    }
  });
  it("thank-you page is kept out of search results", () => {
    expect(STATIC_SEO["/thank-you"].noindex).toBe(true);
  });
  it("share images become absolute site URLs", () => {
    expect(absoluteUrl("/images/bbq-ribs.jpg")).toBe("https://idaho-eats-easy.lovable.app/images/bbq-ribs.jpg");
  });
});
