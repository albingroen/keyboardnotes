import * as types from "./types";

export function setInterfaceIsOpen(
  name: types.InterfaceName,
  isOpen: boolean
): types.ISetIsOpenAction {
  return {
    type: types.SET_IS_OPEN,
    payload: {
      name,
      isOpen,
    },
  };
}

export function setInterfacePosition(
  name: types.InterfaceName,
  position: types.InterfacePosition
): types.ISetPositionAction {
  return {
    type: types.SET_POSITION,
    payload: {
      name,
      position,
    },
  };
}
