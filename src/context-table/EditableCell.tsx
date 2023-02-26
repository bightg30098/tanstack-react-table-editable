import type { CellContext } from '@tanstack/react-table'
import ContextCell from './ContextCell'
import ControlledInput from '../ControlledInput'
import NumericFormat, { NumericFormatProps } from '../NumericFormat'

type EditableCellProps<T> = {
  render?: React.ReactNode | ((props: CellContext<T, unknown>) => React.ReactNode)
  inputRender?: React.ReactNode | ((props: CellContext<T, unknown>) => React.ReactNode)
} & CellContext<T, unknown> &
  NumericFormatProps

export default function EditableCell<T>({
  getValue,
  row,
  column,
  render,
  inputRender,
  ...props
}: EditableCellProps<T>) {
  const value = getValue() as string

  return (
    <ContextCell>
      {({ getIsEditing, updateData }) => (
        <>
          {getIsEditing(row.index)
            ? inputRender ?? (
                <ControlledInput
                  className="border-gray-900 border max-w-[4rem]"
                  value={value}
                  onBlur={(nextValue) => updateData(row.index, column.id, nextValue)}
                />
              )
            : render ?? (
                <NumericFormat
                  precision={props.precision}
                  suffix={props.suffix}
                  unit={props.unit}
                  value={Number(value)}
                />
              )}
        </>
      )}
    </ContextCell>
  )
}
