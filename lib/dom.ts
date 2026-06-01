export function getElement(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`[md-link] missing element #${id}`);
  return el;
}
