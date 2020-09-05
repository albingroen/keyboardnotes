import * as types from "./types";

type IInterfaceState = {
  [name in types.InterfaceName]: {
    isOpen?: boolean;
    position?: types.InterfacePosition;
    width?: number;
  };
};

const initialState: IInterfaceState = {
  shortcuts: {
    isOpen: localStorage.getItem("shortcuts")
      ? localStorage.getItem("shortcuts") === "true"
      : true,
  },
  spotlight: {
    isOpen: false,
  },
  rightSplit: {
    width: 25,
  },
};

export default function reducer(
  state = initialState,
  action: types.InterfaceActions
) {
  switch (action.type) {
    case types.SET_IS_OPEN:
      localStorage.setItem(action.payload.name, String(action.payload.isOpen));
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          isOpen: action.payload.isOpen,
        },
      };
    case types.SET_POSITION:
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          position: action.payload.position,
        },
      };
    case types.SET_WIDTH:
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          width: action.payload.width,
        },
      };
    default:
      return state;
  }
}
