import React from "react";
import shortid from "shortid";
import Label from "../models/Label";

interface LabelState {
  noTagSelected: boolean;
  labels: Label[];
}

interface LabelActions {
  createLabel: (title: string, color: string) => void;
  deleteLabel: (id: string) => void;
  editLabel: (labelId: string, title: string, color: string) => void;
  toggleSelection: (labelId: string) => void;
  toggleNoTag: () => void;
}

interface LabelContextType {
  state: LabelState;
  actions: LabelActions;
}

const initialState: LabelState = {
  noTagSelected: true,
  labels: [],
};

export const LabelContext = React.createContext<LabelContextType>({
  state: initialState,
  actions: {
    createLabel: (title: string, color: string) => {},
    deleteLabel: (id: string) => {},
    editLabel: (labelId: string, title: string, color: string) => {},
    toggleSelection: (labelId: string) => {},
    toggleNoTag: () => {},
  },
});

interface Props {
  children: JSX.Element;
}

export const LabelProvider = ({ children }: Props) => {
  const [state, setState] = React.useState<LabelState>(initialState);

  const createLabel = React.useCallback(
    (title: string, color: string) => {
      const newState = { ...state };

      const newLabel: Label = {
        title,
        color,
        id: shortid.generate(),
        selected: true,
      };

      newState.labels.push(newLabel);

      setState(newState);
    },
    [state, setState]
  );

  const deleteLabel = React.useCallback(
    (id: string) => {
      const newState = { ...state };

      newState.labels = newState.labels.filter((label) => label.id !== id);

      setState(newState);
    },
    [state, setState]
  );

  const editLabel = React.useCallback(
    (labelId: string, title: string, color: string) => {
      const newState = { ...state };

      newState.labels = newState.labels.map((label) =>
        label.id !== labelId
          ? label
          : {
              ...label,
              title,
              color,
            }
      );

      setState(newState);
    },
    [state, setState]
  );

  const toggleSelection = React.useCallback(
    (labelId: string) => {
      const newState = {
        ...state,
        labels: state.labels.map((label) =>
          label.id !== labelId ? label : { ...label, selected: !label.selected }
        ),
      };
      setState(newState);
    },
    [state, setState]
  );

  const toggleNoTag = React.useCallback(() => {
    const newState = { ...state, noTagSelected: !state.noTagSelected };
    setState(newState);
  }, [state, setState]);

  const actions = React.useMemo<LabelActions>(
    () => ({
      createLabel,
      deleteLabel,
      editLabel,
      toggleSelection,
      toggleNoTag,
    }),
    [createLabel, deleteLabel, editLabel, toggleSelection, toggleNoTag]
  );

  return (
    <LabelContext.Provider value={{ state, actions }}>
      {children}
    </LabelContext.Provider>
  );
};
