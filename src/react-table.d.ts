import type { ActionProps } from './types';
import * as ReactTable from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    header?: {
      className?: string;
      rowSpan?: number;
      colSpan?: number;
      isExpander?: boolean;
      isPlaceholder?: boolean;
    };

    cell?: {
      className?: string;
      rowSpan?: number;
      colSpan?: number;
      isExpander?: boolean;
      getRowSpan?: (table: Table<TData>, row: Row<TData>, columnId: Cell<TData, string>) => number | undefined;
      getColSpan?: (table: Table<TData>, row: Row<TData>, columnId: string) => number | undefined;
      getClassName?: (row: Row<TData>, columnId: string) => string;
    };

    footer?: {
      className?: string;
      rowSpan?: number;
      colSpan?: number;
    };
  }

  interface TableMeta<TData extends RowData> {
    className?: string;
    dispatch?: React.Dispatch<ActionProps>;
    getIsEditing?: (rowId: string) => boolean;
  }
}
