import { useEffect, useState } from 'react'

export type ControlledInputProps = {
  className?: string
  onBlur?: (e: string | number | readonly string[] | undefined) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export default function ControlledInput({ value, className, onBlur = () => {} }: ControlledInputProps) {
  const [_value, setValue] = useState(value)

  useEffect(() => {
    setValue(value)
  }, [value])

  return (
    <input
      className={className}
      value={_value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onBlur(_value)}
    />
  )
}
