import { createContext } from 'react'

export type TableContextProps = {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void
  setIsEditing: (rowIndex: number, isEditing: boolean) => void
  getIsEditing: (rowIndex: number) => boolean
  onCancel: (rowIndex: number) => void
  onSave: (rowIndex: number) => void
  onDelete: (rowIndex: number) => void
}

export const TableContext = createContext<TableContextProps>({
  updateData: () => {},
  setIsEditing: () => {},
  getIsEditing: () => false,
  onCancel: () => {},
  onSave: () => {},
  onDelete: () => {},
})
