import { useContext, useEffect, useState } from 'react'

import { TableContext } from './TableContext'

import type { CellContext } from '@tanstack/react-table'

export default function EditableCell<T>({ getValue, row, column }: CellContext<T, unknown>) {
  const { updateData, getIsEditing } = useContext(TableContext)

  const initialValue = getValue()

  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    updateData(row.index, column.id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <>
      {getIsEditing(row.index) ? (
        <input value={value as string} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />
      ) : (
        <div>{value as string}</div>
      )}
    </>
  )
}
