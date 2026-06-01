import { describe, it, expect } from "vitest";
import { sanitizeTitle, formatUrl } from "./markdown";

describe("sanitizeTitle", () => {
  it("passes through a plain title unchanged", () => {
    expect(sanitizeTitle("Hello World")).toBe("Hello World");
  });

  it("collapses multiple spaces", () => {
    expect(sanitizeTitle("foo   bar")).toBe("foo bar");
  });

  it("collapses newlines and tabs", () => {
    expect(sanitizeTitle("foo\n\tbar")).toBe("foo bar");
  });

  it("trims leading/trailing whitespace", () => {
    expect(sanitizeTitle("  hi  ")).toBe("hi");
  });

  it("escapes backslashes", () => {
    expect(sanitizeTitle("a\\b")).toBe("a\\\\b");
  });

  it("escapes square brackets", () => {
    expect(sanitizeTitle("[link]")).toBe("\\[link\\]");
  });
});

describe("formatUrl", () => {
  it("returns a plain URL unchanged", () => {
    expect(formatUrl("https://example.com/path")).toBe(
      "https://example.com/path"
    );
  });

  it("wraps URLs with parentheses in angle brackets", () => {
    expect(formatUrl("https://en.wikipedia.org/wiki/Foo_(bar)")).toBe(
      "<https://en.wikipedia.org/wiki/Foo_(bar)>"
    );
  });

  it("wraps URLs with spaces in angle brackets", () => {
    expect(formatUrl("https://example.com/a b")).toBe(
      "<https://example.com/a b>"
    );
  });

  it("percent-encodes < and > inside angle-bracket form", () => {
    expect(formatUrl("https://example.com/a<b>c (x)")).toBe(
      "<https://example.com/a%3Cb%3Ec (x)>"
    );
  });

  it("percent-encodes newlines inside angle-bracket form", () => {
    expect(formatUrl("https://example.com/a\nb (x)")).toBe(
      "<https://example.com/a%0Ab (x)>"
    );
  });
});
