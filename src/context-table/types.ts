// Defined the draft state props
export type DraftProps = {
  isEditing?: boolean
  isDeleted?: boolean
  isSaved?: boolean
  isNew?: boolean
  data: Record<string, unknown>
}

// Union types for editing actions
export type ActionProps =
  | {
      type: 'UPDATE_DATA'
      payload: {
        rowIndex: number
        columnId: string
        value: unknown
      }
    }
  | {
      type: 'SET_IS_EDITING'
      payload: {
        rowIndex: number
        isEditing: boolean
      }
    }
  | {
      type: 'ON_CANCEL'
      payload: {
        rowIndex: number
      }
    }
  | {
      type: 'ON_SAVE'
      payload: {
        rowIndex: number
      }
    }
  | {
      type: 'ON_DELETE'
      payload: {
        rowIndex: number
      }
    }
  | {
      type: 'RESET'
      payload?: {}
    }
