import React, { ChangeEvent } from "react";
import { Typography, Divider } from "antd";
import Page from "./page";

interface INoteProps {
  value?: string;
  valueTitle?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeTitle: (value: string) => void;
}

export default function Note({
  value,
  valueTitle,
  onChange,
  onChangeTitle,
}: INoteProps) {
  return (
    <Page>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <Typography.Title
          editable={{ onChange: onChangeTitle }}
          style={{ margin: 0, padding: 0, lineHeight: 1 }}
          level={3}
        >
          {valueTitle}
        </Typography.Title>
        <Divider />
        <textarea
          style={{ flex: 1, width: "100%", border: "none", fontSize: "1.1em" }}
          placeholder="Start jotting down your thoughts"
          onChange={onChange}
          value={value}
        />
      </div>
    </Page>
  );
}
