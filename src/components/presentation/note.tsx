import React, { ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
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
    <Page
      left={<div />}
      right={
        <div style={{ padding: "1.5rem 2rem" }}>
          <ReactMarkdown source={value} />
        </div>
      }
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          padding: "2rem",
        }}
      >
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
          placeholder="Start jotting down your thoughts (markdown is supported)"
          onChange={onChange}
          defaultValue={value}
        />
      </div>
    </Page>
  );
}
