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
  // CommonMark's bare `(url)` form forbids whitespace, and requires balanced
  // parens — many renderers skip that tracking. Use the angle-bracket form
  // for any URL containing parens or whitespace; that form forbids `<` `>`
  // and newlines, so percent-encode those.
  if (/[()\s]/.test(url)) {
    return "<" + url.replace(/[<>\n\r]/g, encodeURIComponent) + ">";
  }
  return url;
}
