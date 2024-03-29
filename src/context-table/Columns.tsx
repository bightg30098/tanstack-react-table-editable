import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import ContextCell from './ContextCell';
import EditableCell from './EditableCell';

import type { Overview } from '../mockData';

const columnHelper = createColumnHelper<Overview>();

export const getColumns = ({ footer, latestDate }: { footer?: Overview; latestDate: Date }) => {
  const currYear = latestDate.getFullYear();
  const lastYear = currYear - 1;

  return [
    // Actions, edit, delete, save, cancel events are handled here
    columnHelper.display({
      id: nanoid(),
      header: 'Actions',
      cell: (info) => {
        const rowId = info.row.id;

        return (
          <ContextCell>
            {({ getIsEditing, dispatch }) => (
              <>
                {getIsEditing(rowId) ? (
                  <>
                    <button onClick={() => dispatch({ type: 'ON_SAVE', payload: { rowId } })}>
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        dispatch({ type: 'ON_CANCEL', payload: { rowId } });
                      }}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => dispatch({ type: 'SET_IS_EDITING', payload: { rowId, isEditing: true } })}>
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => dispatch({ type: 'ON_DELETE', payload: { rowId } })}>
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </>
                )}
              </>
            )}
          </ContextCell>
        );
      }
    }),
    columnHelper.group({
      id: nanoid(),
      header: () => <span>Site</span>,
      columns: [
        columnHelper.accessor('site', {
          cell: (info) => info.getValue(),
          footer: () => <span>{footer?.site}</span>,
          meta: {
            header: { isPlaceholder: true },
            cell: { className: clsx('whitespace-nowrap text-center') },
            footer: { className: clsx('text-center') }
          }
        })
      ],
      meta: {
        header: { rowSpan: 2 }
      }
    }),
    columnHelper.group({
      id: nanoid(),
      header: () => <span>Electricity Consumption (kWh)</span>,
      columns: [
        columnHelper.accessor('electricCompareYear', {
          header: () => <span>{lastYear}</span>,
          cell: (info) => <EditableCell {...info} />
        }),
        columnHelper.accessor('electricCurrentYear', {
          header: () => <span>{currYear}</span>,
          cell: (info) => <EditableCell {...info} />
        }),
        columnHelper.accessor('electricWeight', {
          header: () => <span>Weight</span>,
          cell: (info) => <EditableCell {...info} unit={1e-2} suffix="%" />
        }),
        columnHelper.accessor('electricGradient', {
          header: () => <span>Gap *</span>,
          cell: (info) => <EditableCell {...info} unit={1e-2} suffix="%" />
        })
      ]
    }),
    columnHelper.group({
      id: nanoid(),
      header: () => <span>Water Consumption (Ton)</span>,
      columns: [
        columnHelper.accessor('waterUseCompareYear', {
          header: () => <span>{lastYear}</span>,
          cell: (info) => <EditableCell {...info} />
        }),
        columnHelper.accessor('waterUseCurrentYear', {
          header: () => <span>{currYear}</span>,
          cell: (info) => <EditableCell {...info} />
        }),
        columnHelper.accessor('waterUseWeight', {
          header: () => <span>Weight</span>,
          cell: (info) => <EditableCell {...info} unit={1e-2} suffix="%" />
        }),
        columnHelper.accessor('waterUseGradient', {
          header: () => <span>Gap *</span>,
          cell: (info) => <EditableCell {...info} unit={1e-2} suffix="%" />
        })
      ]
    }),
    columnHelper.group({
      id: nanoid(),
      header: () => <span>Revenue (Billion NTD)</span>,
      columns: [
        columnHelper.accessor('revenueCompareYear', {
          header: () => <span>{lastYear}</span>,
          cell: (info) => <EditableCell {...info} precision={3} />
        }),
        columnHelper.accessor('revenueCurrentYear', {
          header: () => <span>{currYear}</span>,
          cell: (info) => <EditableCell {...info} precision={3} />
        }),
        columnHelper.accessor('revenueWeight', {
          header: () => <span>Weight</span>,
          cell: (info) => <EditableCell {...info} unit={1e-2} suffix="%" />
        }),
        columnHelper.accessor('revenueGradient', {
          header: () => <span>Gap *</span>,
          cell: (info) => <EditableCell {...info} unit={1e-2} suffix="%" />
        })
      ]
    }),
    columnHelper.group({
      id: nanoid(),
      header: () => <span>ASP (Thousand NTD / Product)</span>,
      columns: [
        columnHelper.accessor('ASPCompareYear', {
          header: () => <span>{lastYear}</span>,
          cell: (info) => <EditableCell {...info} precision={3} />
        }),
        columnHelper.accessor('ASPCurrentYear', {
          header: () => <span>{currYear}</span>,
          cell: (info) => <EditableCell {...info} precision={3} />
        }),
        columnHelper.accessor('ASPGradient', {
          header: () => <span>Gap *</span>,
          cell: (info) => <EditableCell {...info} unit={1e-2} suffix="%" />
        })
      ]
    })
  ];
};
