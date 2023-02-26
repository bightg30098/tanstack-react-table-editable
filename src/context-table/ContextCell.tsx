import { useContext } from 'react'

import { TableContext } from './TableContext'

import type { TableContextProps } from './TableContext'

type ContextCellProps = {
  children?: React.ReactNode | ((context: TableContextProps) => React.ReactNode)
}

export default function ContextCell({ children }: ContextCellProps) {
  const context = useContext(TableContext)

  return <>{typeof children === 'function' ? children(context) : children}</>
}
