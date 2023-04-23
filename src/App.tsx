import { useMemo } from 'react';

import clsx from 'clsx';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';

import { getColumns as getContextColumns } from './context-table/Columns';
import ContextTable from './context-table/EditableTable';
import { getColumns as getMetaColumns } from './meta-table/Columns';
import MetaTable from './meta-table/EditableTable';
import { createOverview } from './mockData';

export default function App() {
  return (
    <main className="space-y-4 p-4">
      <BrowserRouter>
        <nav className="space-x-4">
          <NavLink to="/meta" className={({ isActive }) => clsx(isActive && 'font-medium underline')}>
            Meta Table Example
          </NavLink>
          <NavLink to="/context" className={({ isActive }) => clsx(isActive && 'font-medium underline')}>
            Context Table Example
          </NavLink>
        </nav>

        <Routes>
          <Route path="/meta" element={<MetaTableExample />} />
          <Route path="/context" element={<ContextTableExample />} />
          <Route path="*" element={<Navigate to="/meta" />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

function ContextTableExample() {
  const contextColumns = useMemo(() => getContextColumns({ latestDate: new Date() }), []);
  const contextData = useMemo(() => Array.from({ length: 20 }, (_) => createOverview()), []);

  return (
    <>
      <ContextTable columns={contextColumns} data={contextData} />
    </>
  );
}

function MetaTableExample() {
  const metaColumns = useMemo(() => getMetaColumns({ latestDate: new Date() }), []);
  const metaData = useMemo(() => Array.from({ length: 20 }, (_) => createOverview()), []);

  return (
    <>
      <MetaTable columns={metaColumns} data={metaData} />
    </>
  );
}
