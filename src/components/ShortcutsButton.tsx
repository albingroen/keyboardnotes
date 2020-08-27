import React from "react";
import { useDispatch } from "react-redux";
import { toggleInterfaceItem } from "../store/ducks/interface/operation";
import KeyCommandButton from "./presentation/key-command-button";

export default function ShortcutsButton() {
  const dispatch = useDispatch();

  return (
    <KeyCommandButton
      command="?"
      onClick={() => dispatch(toggleInterfaceItem("shortcuts"))}
      style={{ background: 'none' }}
    >
      Shortcuts
    </KeyCommandButton>
  );
}
