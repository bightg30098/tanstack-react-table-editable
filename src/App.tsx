import { useMemo } from 'react'
import { getColumns, Overview } from './Columns'
import EditableTable from './context-table/EditableTable'

import mock from './mock.json'

export default function App() {
  const columns = useMemo(() => getColumns({ latestDate: new Date() }), [])
  const data = useMemo(() => mock.data, [])

  return (
    <>
      <h1>Context Table</h1>
      <EditableTable columns={columns} data={data as Overview[]} />
    </>
  )
}
