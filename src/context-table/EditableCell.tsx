import ControlledInput from '../ControlledInput'
import NumericFormat from '../NumericFormat'

import ContextCell from './ContextCell'

import type { NumericFormatProps } from '../NumericFormat'
import type { CellContext } from '@tanstack/react-table'

type EditableCellProps<T> = {
  render?: React.ReactNode | ((props: CellContext<T, unknown>) => React.ReactNode)
  inputRender?: React.ReactNode | ((props: CellContext<T, unknown>) => React.ReactNode)
} & CellContext<T, unknown> &
  NumericFormatProps

/*
  This component is the default editable cell renderer
  If isEditing is true, it renders the custom inputRender or a default ControlledInput component
  If isEditing is false, it renders the custom render or a NumericFormat component
*/
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
      {({ dispatch, getIsEditing }) => (
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
