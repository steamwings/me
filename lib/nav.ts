export enum Destination {
  None,
  Up
}

export function getUrl(dest: Destination) {
  switch (dest) {
    case Destination.None:
      return ''
    case Destination.Up:
      return './'
  }
}
