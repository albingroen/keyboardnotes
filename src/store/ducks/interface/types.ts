export const SET_IS_OPEN = "keyboardnotes/interface/SET_IS_OPEN";
export const SET_POSITION = "keyboardnotes/interface/SET_POSITION";

export type InterfaceName = "shortcuts" | "spotlight";

export type InterfacePosition = "left" | "right" | "top" | "bottom";

export interface ISetIsOpenAction {
  type: typeof SET_IS_OPEN;
  payload: {
    name: InterfaceName;
    isOpen: boolean;
  };
}

export interface ISetPositionAction {
  type: typeof SET_POSITION;
  payload: {
    name: InterfaceName;
    position: InterfacePosition;
  };
}

export type InterfaceActions = ISetIsOpenAction | ISetPositionAction;
