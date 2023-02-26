import { Reducer, useEffect, useReducer, useRef, useState } from 'react'

import { useReactTable } from '@tanstack/react-table'

import type { TableOptions } from '@tanstack/react-table'
import { ActionProps, DraftProps } from './types'

export function useEditableTable<T>({
  data,
  columns,
  defaultColumn,
  getCoreRowModel,
}: Omit<TableOptions<T>, 'data'> & { data: (T & { _id: string })[] }) {
  // Create a local state for the table data
  const [_data, setData] = useState(data)

  // Create a snapshot of the table data by row index
  const getSnapshot = (data: (T & { _id: string })[]) =>
    data.reduce((prev, curr) => ({ ...prev, [curr._id]: curr }), {} as Record<string, T & { _id: string }>)

  const snapshotRef = useRef(getSnapshot(data))

  // useReducer is used to manage the draft state of the table
  const [draft, dispatch] = useReducer<Reducer<Record<string, DraftProps>, ActionProps>>((prev, action) => {
    const { type, payload } = action
    const rowId = type === 'RESET' ? '' : payload.rowId

    switch (type) {
      // Set isEditing state of the row
      case 'SET_IS_EDITING': {
        return { ...prev, [rowId]: { ...prev[rowId], ...payload } }
      }

      // Cancel editing of the row
      case 'ON_CANCEL': {
        // Remove the row from the draft state
        const { [rowId]: rowData, ...rest } = prev

        // Restore the row from the snapshot
        const { [rowId]: rowSnapshot } = snapshotRef.current

        // Update the table data, and re-render the table
        setData((prev) => prev.map((row) => (row._id === rowId ? rowSnapshot : row)))

        return { ...rest }
      }

      // Save the row
      case 'ON_SAVE': {
        // Remove the row from the draft state
        const { [rowId]: rowData, ...rest } = prev

        // Update the snapshot by draft row data
        snapshotRef.current = {
          ...snapshotRef.current,
          [rowId]: {
            ...snapshotRef.current[rowId],
            ...rowData.data,
          },
        }

        // Update the table data, and re-render the table
        setData((prev) => prev.map((row) => (row._id === rowId ? snapshotRef.current[rowId] : row)))

        return { ...rest }
      }

      // Delete the row
      case 'ON_DELETE': {
        // Remove the row from the draft state
        const { [rowId]: rowData, ...rest } = prev

        // Remove the row from the snapshot
        const { [rowId]: rowSnapshot, ...restSnapshot } = snapshotRef.current
        snapshotRef.current = restSnapshot

        // Update the table data, and re-render the table
        setData((prev) => prev.filter((row) => row._id !== rowId))

        return { ...rest }
      }

      // Update the draft state of the row
      case 'UPDATE_DATA': {
        return {
          ...prev,
          [rowId]: { ...prev[rowId], data: { ...prev[rowId].data, [payload.columnId]: payload.value } },
        }
      }

      case 'RESET': {
        return {}
      }

      default:
        return prev
    }
  }, {} as Record<string, DraftProps>)

  const getIsEditing = (rowId: string) => {
    return draft[rowId]?.isEditing ?? false
  }

  const table = useReactTable({
    data: _data,
    columns,
    defaultColumn,
    getCoreRowModel,
    getRowId: (originalRow, index, parent) => {
      // custom get row id
      return (originalRow as T & { _id: string })._id
    },
  })

  useEffect(() => {
    snapshotRef.current = getSnapshot(data)
    dispatch({ type: 'RESET' })
    setData(data)
  }, [data])

  return {
    table,
    dispatch,
    getIsEditing,
  } as const
}
