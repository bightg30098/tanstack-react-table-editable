import ControlledInput from '../ControlledInput'
import NumericFormat from '../NumericFormat'

import type { NumericFormatProps } from '../NumericFormat'
import type { CellContext } from '@tanstack/react-table'

type EditableCellProps<T> = {
  render?: React.ReactNode | ((props: CellContext<T, unknown>) => React.ReactNode)
  inputRender?: React.ReactNode | ((props: CellContext<T, unknown>) => React.ReactNode)
} & CellContext<T, unknown> &
  NumericFormatProps

/*
  This component is the default editable cell renderer
  You can pass in a custom render or inputRender prop to override the default behavior
*/
export default function EditableCell<T>({
  getValue,
  row,
  column,
  render,
  table,
  inputRender,
  ...props
}: EditableCellProps<T>) {
  const value = getValue() as string

  // use non-null assertion operator to tell typescript that these values are not null
  const dispatch = table.options.meta!.dispatch!
  const getIsEditing = table.options.meta!.getIsEditing!

  return (
    <>
      {getIsEditing(row.id)
        ? inputRender ?? (
            <ControlledInput
              className="max-w-[4rem] border border-gray-900"
              value={value}
              onBlur={(nextValue) =>
                dispatch({
                  type: 'UPDATE_DATA',
                  payload: { rowId: row.id, columnId: column.id, value: nextValue },
                })
              }
            />
          )
        : render ?? (
            <NumericFormat precision={props.precision} suffix={props.suffix} unit={props.unit} value={Number(value)} />
          )}
    </>
  )
}
