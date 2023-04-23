import ControlledInput from '../ControlledInput';
import NumericFormat from '../NumericFormat';

import ContextCell from './ContextCell';

import type { NumericFormatProps } from '../NumericFormat';
import type { CellContext } from '@tanstack/react-table';

type EditableCellProps<T> = {
  render?: React.ReactNode | ((props: CellContext<T, unknown>) => React.ReactNode);
  inputRender?: React.ReactNode | ((props: CellContext<T, unknown>) => React.ReactNode);
} & CellContext<T, unknown> &
  NumericFormatProps;

/*
  This component is the default editable cell renderer
  You can pass in a custom render or inputRender prop to override the default behavior
*/
export default function EditableCell<T>({
  getValue,
  row,
  column,
  render,
  inputRender,
  ...props
}: EditableCellProps<T>) {
  const value = getValue() as string;

  return (
    <ContextCell>
      {({ dispatch, getIsEditing }) => (
        <>
          {getIsEditing(row.id)
            ? inputRender ?? (
                <ControlledInput
                  className="max-w-[4rem] border border-gray-900 text-right"
                  value={value}
                  onBlur={(nextValue) =>
                    dispatch({
                      type: 'UPDATE_DATA',
                      payload: { rowId: row.id, columnId: column.id, value: nextValue }
                    })
                  }
                />
              )
            : render ?? (
                <NumericFormat
                  className="max-w-[4rem] border border-transparent text-right"
                  precision={props.precision}
                  suffix={props.suffix}
                  unit={props.unit}
                  value={Number(value)}
                />
              )}
        </>
      )}
    </ContextCell>
  );
}
