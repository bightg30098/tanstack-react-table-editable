export type NumericFormatProps = {
  value?: number
  unit?: number
  suffix?: string
  precision?: number
}

export default function NumericFormat({ value = 0, unit = 1, suffix = '', precision = 0 }) {
  return (
    <span>
      {(value / unit).toLocaleString('en-US', { maximumFractionDigits: precision, minimumFractionDigits: precision })}
      {suffix}
    </span>
  )
}
