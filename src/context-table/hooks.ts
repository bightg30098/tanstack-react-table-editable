import { useEffect, useRef, useState } from 'react'

import { useReactTable } from '@tanstack/react-table'

import type { TableOptions } from '@tanstack/react-table'

export function useEditableTable<T>({ data, columns, defaultColumn, getCoreRowModel }: TableOptions<T>) {
  const [_data, setData] = useState(data)
  const getSnapshot = (data: T[]): Record<string, T> => data.reduce((prev, curr, i) => ({ ...prev, [i]: curr }), {})
  const snapshotRef = useRef(getSnapshot(data))

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    setData((prev) =>
      prev.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...prev[rowIndex],
            [columnId]: value,
          }
        }

        return row
      }),
    )
  }

  const setIsEditing = (rowIndex: number, isEditing: boolean) => {
    setData((prev) =>
      prev.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...prev[rowIndex],
            isEditing,
          }
        }

        return row
      }),
    )
  }

  const getIsEditing = (rowIndex: number) => {
    return _data.at(rowIndex)?.isEditing ?? false
  }

  const onCancel = (rowIndex: number) => {
    const snapshot = snapshotRef.current[String(rowIndex)]

    if (snapshot) {
      setData((prev) =>
        prev.map((row, index) => {
          if (index === rowIndex) {
            return { ...snapshot, isEditing: false }
          }

          return row
        }),
      )
    } else {
      setIsEditing(rowIndex, false)
    }
  }

  const onSave = (rowIndex: number) => {
    setIsEditing(rowIndex, false)
    snapshotRef.current = {
      ...snapshotRef.current,
      [rowIndex]: { ..._data.at(rowIndex), isEditing: false },
    }
  }

  const onDelete = (rowIndex: number) => {
    setData((prev) => prev.filter((_, index) => index !== rowIndex))
    const { deleted, ...rest } = snapshotRef.current
    snapshotRef.current = rest
  }

  const table = useReactTable({
    data: _data,
    columns,
    defaultColumn,
    getCoreRowModel,
  })

  useEffect(() => {
    setData(data)
    snapshotRef.current = getSnapshot(data)
  }, [data])

  return {
    table,
    updateData,
    setIsEditing,
    getIsEditing,
    onCancel,
    onSave,
    onDelete,
  } as const
}
