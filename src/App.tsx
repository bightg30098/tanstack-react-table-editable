import { useMemo } from 'react'

import { getColumns } from './Columns'
import EditableTable from './context-table/EditableTable'
import { createOverview } from './mockData'

export default function App() {
  const columns = useMemo(() => getColumns({ latestDate: new Date() }), [])
  const data = useMemo(() => Array.from({ length: 20 }, (_) => createOverview()), [])

  return (
    <>
      <h1>Context Table</h1>
      <EditableTable columns={columns} data={data} />
    </>
  )
}
