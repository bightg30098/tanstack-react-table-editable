// Defined the draft state props
export type DraftProps = {
  isEditing?: boolean;
  isDeleted?: boolean;
  isSaved?: boolean;
  isNew?: boolean;
  data: Record<string, unknown>;
};

// Union types for editing actions
export type ActionProps =
  | {
      type: 'UPDATE_DATA';
      payload: {
        rowId: string;
        columnId: string;
        value: unknown;
      };
    }
  | {
      type: 'SET_IS_EDITING';
      payload: {
        rowId: string;
        isEditing: boolean;
      };
    }
  | {
      type: 'ON_CANCEL';
      payload: {
        rowId: string;
      };
    }
  | {
      type: 'ON_SAVE';
      payload: {
        rowId: string;
      };
    }
  | {
      type: 'ON_DELETE';
      payload: {
        rowId: string;
      };
    }
  | {
      type: 'RESET';
      payload?: Record<string, never>;
    };
