import { useContext } from 'react'

import { TableContext } from './TableContext'

import type { TableContextProps } from './TableContext'

type ActionCellProps = {
  children?: React.ReactNode | ((context: TableContextProps) => React.ReactNode)
}

export default function ActionCell({ children }: ActionCellProps) {
  const context = useContext(TableContext)

  return <>{typeof children === 'function' ? children(context) : children}</>
}
