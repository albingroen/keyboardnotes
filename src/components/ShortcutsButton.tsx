import React from "react";
import { useDispatch } from "react-redux";
import { toggleInterfaceItem } from "../store/ducks/interface/operation";
import KeyCommandTooltip from "./presentation/key-command-tooltip";
import { Button } from "antd";

export default function ShortcutsButton() {
  const dispatch = useDispatch();

  return (
    <KeyCommandTooltip title="Shortcuts" command="?">
      <Button onClick={() => dispatch(toggleInterfaceItem("shortcuts"))}>
        Shortcuts
      </Button>
    </KeyCommandTooltip>
  );
}
