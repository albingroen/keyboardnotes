import React, { ChangeEvent } from "react";
import { Divider, Typography } from "antd";
import Editor from "rich-markdown-editor";
import ContextFooter from "../container/context-footer";
import Page from "./page";

interface INoteProps {
  value?: string;
  valueTitle?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeTitle: (value: string) => void;
  setIsTyping: (value: boolean) => void;
}

export default function Note({
  value,
  valueTitle,
  onChange,
  onChangeTitle,
  setIsTyping,
}: INoteProps) {
  return (
    <Page
      left={<div />}
      right={
        <div
          style={{
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            overflowY: "auto",
            height: "100%",
          }}
        >
          <div style={{ flex: 1, marginBottom: "3rem" }}>
            <Editor
              className="markdown"
              defaultValue={value || " "}
              value={value || " "}
              onChange={() => {}}
              readOnly
            />
          </div>

          <ContextFooter />
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
          onBlur={() => setIsTyping(false)}
          onFocus={() => setIsTyping(true)}
          onChange={onChange}
          defaultValue={value}
          autoFocus
        />
      </div>
    </Page>
  );
}
