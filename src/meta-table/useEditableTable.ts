import { useReactTable } from '@tanstack/react-table';

import { useEditableReducer } from '../useEditableReducer';

import type { TableOptions } from '@tanstack/react-table';

// This is a custom hook that wraps useReactTable and useEditableReducer
export function useEditableTable<T>({
  data,
  columns,
  defaultColumn,
  getCoreRowModel
}: Omit<TableOptions<T>, 'data'> & { data: (T & { _id: string })[] }) {
  const { data: _data, dispatch, getIsEditing } = useEditableReducer({ data });

  const table = useReactTable({
    data: _data,
    columns,
    defaultColumn,
    getCoreRowModel,
    getRowId: (originalRow, index, parent) => {
      // custom get row id
      return (originalRow as T & { _id: string })._id;
    },
    meta: {
      dispatch,
      getIsEditing
    },
    debugTable: true
  });

  return { table, dispatch, getIsEditing } as const;
}
