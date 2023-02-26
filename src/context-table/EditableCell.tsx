import type { CellContext } from '@tanstack/react-table'
import ContextCell from './ContextCell'
import ControlledInput from '../ControlledInput'
import NumericFormat, { NumericFormatProps } from '../NumericFormat'

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
          {getIsEditing(row.index)
            ? inputRender ?? (
                <ControlledInput
                  className="border-gray-900 border max-w-[4rem]"
                  value={value}
                  onBlur={(nextValue) =>
                    dispatch({
                      type: 'UPDATE_DATA',
                      payload: { rowIndex: row.index, columnId: column.id, value: nextValue },
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
