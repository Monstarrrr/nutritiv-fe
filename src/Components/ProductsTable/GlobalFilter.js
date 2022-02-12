import React from 'react'

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      Search: {' '}
      <input
        onChange={e => setFilter(e.target.value)}
        type="text"
        value={filter || ''}
      />
    </span>
  )
}
