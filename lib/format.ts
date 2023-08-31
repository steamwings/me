export function dehumanize(str: string) {
  return str.toLowerCase().replace(/\s/g, '_').replace(/[^\w]/g, '');
}

export function humanize(str: string) {
  return str.replaceAll('_',' ');
}

export function toLongDate(id: string) {
  const date = Date.UTC(+id.slice(0,4), +id.slice(4,6) - 1, +id.slice(6,8), 5, 0, 0)
  return new Date(date)
    .toLocaleDateString("en-US",
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}
