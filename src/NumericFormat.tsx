import clsx from 'clsx'

export type NumericFormatProps = {
  value?: number
  unit?: number
  suffix?: string
  precision?: number
  className?: string
}

export default function NumericFormat({ className = '', value = 0, unit = 1, suffix = '', precision = 0 }) {
  return (
    <div className="relative inline-flex items-center">
      {/* Add dummy readonly input to make the parent div have the same width and height as the input to prevent layout shift when editing */}
      <input readOnly className={clsx('pointer-events-none', className)} />
      <span className="absolute right-0">{`${(value / unit).toLocaleString('en-US', {
        maximumFractionDigits: precision,
        minimumFractionDigits: precision,
      })}${suffix}`}</span>
    </div>
  )
}
