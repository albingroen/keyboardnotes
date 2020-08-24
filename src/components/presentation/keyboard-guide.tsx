import React, { CSSProperties } from "react";
import { Typography } from "antd";

export default function KeyboardGuide({ style }: { style?: CSSProperties }) {
  return (
    <Typography.Text type="secondary" style={style}>
      Hit <Typography.Text keyboard>c</Typography.Text> to create, and{" "}
      <Typography.Text keyboard>e</Typography.Text> to delete a note. Browse
      using <Typography.Text keyboard>j</Typography.Text> and{" "}
      <Typography.Text keyboard>k</Typography.Text>.<br />
      Hit <Typography.Text keyboard>enter</Typography.Text> to edit and{" "}
      <Typography.Text keyboard>esc</Typography.Text> to come back when editing.
      <br />
      Select a note by hitting <Typography.Text keyboard>x</Typography.Text> and <Typography.Text keyboard>esc</Typography.Text> to deselect all.
    </Typography.Text>
  );
}
