import '@tanstack/react-table'

import type { ActionProps } from './types'

declare module '@tanstack/table-core' {
  interface ColumnMeta {
    header?: {
      className?: string
      rowSpan?: number
      colSpan?: number
      isExpander?: boolean
      isPlaceholder?: boolean
    }

    cell?: {
      className?: string
      rowSpan?: number
      colSpan?: number
      isExpander?: boolean
    }

    footer?: {
      className?: string
      rowSpan?: number
      colSpan?: number
    }
  }

  interface TableMeta {
    className?: string
    dispatch?: React.Dispatch<ActionProps>
    getIsEditing?: (rowId: string) => boolean
  }
}
