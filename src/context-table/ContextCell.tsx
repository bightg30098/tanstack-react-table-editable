import { useContext } from 'react'

import { TableContext } from './TableContext'

import type { TableContextProps } from './TableContext'

type ContextCellProps = {
  children?: React.ReactNode | ((context: TableContextProps) => React.ReactNode)
}

// This component consumes the TableContext and passes it to its children
export default function ContextCell({ children }: ContextCellProps) {
  const context = useContext(TableContext)

  return <>{typeof children === 'function' ? children(context) : children}</>
}
