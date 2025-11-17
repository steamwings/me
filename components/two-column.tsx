import React from 'react'

export function TwoColumn({ children }: { children: React.ReactNode }) {
  const childArray = React.Children.toArray(children)
  const columnBreakIndex = childArray.findIndex(
    (child) => React.isValidElement(child) && child.type === ColumnBreak
  )

  let leftColumn: React.ReactNode[]
  let rightColumn: React.ReactNode[]

  if (columnBreakIndex !== -1) {
    leftColumn = childArray.slice(0, columnBreakIndex)
    rightColumn = childArray.slice(columnBreakIndex + 1)
  } else {
    const midpoint = Math.ceil(childArray.length / 2)
    leftColumn = childArray.slice(0, midpoint)
    rightColumn = childArray.slice(midpoint)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        margin: '1rem 0',
        overflowX: 'scroll',
      }}
    >
      <div style={{ whiteSpace: 'pre' }}>{leftColumn}</div>
      <div style={{ whiteSpace: 'pre' }}>{rightColumn}</div>
    </div>
  )
}

export function ColumnBreak() {
  return null
}
