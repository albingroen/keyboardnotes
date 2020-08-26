import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { toggleInterfaceItem } from "../store/ducks/interface/operation";

export default function ShortcutsButton() {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => dispatch(toggleInterfaceItem("shortcuts"))}
      size="small"
    >
      Shortcuts
    </Button>
  );
}
