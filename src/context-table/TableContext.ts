import { createContext } from 'react'

import type { ActionProps } from '../types'

// Create a context for the table
export type TableContextProps = {
  dispatch: React.Dispatch<ActionProps>
  getIsEditing: (rowId: string) => boolean
}

export const TableContext = createContext<TableContextProps>({
  dispatch: () => {},
  getIsEditing: () => false,
})
