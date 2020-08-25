import React, { CSSProperties } from "react";
import { Typography, Space } from "antd";

const KeyValue: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Space style={{ display: "flex", justifyContent: "space-between" }}>
    <Typography.Text>{label}</Typography.Text>
    <Typography.Text keyboard>{value}</Typography.Text>
  </Space>
);

export default function KeyboardGuide({ style }: { style?: CSSProperties }) {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <KeyValue label="Create note" value="c" />
      <KeyValue label="Delete note" value="e" />
      <KeyValue label="Select note" value="x" />
      <KeyValue label="Browse next note" value="j" />
      <KeyValue label="Browse previous note" value="k" />
      <KeyValue label="Edit note" value="enter" />
      <KeyValue label="Return to home" value="esc" />
      <KeyValue label="Command palette" value="cmd/ctrl+k" />
      <KeyValue label="Show all shortcuts" value="?" />
    </Space>
  );
}
