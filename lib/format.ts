export function dehumanize(str: string) {
  return str.toLowerCase().replace(/\s/g, '_').replace(/[^\w]/g, '');
}

export function escapeHtml(str: string) {
  return str.replace(
    /[\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u00FF]/g,
    c => '&#' + ('000' + c.charCodeAt(0)).slice(-4) + ';'
  )
}

export function humanize(str: string) {
  return str.replaceAll('_',' ');
}

export function toLongDate(id: string) {
  const date = Date.UTC(+id.slice(0,4), +id.slice(4,6) - 1, +id.slice(6,8), 5, 0, 0)
  return toLocaleDate(new Date(date))
}

export function toLocaleDate(date: Date, timeZone: string = 'UTC') {
  return date.toLocaleDateString(undefined,
    { year: 'numeric', month: 'long', day: 'numeric', timeZone }
  )
}
