import { createContext } from 'react'
import { ActionProps } from './types'

// Create a context for the table
export type TableContextProps = {
  dispatch: React.Dispatch<ActionProps>
  getIsEditing: (rowIndex: number) => boolean
}

export const TableContext = createContext<TableContextProps>({
  dispatch: () => {},
  getIsEditing: () => false,
})
