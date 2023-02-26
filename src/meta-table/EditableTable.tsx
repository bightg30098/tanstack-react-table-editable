import { useMemo } from 'react'

import { getCoreRowModel, flexRender } from '@tanstack/react-table'
import { nanoid } from 'nanoid'

import EditableCell from './EditableCell'
import { useEditableTable } from './useEditableTable'

import type { ColumnDef, ColumnDefBase } from '@tanstack/react-table'

export type EditableTableProps<T> = {
  data: T[]
  columns: ColumnDef<T, unknown>[] & ColumnDefBase<T, unknown>[]
}

const defaultColumn = {
  cell: EditableCell,
}

export default function EditableTable<T>({ data, columns }: EditableTableProps<T>) {
  // make sure each row has a unique id
  const dataWithId = useMemo(() => data.map((d) => ({ ...d, _id: nanoid() })), [data])

  // This hook returns the table instance and the dispatch function to update the table state
  const { table } = useEditableTable({
    data: dataWithId,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="relative flex flex-col overflow-auto rounded-t-lg shadow-lg">
      <table className="w-full border-separate border-spacing-0 text-right">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
