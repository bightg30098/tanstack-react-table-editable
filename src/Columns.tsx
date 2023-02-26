import { createColumnHelper } from '@tanstack/react-table'
import clsx from 'clsx'
import { nanoid } from 'nanoid'

export type Overview = {
  latestDate: string
  site: string
  electricCompareYear: number
  electricCurrentYear: number
  electricWeight: number
  electricGradient: number
  waterUseCompareYear: number
  waterUseCurrentYear: number
  waterUseWeight: number
  waterUseGradient: number
  revenueCompareYear: number
  revenueCurrentYear: number
  revenueWeight: number
  revenueGradient: number
  ASPCompareYear: number
  ASPCurrentYear: number
  ASPWeight: number
  ASPGradient: number
  plants?: Overview[]
}

const columnHelper = createColumnHelper<Overview>()

export const getColumns = ({ footer, latestDate }: { footer?: Overview; latestDate: Date }) => {
  const currYear = latestDate.getFullYear()
  const lastYear = currYear - 1

  return [
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
            footer: { className: clsx('text-center') },
          },
        }),
      ],
      meta: {
        header: { rowSpan: 2 },
      },
    }),
    columnHelper.group({
      id: nanoid(),
      header: () => <span>Electricity Consumption (kWh)</span>,
      columns: [
        columnHelper.accessor('electricCompareYear', {
          header: () => <span>{lastYear}</span>,
          cell: (info) => <NumericFormat value={info.getValue()} />,
          footer: () => <NumericFormat value={footer?.electricCompareYear} />,
        }),
        columnHelper.accessor('electricCurrentYear', {
          header: () => <span>{currYear}</span>,
          cell: (info) => <NumericFormat value={info.getValue()} />,
          footer: () => <NumericFormat value={footer?.electricCurrentYear} />,
        }),
        columnHelper.accessor('electricWeight', {
          header: () => <span>Weight</span>,
          cell: (info) => <NumericFormat value={info.getValue()} unit={1e-2} suffix="%" />,
          footer: () => <NumericFormat value={footer?.electricWeight} unit={1e-2} suffix="%" />,
        }),
        columnHelper.accessor('electricGradient', {
          header: () => <span>Gap *</span>,
          cell: (info) => <NumericFormat value={info.getValue()} unit={1e-2} suffix="%" />,
          footer: () => <NumericFormat value={footer?.electricGradient} unit={1e-2} suffix="%" />,
        }),
      ],
    }),
    columnHelper.group({
      id: nanoid(),
      header: () => <span>Water Consumption (Ton)</span>,
      columns: [
        columnHelper.accessor('waterUseCompareYear', {
          header: () => <span>{lastYear}</span>,
          cell: (info) => <NumericFormat value={info.getValue()} />,
          footer: () => <NumericFormat value={footer?.waterUseCompareYear} />,
        }),
        columnHelper.accessor('waterUseCurrentYear', {
          header: () => <span>{currYear}</span>,
          cell: (info) => <NumericFormat value={info.getValue()} />,
          footer: () => <NumericFormat value={footer?.waterUseCurrentYear} />,
        }),
        columnHelper.accessor('waterUseWeight', {
          header: () => <span>Weight</span>,
          cell: (info) => <NumericFormat value={info.getValue()} unit={1e-2} suffix="%" />,
          footer: () => <NumericFormat value={footer?.waterUseWeight} unit={1e-2} suffix="%" />,
        }),
        columnHelper.accessor('waterUseGradient', {
          header: () => <span>Gap *</span>,
          cell: (info) => <NumericFormat value={info.getValue()} unit={1e-2} suffix="%" />,
          footer: () => <NumericFormat value={footer?.waterUseGradient} unit={1e-2} suffix="%" />,
        }),
      ],
    }),
    columnHelper.group({
      id: nanoid(),
      header: () => <span>Revenue (Billion NTD)</span>,
      columns: [
        columnHelper.accessor('revenueCompareYear', {
          header: () => <span>{lastYear}</span>,
          cell: (info) => <NumericFormat value={info.getValue()} precision={3} />,
          footer: () => <NumericFormat value={footer?.revenueCompareYear} precision={3} />,
        }),
        columnHelper.accessor('revenueCurrentYear', {
          header: () => <span>{currYear}</span>,
          cell: (info) => <NumericFormat value={info.getValue()} precision={3} />,
          footer: () => <NumericFormat value={footer?.revenueCurrentYear} precision={3} />,
        }),
        columnHelper.accessor('revenueWeight', {
          header: () => <span>Weight</span>,
          cell: (info) => <NumericFormat value={info.getValue()} unit={1e-2} suffix="%" />,
          footer: () => <NumericFormat value={footer?.revenueWeight} unit={1e-2} suffix="%" />,
        }),
        columnHelper.accessor('revenueGradient', {
          header: () => <span>Gap *</span>,
          cell: (info) => <NumericFormat value={info.getValue()} unit={1e-2} suffix="%" />,
          footer: () => <NumericFormat value={footer?.revenueGradient} unit={1e-2} suffix="%" />,
        }),
      ],
    }),
    columnHelper.group({
      id: nanoid(),
      header: () => <span>ASP (Thousand NTD / Product)</span>,
      columns: [
        columnHelper.accessor('ASPCompareYear', {
          header: () => <span>{lastYear}</span>,
          cell: (info) => <NumericFormat value={info.getValue()} precision={3} />,
          footer: () => <NumericFormat value={footer?.ASPCompareYear} precision={3} />,
        }),
        columnHelper.accessor('ASPCurrentYear', {
          header: () => <span>{currYear}</span>,
          cell: (info) => <NumericFormat value={info.getValue()} precision={3} />,
          footer: () => <NumericFormat value={footer?.ASPCurrentYear} precision={3} />,
        }),
        columnHelper.accessor('ASPGradient', {
          header: () => <span>Gap *</span>,
          cell: (info) => <NumericFormat value={info.getValue()} unit={1e-2} suffix="%" />,
          footer: () => <NumericFormat value={footer?.ASPGradient} unit={1e-2} suffix="%" />,
        }),
      ],
    }),
  ]
}

function NumericFormat({ value = 0, unit = 1, suffix = '', precision = 0 }) {
  return (
    <span>
      {(value / unit).toLocaleString('en-US', { maximumFractionDigits: precision, minimumFractionDigits: precision })}
      {suffix}
    </span>
  )
}
