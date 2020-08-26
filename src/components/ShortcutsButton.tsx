import React from "react";
import { Button, Typography, Space } from "antd";
import { useDispatch } from "react-redux";
import { toggleInterfaceItem } from "../store/ducks/interface/operation";

export default function ShortcutsButton() {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(toggleInterfaceItem("shortcuts"))}>
      <Space>
        Shortcuts <Typography.Text keyboard>?</Typography.Text>
      </Space>
    </Button>
  );
}
