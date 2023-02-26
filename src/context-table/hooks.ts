import { Reducer, useEffect, useReducer, useRef, useState } from 'react'

import { useReactTable } from '@tanstack/react-table'

import type { TableOptions } from '@tanstack/react-table'
import { ActionProps, DraftProps } from './types'

export function useEditableTable<T>({ data, columns, defaultColumn, getCoreRowModel }: TableOptions<T>) {
  // Create a local state for the table data
  const [_data, setData] = useState<T[]>(data)

  // Create a snapshot of the table data by row index
  const getSnapshot = (data: T[]) => data.reduce((prev, curr, i) => ({ ...prev, [i]: curr }), {} as Record<string, T>)
  const snapshotRef = useRef(getSnapshot(data))

  // useReducer is used to manage the draft state of the table
  const [draft, dispatch] = useReducer<Reducer<Record<string, DraftProps>, ActionProps>>((prev, action) => {
    const { type, payload } = action
    const rowIndex: number = payload.rowIndex

    switch (type) {
      // Set isEditing state of the row
      case 'SET_IS_EDITING': {
        return { ...prev, [rowIndex]: { ...prev[rowIndex], ...payload } }
      }

      // Cancel editing of the row
      case 'ON_CANCEL': {
        // Remove the row from the draft state
        const { [rowIndex]: rowData, ...rest } = prev

        // Restore the row from the snapshot
        const { [rowIndex]: rowSnapshot } = snapshotRef.current

        // Update the table data, and re-render the table
        setData((prev) => prev.map((row, i) => (i === rowIndex ? rowSnapshot : row)))

        return { ...rest }
      }

      // Save the row
      case 'ON_SAVE': {
        // Remove the row from the draft state
        const { [rowIndex]: rowData, ...rest } = prev

        // Update the snapshot by draft row data
        snapshotRef.current = {
          ...snapshotRef.current,
          [rowIndex]: {
            ...snapshotRef.current[rowIndex],
            ...rowData.data,
          },
        }

        // Update the table data, and re-render the table
        setData((prev) => prev.map((row, i) => (i === rowIndex ? snapshotRef.current[rowIndex] : row)))

        return { ...rest }
      }

      // Delete the row
      case 'ON_DELETE': {
        // Remove the row from the draft state
        const { [rowIndex]: rowData, ...rest } = prev

        // Remove the row from the snapshot
        const { [rowIndex]: rowSnapshot, ...restSnapshot } = snapshotRef.current
        snapshotRef.current = restSnapshot

        // Update the table data, and re-render the table
        setData((prev) => prev.filter((_, i) => i !== rowIndex))

        return { ...rest }
      }

      // Update the draft state of the row
      case 'UPDATE_DATA': {
        return {
          ...prev,
          [rowIndex]: { ...prev[rowIndex], data: { ...prev[rowIndex].data, [payload.columnId]: payload.value } },
        }
      }

      default:
        return prev
    }
  }, {} as Record<string, DraftProps>)

  const getIsEditing = (rowIndex: number) => {
    return draft[rowIndex]?.isEditing ?? false
  }

  const table = useReactTable({
    data: _data,
    columns,
    defaultColumn,
    getCoreRowModel,
  })

  useEffect(() => {
    snapshotRef.current = getSnapshot(data)
    setData(data)
  }, [data])

  return {
    table,
    dispatch,
    getIsEditing,
  } as const
}
