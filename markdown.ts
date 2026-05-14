export function sanitizeTitle(text: string): string {
  // Collapse whitespace (incl. newlines) and escape characters that would
  // break a Markdown link label.
  return text
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\\/g, "\\\\")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]");
}

export function formatUrl(url: string): string {
  // CommonMark's bare `(url)` form forbids whitespace and only allows
  // balanced parens — URLs like Wikipedia's `Foo_(bar)` break it. Switch to
  // the angle-bracket form when needed; that form forbids `<` `>` newlines,
  // so percent-encode those.
  if (/[()\s]/.test(url)) {
    return "<" + url.replace(/[<>\n\r]/g, encodeURIComponent) + ">";
  }
  return url;
}
