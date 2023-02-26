import { getCoreRowModel, flexRender } from '@tanstack/react-table'

import EditableCell from './EditableCell'
import { TableContext } from './TableContext'
import { useEditableTable } from './hooks'

import type { ColumnDef, ColumnDefBase } from '@tanstack/react-table'

export type EditableTableProps<T> = {
  data: T[]
  columns: ColumnDef<T, unknown>[] & ColumnDefBase<T, unknown>[]
}

const defaultColumn = {
  cell: EditableCell,
}

export default function EditableTable<T>({ data, columns }: EditableTableProps<T>) {
  const { table, updateData, setIsEditing, getIsEditing, onCancel, onSave, onDelete } = useEditableTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TableContext.Provider value={{ updateData, setIsEditing, getIsEditing, onCancel, onSave, onDelete }}>
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
    </TableContext.Provider>
  )
}
