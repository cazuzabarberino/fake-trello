import React from "react";
import shortid from "shortid";
import Label from "../models/Label";

interface LabelState {
  selected: null | Label;
  labels: Label[];
}

interface LabelActions {
  createLabel: (title: string, color: string) => void;
  deleteLabel: (id: string) => void;
}

interface LabelContextType {
  state: LabelState;
  actions: LabelActions;
}

const initialState: LabelState = {
  selected: null,
  labels: [
    { color: "red", title: "teste", id: "1" },
    { color: "blue", title: "teste", id: "2" },
    { color: "green", title: "teste", id: "3" },
    { color: "yellow", title: "teste", id: "4" },
  ],
};

export const LabelContext = React.createContext<LabelContextType>({
  state: initialState,
  actions: {
    createLabel: (title: string, color: string) => {},
    deleteLabel: (id: string) => {},
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

  const actions = React.useMemo<LabelActions>(
    () => ({
      createLabel,
      deleteLabel,
    }),
    [createLabel, deleteLabel]
  );

  return (
    <LabelContext.Provider value={{ state, actions }}>
      {children}
    </LabelContext.Provider>
  );
};
